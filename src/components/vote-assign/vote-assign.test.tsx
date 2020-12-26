import React from 'react';
import { VoteAssignProps, VoteAssign } from './vote-assign';
import { PlayersContext } from 'src/providers/players-provider';
import { GameContext } from 'src/providers/game-provider';
import { PlayerContext } from 'src/providers/player-provider';
import { render, fireEvent, act } from '@testing-library/react';
import { MOCK_GAME_STATE } from 'src/__tests__/data/mock-game-state';
import { MOCK_PLAYER } from 'src/__tests__/data/mock-player';
import { MOCK_PLAYERS } from 'src/__tests__/data/mock-players';
import { VoteStore } from 'src/stores/vote-store';

jest.mock('src/stores/vote-store');

describe('VoteAssign', () => {
    let mockProps: VoteAssignProps;
    let container: HTMLElement;

    function renderComponent() {
        container = render(
            <GameContext.Provider value={MOCK_GAME_STATE}>
                <PlayersContext.Provider value={MOCK_PLAYERS}>
                    <PlayerContext.Provider value={MOCK_PLAYER}>
                        <VoteAssign {...mockProps} />
                    </PlayerContext.Provider>
                </PlayersContext.Provider>
            </GameContext.Provider>
        ).container;
    }

    beforeEach(() => {
        mockProps = {
            card: { value: 1, suit: 0, hidden: false },
        };

        ((VoteStore.createVote as unknown) as jest.Mock).mockReturnValue(
            Promise.resolve('a-vote-id')
        );
        ((VoteStore.addVote as unknown) as jest.Mock).mockReturnValue(Promise.resolve());
    });

    it('should be able to render the component', () => {
        renderComponent();
        expect(container.querySelector('[data-testid="vote-assign"]')).toMatchSnapshot();
    });
    it('should be able to create the votes for a given set up', async () => {
        renderComponent();
        fireEvent.change(container.querySelector('[data-testid="player-ffy-amount"]'), {
            target: { value: '2' },
        });

        await act(async () =>
            fireEvent.submit(container.querySelector('[data-testid="vote-assign-form"]'))
        );

        expect(container.querySelector('[data-testid="vote-assign"]')).toMatchSnapshot();
        expect(VoteStore.createVote).toHaveBeenCalledWith(
            expect.objectContaining({ amount: 2, playerId: 'nez', targetId: 'ffy' })
        );
        expect(VoteStore.addVote).toHaveBeenCalledWith('mwif', 'a-vote-id');
    });
});
