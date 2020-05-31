import { useState, useEffect } from 'react';
import { GameState } from 'types/game-state';
import { GameStage } from '../enums/game-stage';
import { subscribeToGame, unsubscribeToGame } from '../services/firebase-db';

export const DEFAULT_GAME_STATE = {
    id: '',
    gameStage: GameStage.Initiation,
    activeRow: 0,
    activeIndex: 0,
    players: null,
    tiers: null,
};

export function useGameState(gameId: string) {
    const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE);

    useEffect(() => {
        if (!gameId) {
            return;
        }

        subscribeToGame(gameId, (updatedGameState) => {
            setGameState(updatedGameState);
        });

        return () => unsubscribeToGame(gameId);
    }, [gameId]);

    return gameState;
}
