import { Player } from './player';
import { Card } from './card';

export type Vote = {
    playerRef: unknown;
    player: Player;
    targetRef: unknown;
    target: Player;
    card: Card;
    id: string;
    amount: number;
    accepted: boolean;
    bullshit: boolean;
    turnKey: string;
};
