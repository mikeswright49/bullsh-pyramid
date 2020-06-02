import React from 'react';
import { render } from '@testing-library/react';
import { GameBoard } from './game-board';
import { DEFAULT_GAME_STATE } from '../../hooks/use-game-state';
import { GameStage } from '../../enums/game-stage';

describe('<Unit Test> - Game board', () => {
    it('should return an empty span if in initialization state', () => {
        const { container } = render(<GameBoard gameState={DEFAULT_GAME_STATE} />);
        expect(container.querySelector('[data-testid="at-game-board"]')).toMatchSnapshot();
    });
    it('should render the pyramid if not in initialization', () => {
        const gameState = { ...DEFAULT_GAME_STATE };
        gameState.gameStage = GameStage.Bullshit;
        const { container } = render(<GameBoard gameState={gameState} />);

        expect(container.querySelector('[data-testid="at-game-board"]')).toMatchSnapshot();
    });
});
