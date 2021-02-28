import React, { useContext } from 'react';
import { TranslationContext } from 'src/providers/translation-provider';
import { GameContext } from 'src/providers/game-provider';
import { openFlipping } from '../transitions/open-flipping';

export function OpenFlipping() {
    const { translate } = useContext(TranslationContext);
    const gameState = useContext(GameContext);

    return (
        <div className="stack-y-2">
            <h3>{translate('host.display.stage.flipping.title')}</h3>
            <button
                className="pure-button pure-button-primary"
                onClick={() => openFlipping(gameState)}
            >
                {translate('host.display.stage.flipping.button')}
            </button>
        </div>
    );
}
