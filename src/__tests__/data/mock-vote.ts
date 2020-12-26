import { MOCK_PLAYER } from './mock-player';

export const MOCK_VOTE = {
    amount: 1,
    card: { hidden: true, suit: 1, value: 12 },
    playerref: { '-MPRrYkfedrmx5dF3KPD': 'ucx' },
    targetref: { '-MPRrYlH53OR8GC58EJO': 'opb' },
    player: MOCK_PLAYER,
    target: {
        hand: [
            { hidden: true, suit: 0, value: 0 },
            { hidden: true, suit: 2, value: 2 },
            { hidden: true, suit: 1, value: 6 },
            { hidden: true, suit: 2, value: 10 },
        ],
        hasVoted: false,
        id: 'opb',
        isHost: false,
        name: 'frank',
        score: 10000,
    },
};
