import React, { useContext } from 'react';
import { isEmpty } from 'lodash';
import { PlayersContext } from 'src/context/players-context';

export function Leaderboard() {
    const players = useContext(PlayersContext);

    if (isEmpty(players)) {
        return null;
    }

    return <div />;
}
