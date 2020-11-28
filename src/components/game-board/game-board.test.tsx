import React from 'react';
import { render } from '@testing-library/react';
import { GameBoard } from './game-board';
import { GameContext } from 'src/context/game-context';
import { DEFAULT_GAME_STATE } from 'src/hooks/use-game-state';
import { GameStage } from 'src/enums/game-stage';
import { useDeviceSize, Breakpoint } from 'src/hooks/use-device-size';
jest.mock('src/hooks/use-device-size');
describe('<Unit Test> - Game board', () => {
    beforeEach(() => {
        ((useDeviceSize as unknown) as jest.Mock).mockReturnValue({
            breakpoint: Breakpoint.LG,
            height: 0,
            width: Breakpoint.LG,
        });
    });

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
    it('should render the mobile friendly version if on a mobile device', () => {
        ((useDeviceSize as unknown) as jest.Mock).mockReturnValue({
            breakpoint: Breakpoint.XS,
            height: 0,
            width: Breakpoint.XS,
        });
        const gameState = { ...DEFAULT_GAME_STATE };
        gameState.gameStage = GameStage.Bullshit;
        gameState.tiers = [[{ value: 1, suit: 2, hidden: false }]];

        const { container } = render(
            <GameContext.Provider value={gameState}>
                <GameBoard />
            </GameContext.Provider>
        );
        expect(container.querySelector('[data-testid="mobile-game-board"]')).toMatchSnapshot();
    });
});
