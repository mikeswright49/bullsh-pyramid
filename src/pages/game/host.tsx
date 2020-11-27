import React, { useState, useRef } from 'react';
import { Layout } from 'src/components/layout/layout';
import { GameStore } from 'src/stores/game-store';

const DEFAULT_PLAYER_COUNT = 3;
const DEFAULT_TIER_COUNT = 5;
const DEFAULT_FLIP_DELAY = 5;

export default function HostGame(): JSX.Element {
    const playerCount = useRef<HTMLInputElement>();
    const tierCount = useRef<HTMLInputElement>();
    const flipDelay = useRef<HTMLInputElement>();

    const initializeGame = async (): Promise<void> => {
        const gameId = await GameStore.createGame({
            playerCount: parseInt(playerCount.current.value, 10),
            tierCount: parseInt(tierCount.current.value, 10),
            flipDelay: parseInt(flipDelay.current.value, 10),
        });
        window.location.assign(`/game/${gameId}`);
    };

    return (
        <Layout>
            <>
                <h1>Host Game</h1>
                <span>Holy shit this is gonna work</span>
                <div className="stack-y-2">
                    <label>
                        <span className="stack-x-1">Max players:</span>
                        <input
                            type="number"
                            ref={playerCount}
                            defaultValue={DEFAULT_PLAYER_COUNT}
                        />
                    </label>
                </div>
                <div className="stack-y-2">
                    <label>
                        <span className="stack-x-1">Tier count:</span>
                        <input type="number" defaultValue={DEFAULT_TIER_COUNT} ref={tierCount} />
                    </label>
                </div>
                <div className="stack-y-2">
                    <label>
                        <span className="stack-x-1">Flipping delay in seconds:</span>
                        <input type="number" defaultValue={DEFAULT_FLIP_DELAY} ref={flipDelay} />
                    </label>
                </div>
                <div>
                    <button className="pure-button pure-button-primary" onClick={initializeGame}>
                        Start a new game
                    </button>
                </div>
            </>
        </Layout>
    );
}
