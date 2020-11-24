import React from 'react';
import { useRouter } from 'next/router';
import { useGameState } from 'src/hooks/use-game-state';
import { Layout } from 'src/components/layout/layout';
import { GameBoard } from 'src/components/game-board/game-board';
import { usePlayer } from 'src/hooks/use-player';
import { PlayerDisplay } from 'src/components/player-display/player-display';
import { HostDisplay } from 'src/components/host-display/host-display';

export default function Player(): JSX.Element {
    const router = useRouter();
    const gameId: string = router.query.id as string;
    const playerId: string = router.query.player as string;

    const gameState = useGameState(gameId);
    const player = usePlayer(playerId);

    const { gameStage } = gameState;

    if (!player) {
        return null;
    }

    return (
        <Layout>
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            {player.isHost && <HostDisplay />}
                            <PlayerDisplay gameStage={gameStage} player={player} gameId={gameId} />
                        </div>
                        <div className="col-9">
                            <GameBoard gameState={gameState} />
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    );
}
