import React, { useContext } from 'react';
import { GameContext } from 'src/context/game-context';
import Link from 'next/link';
import { PlayersContext } from 'src/context/players-context';
import { transitionToMemorization } from 'src/components/host-display/transitions/to-memorization';

export function GameInitiation() {
    const gameState = useContext(GameContext);
    const players = useContext(PlayersContext);
    const { id: gameId } = gameState;

    return (
        <>
            <div className="stack-y-2">
                <h2>To join the game go to:</h2>
                <ul>
                    <li>
                        <Link href={`/game/join/${gameId}`}>
                            <a>Go to the join screen</a>
                        </Link>
                    </li>
                    <li>
                        Or type in <strong>{gameId}</strong> at
                        https://bullsh-pyramid.now.sh/game/join
                    </li>
                </ul>

                <h2>Players Joined</h2>
                {players.map((player) => (
                    <h3 key={`player-${player.id}`}>{player.name}</h3>
                ))}

                <h3>All players joined!</h3>
                <button
                    className="pure-button pure-button-primary"
                    onClick={() => transitionToMemorization(players, gameState)}
                >
                    Start game
                </button>
            </div>
        </>
    );
}
