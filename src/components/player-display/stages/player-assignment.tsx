import React, { useContext } from 'react';
import { PlayerContext } from 'src/providers/player-provider';
import { isEmpty } from 'lodash';
import { VoteAssign } from 'src/components/vote-assign/vote-assign';
import { TranslationContext } from 'src/providers/translation-provider';

export function PlayerAssign() {
    const player = useContext(PlayerContext);
    const { translate } = useContext(TranslationContext);
    const hasCards = !isEmpty(player.declaration);

    if (!hasCards) {
        return <h3>{translate('player.display.stage.assign.nocards.title')}</h3>;
    }

    return (
        <div className="stack-y-2">
            <h3>{translate('player.display.stage.assign.hascards.title')}</h3>
            {player?.declaration?.map((declaration) => (
                <VoteAssign key={`${declaration.suit}-${declaration.value}`} card={declaration} />
            ))}
        </div>
    );
}
