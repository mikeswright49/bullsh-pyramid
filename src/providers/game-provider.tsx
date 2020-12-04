import React, { useEffect, useState } from 'react';
import { GameState } from 'types/game-state';
import { GameStore } from 'src/stores/game-store';
import { GameStage } from 'src/enums/game-stage';

export const DEFAULT_GAME_STATE: GameState = {
    id: '',
    gameStage: GameStage.Initiation,
    activeRow: 0,
    activeIndex: 0,
    cardCount: 4,
    flipDelay: 5000,
    players: [],
    tiers: [],
};
export const GameContext = React.createContext<GameState>(DEFAULT_GAME_STATE);

export function GameProvider(props: React.PropsWithChildren<{ gameId: string }>) {
    const { gameId } = props;
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

    return <GameContext.Provider value={gameState}>{props.children}</GameContext.Provider>;
}
