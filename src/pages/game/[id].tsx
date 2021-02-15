import React from 'react';
import { Layout } from 'src/components/layout/layout';
import { useRouter } from 'next/router';
import { GameDisplay } from 'src/components/game-display/game-display';
import { GameProvider } from 'src/providers/game-provider';
import { PlayersProvider } from 'src/providers/players-provider';
import { TranslationProvider } from 'src/providers/translation-provider';

export default function Game(): JSX.Element {
    const router = useRouter();
    const gameId: string = router.query.id as string;
    return (
        <Layout>
            <GameProvider gameId={gameId}>
                <PlayersProvider gameId={gameId}>
                    <TranslationProvider>
                        <div className="container">
                            <GameDisplay />
                        </div>
                    </TranslationProvider>
                </PlayersProvider>
            </GameProvider>
        </Layout>
    );
}
