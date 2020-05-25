import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Layout } from 'src/components/layout/layout';
import { dealHand, generateDeck } from 'src/utilities/cards';
import { Hand } from 'src/components/hand/hand';
import { shortId } from 'src/utilities/shortid';
import { Pyramid } from 'src/components/pyramid/pyramid';

const DEFAULT_PLAYER_COUNT = 3;
const DEFAULT_TIER_COUNT = 5;

export default function Game(): JSX.Element {
    const router = useRouter();
    const [playerCount, setPlayerCount] = useState(DEFAULT_PLAYER_COUNT);
    const [tierCount, setTierCount] = useState(DEFAULT_TIER_COUNT);
    const [gameState, setGameState] = useState({
        started: false,
        hand: {
            players: [],
            tiers: [],
        },
    });

    const { id } = router.query;

    const startGame = (event: { preventDefault: () => void }): void => {
        event.preventDefault();

        const hand = dealHand(generateDeck(), tierCount, playerCount);
        setGameState({
            hand,
            started: true,
        });
    };

    function GameBoard() {
        if (!gameState.started) {
            return <span></span>;
        }
        return (
            <>
                {gameState.hand.players.map((player, index) => {
                    return <Hand key={shortId()} cards={player} hidden={false} name={index + ''} />;
                })}
                <Pyramid tiers={gameState.hand.tiers} />
            </>
        );
    }

    return (
        <Layout>
            <>
                <h1>Game Id: {id}</h1>
                <div className="stack-y-2">
                    <label>
                        Player count:
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

                <div className="stack-y-2">
                    <h2>Game state</h2>
                    {JSON.stringify(gameState)}
                </div>

                <div className="stack-y-2">
                    <h2>All players joined!</h2>
                    <button onClick={startGame}>Start game</button>
                </div>

                <GameBoard />
            </>
        </Layout>
    );
}
