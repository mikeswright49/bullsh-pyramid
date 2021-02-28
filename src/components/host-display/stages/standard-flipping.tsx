import React, { useContext } from 'react';
import { TranslationContext } from 'src/providers/translation-provider';
import { GameContext } from 'src/providers/game-provider';
import { transitionToDeclaration } from '../transitions/to-declaration';

export function StandardFlipping() {
    const { translate } = useContext(TranslationContext);
    const gameState = useContext(GameContext);
    return (
        <div className="stack-y-2">
            <h3>{translate('host.display.stage.flipping.title')}</h3>
            <button
                className="pure-button pure-button-primary"
                onClick={() => transitionToDeclaration(gameState)}
            >
                {translate('host.display.stage.flipping.button')}
            </button>
        </div>
    );
}
