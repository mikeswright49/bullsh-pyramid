import React, { useContext } from 'react';
import { TranslationContext } from 'src/providers/translation-provider';
import { Hand } from 'src/components/hand/hand';
import { PlayerContext } from 'src/providers/player-provider';

export function PlayerMemorization() {
    const player = useContext(PlayerContext);
    const { translate } = useContext(TranslationContext);
    return (
        <div className="stack-y-2">
            <h3>{translate('player.display.stage.memorization.title')}</h3>
            <div className="stack-y-2">
                <h3>{translate('global.your_hand')}</h3>
                <Hand cards={player.hand} />
            </div>
        </div>
    );
}
