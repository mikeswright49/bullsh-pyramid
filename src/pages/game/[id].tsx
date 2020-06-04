import React, { useEffect } from 'react';
import { Layout } from 'src/components/layout/layout';
import { dealHand, generateDeck } from 'src/utilities/cards';
import { Card } from 'src/components/card/card';
import { GameStage } from 'src/enums/game-stage';
import { useGameState } from 'src/hooks/use-game-state';
import { useRouter } from 'next/router';
import { GameStore } from 'src/stores/game-store';
import { GameBoard } from 'src/components/game-board/game-board';
import { PlayerList } from 'src/components/player-list/player-list';
import { usePlayers } from 'src/hooks/use-players';
import { PlayerStore } from 'src/stores/player-store';
import Link from 'next/link';

const MEMORIZATION_TIMEOUT = 5000;
const DECLARATION_TIMEOUT = 1000;
const BULLSHIT_TIMEOUT = 1000;
const MEMORY_TIMEOUT = 1000;

export default function Game(): JSX.Element {
    const router = useRouter();
    const gameId: string = router.query.id as string;
    const gameState = useGameState(gameId);
    const players = usePlayers(gameId);
    const { gameStage, activeRow, activeIndex } = gameState;
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
            ref = setTimeout(transitionToBullshit, DECLARATION_TIMEOUT);
        } else if (gameStage === GameStage.Bullshit) {
            ref = setTimeout(transitionFromBullShit, BULLSHIT_TIMEOUT);
        } else if (gameStage === GameStage.Memory) {
            ref = setTimeout(transitionToNewGame, MEMORY_TIMEOUT);
        }
        return () => {
            clearTimeout(ref);
        };
    }, [gameStage]);

    const flipCard = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        gameState.tiers[activeRow][activeIndex].hidden = false;
        GameStore.updateTiers(gameId, gameState.tiers);
        GameStore.updateGameStage(gameId, GameStage.Declaration);
    };

    const transitionToBullshit = () => {
        GameStore.updateGameStage(gameId, GameStage.Bullshit);
    };

    const transitionFromBullShit = () => {
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
    };

    const transitionToFlipping = async () => {
        players.forEach((player) => {
            player.hand.forEach((card) => (card.hidden = true));
        });
        await Promise.all(players.map((player) => PlayerStore.updatePlayer(player)));
        GameStore.updateGameStage(gameId, GameStage.Flipping);
    };

    const transitionToMemorization = async (event: {
        preventDefault: () => void;
    }): Promise<void> => {
        event.preventDefault();

        const hand = dealHand(generateDeck(), gameState.tierCount, players.length);
        await Promise.all(
            hand.players.map((playerHand, index) => {
                players[index].hand = playerHand;
                return PlayerStore.updatePlayer(players[index]);
            })
        );

        GameStore.updateTiers(gameId, hand.tiers);
        GameStore.updateGameStage(gameId, GameStage.Memorization);
    };

    const transitionToNewGame = async () => {
        GameStore.updateGameStage(gameId, GameStage.Complete);
    };

    function GameDisplay() {
        switch (gameStage) {
            case GameStage.Initiation:
                return (
                    <>
                        <div className="stack-y-2">
                            <h2>To join the game go to:</h2>
                            <ul>
                                <li>
                                    <Link href={`/game/join/${gameId}`}>
                                        <a>Go to the join screen</a>
                                    </Link>
                                </li>
                                <li>
                                    Or type in <strong>{gameId}</strong> at
                                    https://bullsh-pyramid.now.sh/game/join
                                </li>
                            </ul>

                            <PlayerList gameId={gameState.id} />

                            <h3>All players joined!</h3>
                            <button
                                className="pure-button pure-button-primary"
                                onClick={transitionToMemorization}
                            >
                                Start game
                            </button>
                        </div>
                    </>
                );
            case GameStage.Memorization:
                return (
                    <>
                        <div className="stack-y-2">
                            <h2>You have 30s to remember your cards!</h2>
                        </div>
                        <GameBoard gameState={gameState} />
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
                        <GameBoard gameState={gameState} />
                    </>
                );
            case GameStage.Declaration:
                return (
                    <>
                        <div className="stack-y-2">
                            <h2>Quick 5s! Do you have this card?</h2>
                            <Card card={gameState.tiers[activeRow][activeIndex]} />
                        </div>
                        <GameBoard gameState={gameState} />
                    </>
                );
            case GameStage.Bullshit:
                return (
                    <>
                        <div className="stack-y-2">
                            <h2>Did anyone have this card?</h2>
                            <Card card={gameState.tiers[activeRow][activeIndex]} />
                        </div>
                        <GameBoard gameState={gameState} />
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
                            <button
                                className="pure-button pure-button-primary"
                                onClick={transitionToMemorization}
                            >
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

    return (
        <Layout>
            <GameDisplay />
        </Layout>
    );
}
