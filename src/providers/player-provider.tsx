import React from 'react';
import { useState, useEffect } from 'react';
import { Player } from 'types/player';
import { PlayerStore } from 'src/stores/player-store';
export const PlayerContext = React.createContext<Player>(null);

export function PlayerProvider(props: React.PropsWithChildren<{ playerId: string }>) {
    const [player, setPlayer] = useState<Player>();

    useEffect(() => {
        if (!props.playerId) {
            return;
        }
        PlayerStore.subscribeToPlayer(props.playerId, (updatedPlayer) => {
            setPlayer(updatedPlayer);
        });

        return () => PlayerStore.unsubscribeToPlayer();
    }, [props.playerId]);

    return <PlayerContext.Provider value={player}>{props.children}</PlayerContext.Provider>;
}
