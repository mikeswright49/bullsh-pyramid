import React, { useContext } from 'react';
import { PlayersContext } from 'src/providers/players-provider';
export function GameDeclaration() {
    const players = useContext(PlayersContext);
    return (
        <>
            <div className="stack-y-2">
                {players
                    .filter((player) => !!player.declaration)
                    .map((player) => {
                        return <h3 key={player.id}>{player.name} says they do</h3>;
                    })}
            </div>
        </>
    );
}
