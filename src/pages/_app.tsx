import '../styles/app.css';
import { GameStore } from 'src/stores/game-store';
import { PlayerStore } from 'src/stores/player-store';
import { VoteStore } from 'src/stores/vote-store';
export default function App({ Component, pageProps }) {
    GameStore.init();
    PlayerStore.init();
    VoteStore.init();

    return <Component {...pageProps} />;
}
