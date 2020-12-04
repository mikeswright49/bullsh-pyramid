import React from 'react';
import { usePlayers } from 'src/hooks/use-players';
import { useState, useEffect } from 'react';
import { Player } from 'types/player';
export const PlayersContext = React.createContext<Player[]>([]);

export function PlayersProvider(props: React.PropsWithChildren<{ gameId: string }>) {
    const players = usePlayers(props.gameId);

    const [playersArray, setPlayersArray] = useState([]);

    useEffect(() => {
        const mappedPlayers = Object.values(players);
        setPlayersArray(mappedPlayers);
    }, [players]);

    return <PlayersContext.Provider value={playersArray}>{props.children}</PlayersContext.Provider>;
}
