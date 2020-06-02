import React, { useEffect } from 'react';
import { Layout } from 'src/components/layout/layout';
import { dealHand, generateDeck } from 'src/utilities/cards';
import { Card as CardType } from 'types/card';
import { Card } from 'src/components/card/card';
import { GameStage } from 'src/enums/game-stage';
import { useGameState } from 'src/hooks/use-game-state';
import { useRouter } from 'next/router';
import { GameStore } from 'src/stores/game-store';
import { GameBoard } from 'src/components/game-board/game-board';

const MEMORIZATION_TIMEOUT = 5000;
const DECLARATION_TIMEOUT = 1000;
const BULLSHIT_TIMEOUT = 1000;

export default function Game(): JSX.Element {
    const router = useRouter();
    const gameId: string = router.query.id as string;
    const gameState = useGameState(gameId);
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
        }
        return () => {
            clearTimeout(ref);
        };
    }, [gameStage]);

    const flipCard = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        gameState.tiers[activeRow][activeIndex].hidden = false;
        GameStore.setHand(gameId, gameState);
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

    const transitionToFlipping = () => {
        const players: CardType[][] = [].concat(gameState.players);
        players.forEach((player) => {
            player.forEach((card) => (card.hidden = true));
        });
        GameStore.setHand(gameId, gameState);
        GameStore.updateGameStage(gameId, GameStage.Flipping);
    };

    const transitionToMemorization = (event: { preventDefault: () => void }): void => {
        event.preventDefault();

        const hand = dealHand(generateDeck(), gameState.tierCount, gameState.playerCount);
        GameStore.setHand(gameId, hand);
        GameStore.updateGameStage(gameId, GameStage.Memorization);
    };

    function GameDisplay() {
        switch (gameStage) {
            case GameStage.Initiation:
                return (
                    <>
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
                        <GameBoard gameState={gameState} />
                    </>
                );
            case GameStage.Flipping:
                return (
                    <>
                        <div className="stack-y-2">
                            <h2>Time to start flipping cards</h2>
                            <button onClick={flipCard}>Flip card</button>
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
