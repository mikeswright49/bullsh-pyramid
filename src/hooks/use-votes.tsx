import { useState, useEffect } from 'react';
import { Vote } from 'types/vote';
import { VoteStore } from 'src/stores/vote-store';

export function useVotes(gameId: string) {
    const [votes, setVotes] = useState<{ [key: string]: Vote }>({});

    useEffect(() => {
        if (!gameId) {
            return;
        }

        VoteStore.subscribeToVotes(gameId, (vote: Vote) => {
            votes[vote.id] = vote;
            setVotes({ ...votes });
        });
    }, [gameId]);
    return votes;
}
