import { Card } from './card';

export type GameState = {
    players: Card[][];
    tiers: Card[][];
    flattenedTiers: Card[];
};
