import { GameState } from 'types/game-state';

export const MOCK_GAME_STATE: GameState = {
    activeIndex: 2,
    activeRow: 1,
    cardCount: 4,
    flipDelay: 5000,
    gameStage: 6,
    id: 'mwif',
    playerCount: 3,
    players: { '-MPR7tPKh4aEzs2tcMgU': 'nez', '-MPR7u6USHHoRhSp6EcC': 'ffy' },
    tierCount: 5,
    tiers: [
        [
            { hidden: false, suit: 1, value: 2 },
            { hidden: false, suit: 2, value: 1 },
            { hidden: false, suit: 3, value: 12 },
            { hidden: false, suit: 0, value: 12 },
            { hidden: false, suit: 1, value: 12 },
        ],
        [
            { hidden: false, suit: 1, value: 0 },
            { hidden: false, suit: 2, value: 10 },
            { hidden: false, suit: 3, value: 10 },
            { hidden: true, suit: 3, value: 7 },
        ],
        [
            { hidden: true, suit: 0, value: 2 },
            { hidden: true, suit: 3, value: 3 },
            { hidden: true, suit: 1, value: 7 },
        ],
        [
            { hidden: true, suit: 3, value: 1 },
            { hidden: true, suit: 0, value: 10 },
        ],
        [{ hidden: true, suit: 1, value: 5 }],
    ],
    votes: {
        '-MPRafBjQ-zJGRkBO4nT': 'qdc',
        '-MPRafZhwzaOtZ8dwBQd': 'yya',
        '-MPRafqZfQsmIwRmkfPi': 'bgh',
        '-MPRag6XdifrVrEtwztR': 'cyq',
    },
};
