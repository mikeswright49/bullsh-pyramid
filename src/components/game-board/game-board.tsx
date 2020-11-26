import React, { useContext } from 'react';
import { GameContext } from 'src/context/game-context';
import { GameStage } from 'src/enums/game-stage';
import { Pyramid } from 'src/components/pyramid/pyramid';

export function GameBoard() {
    const { gameStage, tiers } = useContext(GameContext);
    if (gameStage === GameStage.Initiation) {
        return <span data-testid="at-game-board"></span>;
    }
    return (
        <div className="flex-center-center" data-testid="at-game-board">
            <Pyramid tiers={tiers} />
        </div>
    );
}
