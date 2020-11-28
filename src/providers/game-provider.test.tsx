import React from 'react';
import { GameProvider } from './game-provider';
import { useContext } from 'react';
import { GameContext } from 'src/context/game-context';
import { render, act } from '@testing-library/react';
import { useGameState, DEFAULT_GAME_STATE } from 'src/hooks/use-game-state';

jest.mock('src/hooks/use-game-state');
describe('<Unit Test> Game Provider', () => {
    function ComponentMock() {
        const data = useContext(GameContext);
        return <div>{JSON.stringify(data)}</div>;
    }

    beforeEach(() => {
        (useGameState as jest.Mock).mockReturnValue(DEFAULT_GAME_STATE);
    });

    it('should subscribe to the useGameState, and provide it as a value', async () => {
        let container: HTMLElement;
        await act(async () => {
            container = render(
                <GameProvider gameId="123">
                    <ComponentMock />
                </GameProvider>
            ).container;
        });
        expect(useGameState).toHaveBeenCalledWith('123');
        expect(container).toMatchSnapshot();
    });
});
