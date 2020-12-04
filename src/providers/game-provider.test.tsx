import React from 'react';
import { GameProvider, DEFAULT_GAME_STATE, GameContext } from './game-provider';
import { useContext } from 'react';
import { render, act } from '@testing-library/react';
import { GameStore } from 'src/stores/game-store';
import { GameStage } from 'src/enums/game-stage';

jest.mock('src/stores/game-store');
describe('<Unit Test> Game Provider', () => {
    function ComponentMock() {
        const data = useContext(GameContext);
        return <div>{JSON.stringify(data)}</div>;
    }

    it('should return null if the game id is not provided', async () => {
        let container: HTMLElement;
        await act(async () => {
            container = render(
                <GameProvider gameId={null}>
                    <ComponentMock />
                </GameProvider>
            ).container;
        });
        expect(container).toMatchSnapshot();
    });

    it('should subscribe to the useGameState, and provide it as a value', async () => {
        const updatedGameState = {
            ...DEFAULT_GAME_STATE,
            gameStage: GameStage.Complete,
        };

        let cb;
        (GameStore.subscribeToGame as jest.Mock) = jest.fn((id, _cb) => (cb = _cb));

        const { container, unmount } = await render(
            <GameProvider gameId="123">
                <ComponentMock />
            </GameProvider>
        );
        act(() => cb(updatedGameState));

        expect(container).toMatchSnapshot();
        unmount();
        expect(GameStore.unsubscribeToGame).toHaveBeenCalled();
    });
});
