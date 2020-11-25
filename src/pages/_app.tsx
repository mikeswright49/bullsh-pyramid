import React from 'react';
import '../styles/app.css';
import '../styles/simple-grid.css';
import { GameStore } from 'src/stores/game-store';
import { PlayerStore } from 'src/stores/player-store';
export default function App({
    Component,
    pageProps,
}: {
    Component: () => JSX.Element;
    pageProps: unknown;
}) {
    GameStore.init();
    PlayerStore.init();

    return <Component {...pageProps} />;
}
