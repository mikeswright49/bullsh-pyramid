jest.mock('src/stores/player-store');

import { renderHook, act } from '@testing-library/react-hooks';
import { usePlayer } from './use-player';
import { PlayerStore } from 'src/stores/player-store';

describe('<Unit Test> - usePlayer', () => {
    it('should update when the underlying service updates', () => {
        const updatedPlayer = {
            id: '123',
            name: 'Cam',
            hand: [],
            score: 10000,
            isHost: false,
        };
        let cb;
        (PlayerStore.subscribeToPlayer as jest.Mock) = jest.fn((id, _cb) => (cb = _cb));
        const { result, unmount } = renderHook(() => usePlayer('123'));

        expect(PlayerStore.subscribeToPlayer).toHaveBeenCalledWith('123', expect.any(Function));

        act(() => cb(updatedPlayer));
        expect(result.current).toBe(updatedPlayer);

        unmount();

        expect(PlayerStore.unsubscribeToPlayer).toHaveBeenCalled();
    });
});
