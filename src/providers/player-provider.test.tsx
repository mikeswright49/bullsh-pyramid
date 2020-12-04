import React from 'react';
import { PlayerStore } from 'src/stores/player-store';
import { PlayerProvider, PlayerContext } from './player-provider';
import { render, act } from '@testing-library/react';
import { useContext } from 'react';
import { Player } from 'types/player';

jest.mock('src/stores/player-store');
describe('Player Provider', () => {
    function ComponentMock() {
        const data = useContext(PlayerContext);
        return <div>{JSON.stringify(data)}</div>;
    }

    it('should update when the underlying service updates', async () => {
        const updatedPlayer = {
            id: '123',
            name: 'Cam',
            hand: [],
            score: 10000,
            isHost: false,
        } as Player;
        let cb: (player: Player) => void;
        (PlayerStore.subscribeToPlayer as jest.Mock) = jest.fn((id, _cb) => (cb = _cb));

        const { container, unmount } = await render(
            <PlayerProvider playerId="123">
                <ComponentMock />
            </PlayerProvider>
        );
        act(() => cb(updatedPlayer));
        expect(PlayerStore.subscribeToPlayer).toHaveBeenCalledWith('123', expect.any(Function));
        expect(container).toMatchSnapshot();
        unmount();
        expect(PlayerStore.unsubscribeToPlayer).toHaveBeenCalled();
    });
});
