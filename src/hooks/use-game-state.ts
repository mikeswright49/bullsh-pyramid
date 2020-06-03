import { useState, useEffect } from 'react';
import { GameState } from 'types/game-state';
import { GameStage } from '../enums/game-stage';
import { GameStore } from '../stores/game-store';

export const DEFAULT_GAME_STATE: GameState = {
    id: '',
    gameStage: GameStage.Initiation,
    activeRow: 0,
    activeIndex: 0,
    players: [],
    tiers: [],
};

export function useGameState(gameId: string) {
    const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE);

    useEffect(() => {
        if (!gameId) {
            return;
        }

        GameStore.subscribeToGame(gameId, (updatedGameState) => {
            setGameState(updatedGameState);
        });

        return () => GameStore.unsubscribeToGame();
    }, [gameId]);

    return gameState;
}
