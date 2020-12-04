import React, { useContext } from 'react';
import { GameContext } from 'src/providers/game-provider';

import Link from 'next/link';
import { PlayersContext } from 'src/providers/players-provider';

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

                <h3>Players Joined</h3>
                {players.map((player) => (
                    <h4 key={`player-${player.id}`}>{player.name}</h4>
                ))}
            </div>
        </>
    );
}
