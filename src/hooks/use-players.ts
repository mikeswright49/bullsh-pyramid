import { useState, useEffect } from 'react';
import { GameStore } from 'src/stores/game-store';
import { Player } from 'types/player';

export function usePlayers(gameId: string) {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        if (!gameId) {
            return;
        }

        GameStore.subscribeToPlayers(gameId, (player) => {
            setPlayers((players) => [...players, player]);
        });
    }, [gameId]);

    return players;
}
