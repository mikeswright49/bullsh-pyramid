import { Card } from './card';
import { GameStage } from 'src/enums/game-stage';

export type GameState = {
    id: string;
    gameStage: GameStage;
    activeIndex: number;
    activeRow: number;
    players: { [key: string]: string };
    tiers: Card[][];
    flipDelay: number;
    playerCount?: number;
    tierCount?: number;
    cardCount: number;
    votes: { [key: string]: string };
};
