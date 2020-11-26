import React from 'react';
import { useGameState } from 'src/hooks/use-game-state';
import { GameContext } from 'src/context/game-context';
import { useEffect } from 'react';
import { GameStore } from 'src/stores/game-store';

export function GameProvider(props: React.PropsWithChildren<{ gameId: string }>) {
    useEffect(() => {
        GameStore.init();
    }, []);

    const gameState = useGameState(props.gameId);
    return <GameContext.Provider value={gameState}>{props.children}</GameContext.Provider>;
}
