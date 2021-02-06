import { Player } from 'types/player';

export const MOCK_PLAYER: Player = {
    hand: [
        { hidden: true, suit: 2, value: 7 },
        { hidden: true, suit: 3, value: 8 },
        { hidden: true, suit: 1, value: 11 },
        { hidden: true, suit: 2, value: 0 },
    ],
    id: 'nez',
    isHost: true,
    name: 'frank',
    score: 10000,
    declaration: [],
};
