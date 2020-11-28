import React from 'react';
import { GameStage } from 'src/enums/game-stage';
import Link from 'next/link';
import { useEffect, useContext } from 'react';
import { GameBoard } from 'src/components/game-board/game-board';
import { GameContext } from 'src/context/game-context';
import { PlayersContext } from 'src/context/players-context';
import { Card } from 'src/components/card/card';
import { GameInitiation } from './stages/game-initiation';
import { GameDeclaration } from './stages/game-declaration';
import { transitionToBullshit } from 'src/components/host-display/transitions/to-bullshit';
import { transitionToDeclaration } from 'src/components/host-display/transitions/to-declaration';
import { transitionToReveal } from 'src/components/host-display/transitions/to-reveal';
import { transitionFromReveal } from 'src/components/host-display/transitions/from-reveal';
import { transitionToNewGame } from 'src/components/host-display/transitions/to-new-game';
import { transitionToFlipping } from 'src/components/host-display/transitions/to-flipping';

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
            ref = setTimeout(() => transitionToFlipping(players, gameState), MEMORIZATION_TIMEOUT);
        } else if (gameStage === GameStage.Declaration) {
            ref = setTimeout(() => transitionToBullshit(gameId), flipDelay);
        } else if (gameStage === GameStage.Memory) {
            ref = setTimeout(() => transitionToNewGame(gameId), MEMORY_TIMEOUT);
        }
        return () => {
            clearTimeout(ref);
        };
    }, [gameStage]);

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
                        <button
                            className="pure-button pure-button-primary"
                            onClick={() => transitionToDeclaration(gameState)}
                        >
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
                    <button onClick={() => transitionToReveal(gameId)}>Move along</button>
                    <GameBoard />
                </>
            );
        case GameStage.Reveal:
            return (
                <>
                    <div className="stack-y-2">
                        <h2>Time to find out who eats shit</h2>
                    </div>
                    <button onClick={() => transitionFromReveal(players, gameState)}>
                        Move along
                    </button>
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
