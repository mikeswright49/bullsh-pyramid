import React from 'react';
import { useContext } from 'react';
import { PlayersContext } from 'src/providers/players-provider';
import { PlayersProvider } from './players-provider';
import { render, act } from '@testing-library/react';
import { GameStore } from 'src/stores/game-store';
import { MOCK_PLAYER } from 'src/__tests__/data/mock-player';

jest.mock('src/stores/game-store');
describe('<Unit Test> Players Provider', () => {
    function ComponentMock() {
        const data = useContext(PlayersContext);
        return <div>{JSON.stringify(data)}</div>;
    }

    it('should subscribe to the players from the store, and map the players to an array it as a value', async () => {
        let cb;
        (GameStore.subscribeToPlayers as jest.Mock) = jest.fn((id, _cb) => (cb = _cb));

        const { container } = render(
            <PlayersProvider gameId="123">
                <ComponentMock />
            </PlayersProvider>
        );

        act(() => cb(MOCK_PLAYER));

        expect(GameStore.subscribeToPlayers).toHaveBeenCalledWith('123', expect.any(Function));
        expect(container).toMatchSnapshot();
    });
});
