import { MOCK_PLAYER } from './mock-player';
import { Vote } from 'types/vote';
import { Player } from 'types/player';

export const MOCK_VOTE: Vote = {
    id: 'abc',
    accepted: false,
    bullshit: false,
    turnKey: '1-2',
    amount: 1,
    card: { hidden: true, suit: 1, value: 12 },
    playerRef: { '-MPRrYkfedrmx5dF3KPD': 'ucx' },
    targetRef: { '-MPRrYlH53OR8GC58EJO': 'opb' },
    player: MOCK_PLAYER,
    target: {
        hand: [
            { hidden: true, suit: 0, value: 0 },
            { hidden: true, suit: 2, value: 2 },
            { hidden: true, suit: 1, value: 6 },
            { hidden: true, suit: 2, value: 10 },
        ],
        id: 'opb',
        isHost: false,
        name: 'frank',
        score: 10000,
    } as Player,
};
