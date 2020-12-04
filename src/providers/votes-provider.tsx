import React from 'react';
import { useVotes } from 'src/hooks/use-votes';
import { useState, useEffect } from 'react';
import { Vote } from 'types/vote';
export const VotesContext = React.createContext<Vote[]>([]);

export function VotesProvider(props: React.PropsWithChildren<{ gameId: string }>) {
    const votes = useVotes(props.gameId);
    const [votesArray, setVotesArray] = useState([]);

    useEffect(() => {
        const votesArray = Object.values(votes);
        setVotesArray(votesArray);
    }, [votes]);

    return <VotesContext.Provider value={votesArray}>{props.children}</VotesContext.Provider>;
}
