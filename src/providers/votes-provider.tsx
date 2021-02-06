import React, { useReducer, useContext } from 'react';
import { useEffect } from 'react';
import { Vote } from 'types/vote';
import { VoteStore } from 'src/stores/vote-store';
import { GameContext } from './game-provider';
export const VotesContext = React.createContext<Vote[]>([]);

export enum VoteAction {
    SetVotes = 'set',
    ClearVotes = 'clear',
    AddVote = 'add',
    RemoveVote = 'remove',
}

export interface VoteState {
    votes: { [key: string]: Vote };
}

const DEFAULT_STATE = {
    votes: {},
};

export function VotesProvider(props: React.PropsWithChildren<unknown>) {
    const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
    const gameContext = useContext(GameContext);

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
            default:
                return DEFAULT_STATE;
        }
    }

    useEffect(() => {
        VoteStore.subscribeToVotes(gameContext.id, dispatch);
    }, [gameContext.id]);

    const votes = Object.values(state.votes).filter(
        (vote: Vote) => vote.turnKey === `${gameContext.activeRow}-${gameContext.activeIndex}`
    ) as Vote[];
    return <VotesContext.Provider value={votes}>{props.children}</VotesContext.Provider>;
}
