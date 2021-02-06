import React from 'react';
import { useContext } from 'react';
import { render, act } from '@testing-library/react';
import { VoteStore } from 'src/stores/vote-store';
import { VotesContext, VotesProvider, VoteAction } from './votes-provider';
import { MOCK_VOTE } from 'src/__tests__/data/mock-vote';
import { GameContext } from './game-provider';
import { MOCK_GAME_STATE } from 'src/__tests__/data/mock-game-state';

jest.mock('src/stores/vote-store');

describe('<Unit Test> Votes Provider', () => {
    function ComponentMock() {
        const data = useContext(VotesContext);
        return <div>{JSON.stringify(data)}</div>;
    }

    it('should subscribe to the votes from the store, and map the votes to an array it as a value', async () => {
        let cb;
        (VoteStore.subscribeToVotes as jest.Mock) = jest.fn((_id, _cb) => (cb = _cb));

        const { container } = render(
            <GameContext.Provider value={MOCK_GAME_STATE}>
                <VotesProvider>
                    <ComponentMock />
                </VotesProvider>
            </GameContext.Provider>
        );
        act(() => cb({ type: VoteAction.AddVote, payload: MOCK_VOTE }));

        expect(VoteStore.subscribeToVotes).toHaveBeenCalledWith('mwif', expect.any(Function));
        expect(container).toMatchSnapshot();
    });
});
