import { MOCK_PLAYER, MOCK_PLAYER_2 } from './mock-player';
import { Vote } from 'types/vote';

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
    target: MOCK_PLAYER_2,
};
