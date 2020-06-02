import React, { useRef } from 'react';
import { Layout } from '../../components/layout/layout';
import { PlayerStore } from '../../stores/player-store';
import { GameStore } from '../../stores/game-store';

export default function JoinGame(): JSX.Element {
    const gameId = useRef();
    const playerName = useRef();

    const createPlayerAndJoin = async (): Promise<void> => {
        const playerId = await PlayerStore.createPlayer(playerName.current);
        await GameStore.joinGame(gameId.current, playerId);
        window.location.assign(`/game/${gameId.current}/player/${playerId}`);
    };

    return (
        <Layout>
            <>
                <h1>Join Game</h1>
                <span>Enter your info and we can get this party started</span>
                <div className="stack-y-2">
                    <label>
                        Game id:
                        <input ref={gameId} type="text" />
                    </label>
                </div>
                <div className="stack-y-2">
                    <label>
                        Player name:
                        <input ref={playerName} type="text" />
                    </label>
                </div>
                <div>
                    <button onClick={createPlayerAndJoin}>Join the game</button>
                </div>
            </>
        </Layout>
    );
}
