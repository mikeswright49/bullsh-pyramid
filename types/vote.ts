import { Player } from './player';
import { Card } from './card';

export type Vote = {
    playerRef: string;
    player: Player;
    targetRef: string;
    target: Player;
    card: Card;
    id: string;
    amount: number;
};
