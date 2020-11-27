import React from 'react';
import { GameStage } from 'src/enums/game-stage';
import Link from 'next/link';
import { useEffect, useContext } from 'react';
import { GameStore } from 'src/stores/game-store';
import { PlayerStore } from 'src/stores/player-store';
import { GameBoard } from 'src/components/game-board/game-board';
import { GameContext } from 'src/context/game-context';
import { PlayersContext } from 'src/context/players-context';
import { Card } from 'src/components/card/card';
import { GameInitiation } from './stages/game-initiation';
import { GameDeclaration } from './stages/game-declaration';

const MEMORIZATION_TIMEOUT = 5000;
const MEMORY_TIMEOUT = 1000;

export function GameDisplay() {
    const gameState = useContext(GameContext);
    const players = useContext(PlayersContext);
    const { gameStage, activeRow, activeIndex, id: gameId, flipDelay } = gameState;
    /**
     * Transition to the flip phase of the game
     * This is some fucked up shit right here.
     * This is where hooks sucks
     */
    useEffect(() => {
        let ref: NodeJS.Timeout;
        if (gameStage === GameStage.Memorization) {
            ref = setTimeout(transitionToFlipping, MEMORIZATION_TIMEOUT);
        } else if (gameStage === GameStage.Declaration) {
            ref = setTimeout(transitionToBullshit, flipDelay);
        } else if (gameStage === GameStage.Memory) {
            ref = setTimeout(transitionToNewGame, MEMORY_TIMEOUT);
        }
        return () => {
            clearTimeout(ref);
        };
    }, [gameStage]);

    function transitionToBullshit() {
        GameStore.updateGameStage(gameId, GameStage.Bullshit);
    }

    function flipCard(event: { preventDefault: () => void }) {
        event.preventDefault();
        gameState.tiers[activeRow][activeIndex].hidden = false;
        GameStore.updateTiers(gameId, gameState.tiers);
        GameStore.updateGameStage(gameId, GameStage.Declaration);
    }

    function transitionToReveal() {
        GameStore.updateGameStage(gameId, GameStage.Reveal);
    }

    async function transitionFromReveal() {
        await Promise.all(
            players.map(async (player) => {
                player.hasVoted = false;
                player.declaration = null;
                player.hatersmap = null;
                player.haters = null;
                await PlayerStore.updatePlayer(player);
            })
        );

        if (activeRow === gameState.tierCount - 1 && activeIndex === 0) {
            GameStore.updateGameStage(gameId, GameStage.Memory);
        } else {
            const updatedIndex = (activeIndex + 1) % gameState.tiers[activeRow].length;
            const updatedRow = updatedIndex === 0 ? activeRow + 1 : activeRow;
            GameStore.setActiveCard(gameId, {
                activeRow: updatedRow,
                activeIndex: updatedIndex,
            });
            GameStore.updateGameStage(gameId, GameStage.Flipping);
        }
    }

    async function transitionToFlipping() {
        const updates = [];
        for (const playerId in players) {
            const player = players[playerId];
            player.hand.forEach((card) => (card.hidden = true));
            updates.push(PlayerStore.updatePlayer(player));
        }
        await Promise.all(updates);
        GameStore.updateGameStage(gameId, GameStage.Flipping);
    }

    async function transitionToNewGame() {
        GameStore.updateGameStage(gameId, GameStage.Complete);
    }

    switch (gameStage) {
        case GameStage.Initiation:
            return <GameInitiation />;
        case GameStage.Memorization:
            return (
                <>
                    <div className="stack-y-2">
                        <h2>You have 30s to remember your cards!</h2>
                    </div>
                    <GameBoard />
                </>
            );
        case GameStage.Flipping:
            return (
                <>
                    <div className="stack-y-2">
                        <h2>Time to start flipping cards</h2>
                        <button className="pure-button pure-button-primary" onClick={flipCard}>
                            Flip card
                        </button>
                    </div>
                    <GameBoard />
                </>
            );
        case GameStage.Declaration:
            return <GameDeclaration />;
        case GameStage.Bullshit:
            return (
                <>
                    <div className="stack-y-2">
                        <h2>Did anyone have this card?</h2>
                        <Card card={gameState.tiers[activeRow][activeIndex]} />
                    </div>
                    <button onClick={() => transitionToReveal()}>Move along</button>
                    <GameBoard />
                </>
            );
        case GameStage.Reveal:
            return (
                <>
                    <div className="stack-y-2">
                        <h2>Time to find out who eats shit</h2>
                    </div>
                    <button onClick={() => transitionFromReveal()}>Move along</button>
                    <GameBoard />
                </>
            );
        case GameStage.Memory:
            return (
                <>
                    <div className="stack-y-2">
                        <h2>Well which cards did you have?</h2>
                    </div>
                </>
            );
        case GameStage.Complete:
            return (
                <>
                    <div className="stack-y-2">
                        <h2>Well time for a new game</h2>
                        <button className="pure-button pure-button-primary">
                            Start a new game with same players
                        </button>
                        <Link href="/game/host">
                            <button className="pure-button pure-button-secondary">
                                Host a new game
                            </button>
                        </Link>
                    </div>
                </>
            );
        default:
            return <h1>Terrible error</h1>;
    }
}
