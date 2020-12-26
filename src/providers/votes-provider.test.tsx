import React from 'react';
import { useContext } from 'react';
import { render, act } from '@testing-library/react';
import { VoteStore } from 'src/stores/vote-store';
import { VotesContext, VotesProvider } from './votes-provider';
import { MOCK_VOTE } from 'src/__tests__/data/mock-vote';

jest.mock('src/stores/vote-store');

describe('<Unit Test> Votes Provider', () => {
    function ComponentMock() {
        const data = useContext(VotesContext);
        return <div>{JSON.stringify(data)}</div>;
    }

    it('should subscribe to the votes from the store, and map the votes to an array it as a value', async () => {
        let cb;
        (VoteStore.subscribeToVotes as jest.Mock) = jest.fn((id, _cb) => (cb = _cb));

        const { container } = render(
            <VotesProvider gameId="123">
                <ComponentMock />
            </VotesProvider>
        );

        act(() => cb(MOCK_VOTE));

        expect(VoteStore.subscribeToVotes).toHaveBeenCalledWith('123', expect.any(Function));
        expect(container).toMatchSnapshot();
    });
});
