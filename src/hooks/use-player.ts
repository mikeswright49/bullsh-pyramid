import { Player } from 'types/player';
import { useState, useEffect } from 'react';
import { PlayerStore } from 'src/stores/player-store';

export function usePlayer(playerId: string) {
    const [player, setPlayer] = useState<Player>();

    useEffect(() => {
        if (!playerId) {
            return;
        }

        PlayerStore.subscribeToPlayer(playerId, (updatedPlayer) => {
            setPlayer(updatedPlayer);
        });

        return () => PlayerStore.unsubscribeToPlayer();
    }, [playerId]);

    return player;
}
