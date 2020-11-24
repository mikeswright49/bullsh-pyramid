import { useState, useEffect } from 'react';
import { GameStore } from 'src/stores/game-store';
import { Player } from 'types/player';
import { PlayerStore } from 'src/stores/player-store';

export function usePlayers(gameId: string) {
    const [players, setPlayers] = useState<{ [key: string]: Player }>({});

    useEffect(() => {
        if (!gameId) {
            return;
        }

        GameStore.subscribeToPlayers(gameId, (player) => {
            players[player.id] = player;
            PlayerStore.subscribeToHaters(player.id, (hater) => {
                const playerRef = players[player.id];
                if (!playerRef.haters) {
                    playerRef.haters = [];
                }
                playerRef.haters.push(hater);
                setPlayers({ ...players });
            });
            setPlayers({ ...players });
        });
    }, [gameId]);

    return players;
}
