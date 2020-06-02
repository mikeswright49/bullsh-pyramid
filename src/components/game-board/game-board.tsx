import React from 'react';
import { GameStage } from '../../enums/game-stage';
import { Pyramid } from '../pyramid/pyramid';
import { GameState } from 'types/game-state';
import styles from './game-board.module.css';

export function GameBoard(props: { gameState: GameState }) {
    const { gameState } = props;
    if (gameState.gameStage === GameStage.Initiation) {
        return <span data-testid="at-game-board"></span>;
    }
    return (
        <div className="flex-center-center" data-testid="at-game-board">
            <div className={styles.rightBar}>
                <Pyramid tiers={gameState.tiers} />
            </div>
        </div>
    );
}
