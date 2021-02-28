import React, { useContext } from 'react';
import { TranslationContext } from 'src/providers/translation-provider';
import isEmpty from 'lodash.isempty';
import { transitionToBullshit } from '../transitions/to-bullshit';
import { GameContext } from 'src/providers/game-provider';
import { PlayersContext } from 'src/providers/players-provider';

export function HostAssign() {
    const gameState = useContext(GameContext);
    const players = useContext(PlayersContext);
    const { translate } = useContext(TranslationContext);

    return (
        <div className="stack-y-2">
            <h3>{translate('host.display.stage.assign.title')}</h3>
            <h4>Players submitted:</h4>
            {players
                .filter(
                    (player) =>
                        !isEmpty(player.declaration) &&
                        player.declaration.length === player.voteSubmitted
                )
                .map((player) => (
                    <div key={player.id}>{player.name}</div>
                ))}
            <h4>Players still assigning:</h4>
            {players
                .filter(
                    (player) =>
                        !isEmpty(player.declaration) &&
                        player.declaration.length !== player.voteSubmitted
                )
                .map((player) => (
                    <div key={player.id}>{player.name}</div>
                ))}
            <button
                className="pure-button pure-button-primary"
                onClick={() => transitionToBullshit(gameState.id)}
            >
                {translate('host.display.stage.assign.button')}
            </button>
        </div>
    );
}
