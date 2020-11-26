import React from 'react';
import { render } from '@testing-library/react';
import { GameBoard } from './game-board';
import { GameContext } from 'src/context/game-context';
import { DEFAULT_GAME_STATE } from 'src/hooks/use-game-state';
import { GameStage } from 'src/enums/game-stage';

describe('<Unit Test> - Game board', () => {
    it('should return an empty span if in initialization state', () => {
        const { container } = render(
            <GameContext.Provider value={DEFAULT_GAME_STATE}>
                <GameBoard />
            </GameContext.Provider>
        );
        expect(container.querySelector('[data-testid="at-game-board"]')).toMatchSnapshot();
    });
    it('should render the pyramid if not in initialization', () => {
        const gameState = { ...DEFAULT_GAME_STATE };
        gameState.gameStage = GameStage.Bullshit;
        const { container } = render(
            <GameContext.Provider value={gameState}>
                <GameBoard />
            </GameContext.Provider>
        );

        expect(container.querySelector('[data-testid="at-game-board"]')).toMatchSnapshot();
    });
});
