import React from 'react';
import { usePlayers } from 'src/hooks/use-players';
import { PlayersContext } from 'src/context/players-context';
import { useState, useEffect } from 'react';

export function PlayersProvider(props: React.PropsWithChildren<{ gameId: string }>) {
    const players = usePlayers(props.gameId);

    const [playersArray, setPlayersArray] = useState([]);

    useEffect(() => {
        const mappedPlayers = Object.values(players);
        setPlayersArray(mappedPlayers);
    }, [players]);

    return <PlayersContext.Provider value={playersArray}>{props.children}</PlayersContext.Provider>;
}
