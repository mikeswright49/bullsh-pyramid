import React from 'react';
import { useRouter } from 'next/router';
import { Layout } from 'src/components/layout/layout';
import { GameBoard } from 'src/components/game-board/game-board';
import { usePlayer } from 'src/hooks/use-player';
import { PlayerDisplay } from 'src/components/player-display/player-display';
import { HostDisplay } from 'src/components/host-display/host-display';
import { GameProvider } from 'src/providers/game-provider';
import { PlayersProvider } from 'src/providers/players-provider';

export default function Player(): JSX.Element {
    const router = useRouter();
    const gameId: string = router.query.id as string;
    const playerId: string = router.query.player as string;
    const player = usePlayer(playerId);

    if (!player) {
        return null;
    }

    return (
        <Layout>
            <GameProvider gameId={gameId}>
                <PlayersProvider gameId={gameId}>
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                {player.isHost && <HostDisplay />}
                                <PlayerDisplay player={player} />
                            </div>
                            <div className="col-9">
                                <GameBoard />
                            </div>
                        </div>
                    </div>
                </PlayersProvider>
            </GameProvider>
        </Layout>
    );
}
