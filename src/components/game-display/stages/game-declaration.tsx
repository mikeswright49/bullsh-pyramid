import React, { useContext } from 'react';
import { GameContext } from 'src/context/game-context';
import { PlayersContext } from 'src/context/players-context';
import { GameBoard } from 'src/components/game-board/game-board';
import { GameStore } from 'src/stores/game-store';
import { GameStage } from 'src/enums/game-stage';

export function GameDeclaration() {
    const gameState = useContext(GameContext);
    const players = useContext(PlayersContext);
    const { id: gameId } = gameState;

    function transitionToBullshit() {
        GameStore.updateGameStage(gameId, GameStage.Bullshit);
    }

    return (
        <>
            <div className="stack-y-2">
                <h2>Quick 5s! Do you have this card?</h2>
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
            <button onClick={transitionToBullshit}>Move along</button>
            <GameBoard />
        </>
    );
}
