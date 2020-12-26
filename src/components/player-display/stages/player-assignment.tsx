import React, { useContext } from 'react';
import { PlayerContext } from 'src/providers/player-provider';
import { isEmpty } from 'lodash';
import { VoteAssign } from 'src/components/vote-assign/vote-assign';

export function PlayerAssign() {
    const player = useContext(PlayerContext);
    const hasCards = !isEmpty(player.declaration);
    if (!hasCards) {
        <h3>You don&apos;t have this card, just sit back and relax</h3>;
    }
    return (
        <div className="stack-y-2">
            <h3>Time to give out some &quot;points&quot;</h3>
            {player?.declaration?.map((declaration) => (
                <VoteAssign key={`${declaration.suit}-${declaration.value}`} card={declaration} />
            ))}
        </div>
    );
}
