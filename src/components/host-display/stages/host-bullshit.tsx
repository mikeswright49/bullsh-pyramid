import { transitionToReveal } from '../transitions/to-reveal';
import React, { useContext } from 'react';
import { GameContext } from 'src/providers/game-provider';
import { TranslationContext } from 'src/providers/translation-provider';
import { VotesContext } from 'src/providers/votes-provider';

export function HostBullshit() {
    const gameState = useContext(GameContext);
    const votes = useContext(VotesContext);
    const { translate } = useContext(TranslationContext);

    const uniqueAwaiting = votes
        .filter((vote) => !vote.accepted && !vote.bullshit)
        .map((vote) => vote.target.name)
        .filter((v, i, a) => a.indexOf(v) === i);

    return (
        <div className="stack-y-2">
            <h3>{translate('host.display.stage.bullshit.title')}</h3>
            <h4>Still waiting on:</h4>
            {uniqueAwaiting.map((player) => (
                <div key={player}>{player}</div>
            ))}
            <button
                className="pure-button pure-button-primary"
                onClick={() => transitionToReveal(gameState.id)}
            >
                {translate('host.display.stage.bullshit.button')}
            </button>
        </div>
    );
}
