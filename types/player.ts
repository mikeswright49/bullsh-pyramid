import { Card } from './card';

export type Player = {
    id: string;
    name: string;
    hand: Card[];
    score: number;
    isHost: boolean;
    declaration: Card[];
    voteSubmitted?: number;
};
