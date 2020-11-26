import React from 'react';
import { GameState } from 'types/game-state';
import { DEFAULT_GAME_STATE } from 'src/hooks/use-game-state';

export const GameContext = React.createContext<GameState>(DEFAULT_GAME_STATE);
