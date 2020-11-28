import React, { useRef } from 'react';
import { GameStore } from 'src/stores/game-store';
import { PlayerStore } from 'src/stores/player-store';
import { Layout } from 'src/components/layout/layout';
import { isEmpty } from 'lodash';

export function Join({ gameId }: { gameId?: string }) {
    const gameIdRef = useRef<HTMLInputElement>({ value: gameId } as HTMLInputElement);
    const playerNameRef = useRef<HTMLInputElement>();

    const createPlayerAndJoin = async (event: React.FormEvent): Promise<void> => {
        event.preventDefault();
        const gameToJoin = gameId || gameIdRef.current.value;
        const playerName = playerNameRef.current.value;
        const players = await GameStore.getPlayers(gameToJoin);
        const playerId = await PlayerStore.createPlayer(playerName, isEmpty(players));
        await GameStore.joinGame(gameToJoin, playerId);
        window.location.assign(`/game/${gameToJoin}/player/${playerId}`);
    };

    return (
        <Layout>
            <div data-testid="join-page" className="container">
                <h1>Join Game</h1>
                <span>Enter your info and we can get this party started</span>
                <form data-testid="join-form" onSubmit={createPlayerAndJoin}>
                    <div className="stack-y-2">
                        <label>
                            <span className="stack-x-1">Game id:</span>
                            {!gameId && <input data-testid="game-id" ref={gameIdRef} type="text" />}
                            {!!gameId && <strong>{gameId}</strong>}
                        </label>
                    </div>
                    <div className="stack-y-2">
                        <label>
                            <span className="stack-x-1">Player name:</span>
                            <input data-testid="player-name" ref={playerNameRef} type="text" />
                        </label>
                    </div>
                    <div>
                        <button
                            data-testid="join-submit"
                            className="pure-button pure-button-primary"
                        >
                            Join the game
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
