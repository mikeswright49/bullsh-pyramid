import { Card } from './card';
import { GameStage } from 'src/enums/game-stage';

export enum GameType {
    Standard,
    Open,
}

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
    language?: string;
    cardCount: number;
    votes: { [key: string]: string };
    gameType: GameType;
};
