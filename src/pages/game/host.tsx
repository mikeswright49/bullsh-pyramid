import React, { useState } from 'react';
import { Layout } from 'src/components/layout/layout';
import { GameStore } from 'src/stores/game-store';

const DEFAULT_PLAYER_COUNT = 3;
const DEFAULT_TIER_COUNT = 5;

export default function HostGame(): JSX.Element {
    const [playerCount, setPlayerCount] = useState(DEFAULT_PLAYER_COUNT);
    const [tierCount, setTierCount] = useState(DEFAULT_TIER_COUNT);

    const initializeGame = async (): Promise<void> => {
        const gameId = await GameStore.createGame(playerCount, tierCount);
        window.location.assign(`/game/${gameId}`);
    };

    return (
        <Layout>
            <>
                <h1>Host Game</h1>
                <span>Holy shit this is gonna work</span>
                <div className="stack-y-2">
                    <label>
                        Max players:
                        <input
                            value={playerCount}
                            type="number"
                            onChange={(val) => setPlayerCount(parseInt(val.target.value, 10))}
                        />
                    </label>
                </div>
                <div className="stack-y-2">
                    <label>
                        Tier count:
                        <input
                            value={tierCount}
                            type="number"
                            onChange={(val) => setTierCount(parseInt(val.target.value, 10))}
                        />
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
