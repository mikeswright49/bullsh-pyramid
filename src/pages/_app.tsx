import '../styles/app.css';
import { GameStore } from 'src/stores/game-store';
import { PlayerStore } from 'src/stores/player-store';
export default function App({ Component, pageProps }) {
    GameStore.init();
    PlayerStore.init();

    return <Component {...pageProps} />;
}
