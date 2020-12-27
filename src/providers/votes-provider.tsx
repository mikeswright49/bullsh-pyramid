import React, { useReducer } from 'react';
import { useEffect } from 'react';
import { Vote } from 'types/vote';
import { VoteStore } from 'src/stores/vote-store';
export const VotesContext = React.createContext<{
    votes: Vote[];
    dispatch: (action: { type: VoteAction; payload?: unknown }) => void;
}>({
    votes: [],
    dispatch: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
});

export enum VoteAction {
    SetVotes = 'set',
    ClearVotes = 'clear',
    AddVote = 'add',
}

export interface VoteState {
    votes: { [key: string]: Vote };
}

const DEFAULT_STATE = {
    votes: {},
};

export function VotesProvider(props: React.PropsWithChildren<{ gameId: string }>) {
    const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);

    function reducer(state: VoteState, action: { type: VoteAction; payload?: unknown }) {
        switch (action.type) {
            case VoteAction.AddVote:
                return {
                    votes: Object.assign({}, state.votes, {
                        [(action.payload as Vote).id]: action.payload as Vote,
                    }),
                };
            case VoteAction.SetVotes:
                return { votes: state.votes };
            case VoteAction.ClearVotes:
                return DEFAULT_STATE;
        }
    }

    useEffect(() => {
        if (!state.votes) {
            return;
        }

        VoteStore.subscribeToVotes(props.gameId, (vote: Vote) => {
            dispatch({
                type: VoteAction.AddVote,
                payload: vote,
            });
        });
    }, [props.gameId]);

    return (
        <VotesContext.Provider value={{ votes: Object.values(state.votes), dispatch }}>
            {props.children}
        </VotesContext.Provider>
    );
}
