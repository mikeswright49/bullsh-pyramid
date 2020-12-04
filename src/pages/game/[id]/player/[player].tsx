import React from 'react';
import { useRouter } from 'next/router';
import { Layout } from 'src/components/layout/layout';
import { GameProvider } from 'src/providers/game-provider';
import { PlayersProvider } from 'src/providers/players-provider';
import { PlayerProvider } from 'src/providers/player-provider';
import { PlayerRoute } from 'src/routes/player';

export default function Player(): JSX.Element {
    const router = useRouter();
    const gameId: string = router.query.id as string;
    const playerId: string = router.query.player as string;

    if (!playerId) {
        return null;
    }

    return (
        <Layout>
            <GameProvider gameId={gameId}>
                <PlayersProvider gameId={gameId}>
                    <PlayerProvider playerId={playerId}>
                        <PlayerRoute />
                    </PlayerProvider>
                </PlayersProvider>
            </GameProvider>
        </Layout>
    );
}
