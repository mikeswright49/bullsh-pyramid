import React, { useState, useEffect } from 'react';
import { Layout } from 'src/components/layout/layout';
import { dealHand, generateDeck } from 'src/utilities/cards';
import { Hand } from 'src/components/hand/hand';
import { shortId } from 'src/utilities/shortid';
import { Pyramid } from 'src/components/pyramid/pyramid';
import { Card as CardType } from 'types/card';
import styles from './[id].module.css';
import { GameState } from 'types/game-state';
import { Card } from 'src/components/card/card';

const DEFAULT_PLAYER_COUNT = 3;
const DEFAULT_TIER_COUNT = 5;
const MEMORIZATION_TIMEOUT = 5000;
const DECLARATION_TIMEOUT = 1000;
const BULLSHIT_TIMEOUT = 1000;

enum GameStage {
    Initiation,
    Memorization,
    Flipping,
    Declaration,
    Bullshit,
    Memory,
    Complete,
}

export default function Game(): JSX.Element {
    const [playerCount, setPlayerCount] = useState(DEFAULT_PLAYER_COUNT);
    const [tierCount, setTierCount] = useState(DEFAULT_TIER_COUNT);
    const [gameStage, setGameStage] = useState(GameStage.Initiation);
    const [activeCard, setActiveCard] = useState(0);
    const [gameState, setGameState] = useState<GameState>({
        players: [],
        tiers: [],
        flattenedTiers: [],
    });

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
        }
        return () => {
            clearTimeout(ref);
        };
    }, [gameStage]);

    const flipCard = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        gameState.flattenedTiers[activeCard].hidden = false;
        setGameState(gameState);
        setGameStage(GameStage.Declaration);
    };

    const transitionToBullshit = () => {
        setGameStage(GameStage.Bullshit);
    };

    const transitionFromBullShit = () => {
        if (activeCard === gameState.flattenedTiers.length - 1) {
            setGameStage(GameStage.Memory);
        } else {
            setActiveCard(activeCard + 1);
            setGameStage(GameStage.Flipping);
        }
    };

    const transitionToFlipping = () => {
        const players: CardType[][] = [].concat(gameState.players);
        players.forEach((player) => {
            player.forEach((card) => (card.hidden = true));
        });
        setGameState({
            ...gameState,
            players,
        });
        setGameStage(GameStage.Flipping);
    };

    const transitionToMemorization = (event: { preventDefault: () => void }): void => {
        event.preventDefault();

        const hand = dealHand(generateDeck(), tierCount, playerCount);
        setGameState(hand);
        setGameStage(GameStage.Memorization);
    };

    function GameBoard() {
        if (gameStage === GameStage.Initiation) {
            return <span></span>;
        }
        return (
            <div className="flex-center-center">
                <div className={styles.leftBar}>
                    {gameState.players.map((player, index) => {
                        return <Hand key={shortId()} cards={player} name={index + ''} />;
                    })}
                </div>
                <div className={styles.rightBar}>
                    <Pyramid tiers={gameState.tiers} />
                </div>
            </div>
        );
    }

    function GameDisplay() {
        switch (gameStage) {
            case GameStage.Initiation:
                return (
                    <>
                        <div className="stack-y-2">
                            <label>
                                Player count:
                                <input
                                    value={playerCount}
                                    type="number"
                                    onChange={(val) =>
                                        setPlayerCount(parseInt(val.target.value, 10))
                                    }
                                />
                            </label>
                        </div>
                        <div className="stack-y-2">
                            <label>
                                Tier count:
                                <input
                                    value={tierCount}
                                    type="number"
                                    onChange={(val) => setTierCount(parseInt(val.target.value, 10))}
                                />
                            </label>
                        </div>
                        <div className="stack-y-2">
                            <h2>All players joined!</h2>
                            <button onClick={transitionToMemorization}>Start game</button>
                        </div>
                    </>
                );
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
                            <button onClick={flipCard}>Flip card</button>
                        </div>
                        <GameBoard />
                    </>
                );
            case GameStage.Declaration:
                return (
                    <>
                        <div className="stack-y-2">
                            <h2>Quick 5s! Do you have this card?</h2>
                            <Card card={gameState.flattenedTiers[activeCard]} />
                        </div>
                        <GameBoard />
                    </>
                );
            case GameStage.Bullshit:
                return (
                    <>
                        <div className="stack-y-2">
                            <h2>Did anyone have this card?</h2>
                            <Card card={gameState.flattenedTiers[activeCard]} />
                        </div>
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
