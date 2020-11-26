import { renderHook, act } from '@testing-library/react-hooks';
import { useGameState, DEFAULT_GAME_STATE } from './use-game-state';
import { GameStage } from 'src/enums/game-stage';
import { GameStore } from 'src/stores/game-store';
jest.mock('src/stores/game-store');

describe('<Unit Test> - useGameState', () => {
    it('should return null if the game id is not provided', () => {
        const { result } = renderHook(() => useGameState(null));
        expect(result.current).toBe(DEFAULT_GAME_STATE);
    });

    it('should update when the underlying service updates', () => {
        const updatedGameState = {
            ...DEFAULT_GAME_STATE,
            gameStage: GameStage.Complete,
        };
        let cb;
        (GameStore.subscribeToGame as jest.Mock) = jest.fn((id, _cb) => (cb = _cb));
        const { result, unmount } = renderHook(() => useGameState('123'));

        expect(GameStore.subscribeToGame).toHaveBeenCalledWith('123', expect.any(Function));

        act(() => cb(updatedGameState));
        expect(result.current.gameStage).toBe(GameStage.Complete);

        unmount();

        expect(GameStore.unsubscribeToGame).toHaveBeenCalled();
    });
});
