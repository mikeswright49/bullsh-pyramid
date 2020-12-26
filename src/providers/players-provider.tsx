import React from 'react';
import { useState, useEffect } from 'react';
import { Player } from 'types/player';
import { GameStore } from 'src/stores/game-store';

export const PlayersContext = React.createContext<Player[]>([]);

export function PlayersProvider(props: React.PropsWithChildren<{ gameId: string }>) {
    const [players, setPlayers] = useState({});
    useEffect(() => {
        GameStore.subscribeToPlayers(props.gameId, (player: Player) => {
            players[player.id] = player;
            setPlayers({ ...players });
        });
    }, [props.gameId]);
    return (
        <PlayersContext.Provider value={Object.values(players)}>
            {props.children}
        </PlayersContext.Provider>
    );
}
