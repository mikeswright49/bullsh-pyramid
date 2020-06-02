import React from 'react';
import { useRouter } from 'next/router';
import { useGameState } from 'src/hooks/use-game-state';
import { Layout } from 'src/components/layout/layout';
import { GameBoard } from 'src/components/game-board/game-board';
import { usePlayer } from 'src/hooks/use-player';
import { GameStage } from 'src/enums/game-stage';
import { Card } from 'src/components/card/card';

export default function Player(): JSX.Element {
    const router = useRouter();
    const gameId: string = router.query.id as string;
    const playerId: string = router.query.player as string;

    const gameState = useGameState(gameId);
    const player = usePlayer(playerId);

    const { gameStage, activeRow, activeIndex } = gameState;

    function PlayerDisplay() {
        switch (gameStage) {
            case GameStage.Initiation:
                return (
                    <>
                        <div className="stack-y-2">
                            <h2>Waiting for the game to start</h2>
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
                            <h2>Flipping a card</h2>
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
            <PlayerDisplay />
        </Layout>
    );
}
