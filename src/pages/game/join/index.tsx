import React, { useRef } from 'react';
import { Layout } from '../../../components/layout/layout';
import { PlayerStore } from '../../../stores/player-store';
import { GameStore } from '../../../stores/game-store';

export default function JoinGame(): JSX.Element {
    const gameIdRef = useRef<HTMLInputElement>();
    const playerNameRef = useRef<HTMLInputElement>();

    const createPlayerAndJoin = async (): Promise<void> => {
        const gameId = gameIdRef.current.value;
        const playerName = playerNameRef.current.value;
        const playerId = await PlayerStore.createPlayer(playerName);
        await GameStore.joinGame(gameId, playerId);
        window.location.assign(`/game/${gameId}/player/${playerId}`);
    };

    return (
        <Layout>
            <>
                <h1>Join Game</h1>
                <span>Enter your info and we can get this party started</span>
                <div className="stack-y-2">
                    <label>
                        Game id:
                        <input ref={gameIdRef} type="text" />
                    </label>
                </div>
                <div className="stack-y-2">
                    <label>
                        Player name:
                        <input ref={playerNameRef} type="text" />
                    </label>
                </div>
                <div>
                    <button
                        className="pure-button pure-button-primary"
                        onClick={createPlayerAndJoin}
                    >
                        Join the game
                    </button>
                </div>
            </>
        </Layout>
    );
}
