import React, { useContext } from 'react';
import { PlayersContext } from 'src/context/players-context';

export function PlayerList() {
    const players = useContext(PlayersContext);
    return (
        <>
            <h2>Players Joined</h2>
            {players.map((player) => (
                <h3 key={`player-${player.id}`}>{player.name}</h3>
            ))}
        </>
    );
}
