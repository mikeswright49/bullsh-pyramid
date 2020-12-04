import React from 'react';
import { useState, useEffect } from 'react';
import { Vote } from 'types/vote';
import { VoteStore } from 'src/stores/vote-store';
export const VotesContext = React.createContext<Vote[]>([]);

export function VotesProvider(props: React.PropsWithChildren<{ gameId: string }>) {
    const [votes, setVotes] = useState([]);
    useEffect(() => {
        if (!votes) {
            return;
        }

        VoteStore.subscribeToVotes(props.gameId, (vote: Vote) => {
            votes[vote.id] = vote;
            setVotes({ ...votes });
        });
    }, [props.gameId]);

    return (
        <VotesContext.Provider value={Object.values(votes)}>{props.children}</VotesContext.Provider>
    );
}
