import React from 'react';
import 'src/styles/app.css';
import 'src/styles/simple-grid.css';
import { GameStore } from 'src/stores/game-store';
import { PlayerStore } from 'src/stores/player-store';
import { VoteStore } from 'src/stores/vote-store';

export default function App({
    Component,
    pageProps,
}: {
    Component: () => JSX.Element;
    pageProps: unknown;
}) {
    GameStore.init();
    PlayerStore.init();
    VoteStore.init();
    return <Component {...pageProps} />;
}
