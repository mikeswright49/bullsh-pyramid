import React, { useContext } from 'react';
import { PlayersContext } from 'src/context/players-context';
import { GameBoard } from 'src/components/game-board/game-board';

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
                {players
                    .filter((player) => !player.declaration && player.hasVoted)
                    .map((player) => {
                        return <h3 key={player.id}>{player.name} says they don&apos;t</h3>;
                    })}
            </div>
            <GameBoard />
        </>
    );
}
