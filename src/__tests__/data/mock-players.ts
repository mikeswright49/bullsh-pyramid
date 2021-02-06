import { Player } from 'types/player';

export const MOCK_PLAYERS: Player[] = [
    {
        declaration: [{ hidden: true, suit: 3, value: 8 }],
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
    },
    {
        hand: [
            { hidden: true, suit: 1, value: 4 },
            { hidden: true, suit: 0, value: 6 },
            { hidden: true, suit: 2, value: 2 },
            { hidden: true, suit: 0, value: 8 },
        ],
        id: 'ffy',
        isHost: false,
        name: 'joe',
        score: 10000,
        declaration: null,
    },
];
