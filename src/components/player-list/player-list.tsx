import React from 'react';
import { usePlayers } from '../../hooks/use-players';

export function PlayerList({ gameId }: { gameId: string }) {
    const players = usePlayers(gameId);

    return (
        <>
            <h2>Players Joined</h2>
            {Object.values(players).map((player) => (
                <h3 key={`player-${player.id}`}>{player.name}</h3>
            ))}
        </>
    );
}
