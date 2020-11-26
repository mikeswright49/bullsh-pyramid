import React from 'react';
import { useGameState } from 'src/hooks/use-game-state';
import { GameContext } from 'src/context/game-context';

export function GameProvider(props: React.PropsWithChildren<{ gameId: string }>) {
    const gameState = useGameState(props.gameId);
    return <GameContext.Provider value={gameState}>{props.children}</GameContext.Provider>;
}
