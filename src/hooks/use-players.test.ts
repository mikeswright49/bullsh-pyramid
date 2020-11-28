import { GameStore } from 'src/stores/game-store';
import { PlayerStore } from 'src/stores/player-store';
import { renderHook, act } from '@testing-library/react-hooks';
import { usePlayers } from './use-players';
import { Player } from 'types/player';

jest.mock('src/stores/player-store');
jest.mock('src/stores/game-store');
describe('<Unit Test> usePlayers', () => {
    it('should subscribe to the players in the game, their haters and update the state', async () => {
        let playersCallback: (player: Player) => void;
        let hatersCallback: (hater: Player) => void;
        spyOn(GameStore, 'subscribeToPlayers').and.callFake((gameId, callback) => {
            expect(gameId).toBe('123');
            playersCallback = callback;
        });

        spyOn(PlayerStore, 'subscribeToHaters').and.callFake((playerId, callback) => {
            hatersCallback = callback;
        });

        const { result } = renderHook(() => usePlayers('123'));
        expect(result.current).toEqual({});
        expect(GameStore.subscribeToPlayers).toHaveBeenCalledWith('123', expect.any(Function));

        act(() => {
            playersCallback({
                id: '456',
                name: 'frank',
            } as Player);
        });
        expect(result.current).toEqual({
            '456': {
                id: '456',
                name: 'frank',
            },
        });
        expect(PlayerStore.subscribeToHaters).toHaveBeenCalledWith('456', expect.any(Function));

        act(() => {
            hatersCallback({ id: '789', name: 'mike' } as Player);
        });
        expect(result.current).toEqual({
            '456': {
                id: '456',
                name: 'frank',
                haters: [{ id: '789', name: 'mike' }],
            },
        });
    });
});
