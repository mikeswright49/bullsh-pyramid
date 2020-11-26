import React, { useRef } from 'react';
import { GameStore } from 'src/stores/game-store';
import { PlayerStore } from 'src/stores/player-store';
import { Layout } from 'src/components/layout/layout';

export function Join({ gameId }: { gameId?: string }) {
    const gameIdRef = useRef<HTMLInputElement>({ value: gameId } as HTMLInputElement);
    const playerNameRef = useRef<HTMLInputElement>();

    const createPlayerAndJoin = async (): Promise<void> => {
        GameStore.init();

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
                        {!gameId && <input ref={gameIdRef} type="text" />}
                        {!!gameId && gameId}
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
