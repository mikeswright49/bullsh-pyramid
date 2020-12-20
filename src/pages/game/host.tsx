import React, { useRef } from 'react';
import { Layout } from 'src/components/layout/layout';
import { GameStore } from 'src/stores/game-store';

const DEFAULT_PLAYER_COUNT = 3;
const DEFAULT_TIER_COUNT = 5;
const DEFAULT_FLIP_DELAY = 5;
const DEFAULT_CARD_COUNT = 4;

export default function HostGame(): JSX.Element {
    const playerCount = useRef<HTMLInputElement>();
    const tierCount = useRef<HTMLInputElement>();
    const flipDelay = useRef<HTMLInputElement>();
    const cardCount = useRef<HTMLInputElement>();

    async function initializeGame(event: React.FormEvent): Promise<void> {
        event.preventDefault();
        const gameId = await GameStore.createGame({
            playerCount: parseInt(playerCount.current.value, 10),
            tierCount: parseInt(tierCount.current.value, 10),
            flipDelay: parseInt(flipDelay.current.value, 10),
            cardCount: parseInt(cardCount.current.value, 10),
        });
        window.location.assign(`/game/${gameId}`);
    }

    return (
        <Layout>
            <div data-testid="host-page" className="container">
                <h1>Host Game</h1>
                <form onSubmit={initializeGame} data-testid="host-form">
                    <div className="stack-y-2">
                        <label>
                            <span className="stack-x-1">Max players:</span>
                            <input
                                data-testid="player-count"
                                type="number"
                                ref={playerCount}
                                defaultValue={DEFAULT_PLAYER_COUNT}
                            />
                        </label>
                    </div>
                    <div className="stack-y-2">
                        <label>
                            <span className="stack-x-1">Tier count:</span>
                            <input
                                data-testid="tier-count"
                                type="number"
                                defaultValue={DEFAULT_TIER_COUNT}
                                ref={tierCount}
                            />
                        </label>
                    </div>
                    <div className="stack-y-2">
                        <label>
                            <span className="stack-x-1">Cards in hand:</span>
                            <input
                                data-testid="card-count"
                                type="number"
                                defaultValue={DEFAULT_CARD_COUNT}
                                ref={cardCount}
                            />
                        </label>
                    </div>
                    <div className="stack-y-2">
                        <label>
                            <span className="stack-x-1">How long to wait to declare</span>
                            <input
                                data-testid="flip-delay"
                                type="number"
                                defaultValue={DEFAULT_FLIP_DELAY}
                                ref={flipDelay}
                            />
                        </label>
                    </div>
                    <div>
                        <button
                            data-testid="host-form-submit"
                            className="pure-button pure-button-primary"
                            type="submit"
                        >
                            Start a new game
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}
