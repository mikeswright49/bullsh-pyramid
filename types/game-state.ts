import { Card } from './card';
import { GameStage } from 'src/enums/game-stage';

export type GameState = {
    id: string;
    gameStage: GameStage;
    activeIndex: number;
    activeRow: number;
    playerCount?: number;
    tierCount?: number;
    players: { key: string }[];
    tiers: Card[][];
};
