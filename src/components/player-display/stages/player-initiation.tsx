import React, { useContext } from 'react';
import { TranslationContext } from 'src/providers/translation-provider';

export function PlayerInitiation() {
    const { translate } = useContext(TranslationContext);
    return (
        <div className="stack-y-2">
            <h3>{translate('player.display.stage.initiation.title')}</h3>
        </div>
    );
}
