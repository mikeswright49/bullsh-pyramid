import React, { useContext, useEffect, useRef } from 'react';
import { GameContext } from 'src/providers/game-provider';

import { GameStage } from 'src/enums/game-stage';
import { PlayersContext } from 'src/providers/players-provider';
import { transitionToMemorization } from './transitions/to-memorization';
import { transitionToFlipping } from './transitions/to-flipping';
import { transitionToBullshit } from './transitions/to-bullshit';
import { transitionToNewGame } from './transitions/to-new-game';
import { transitionToDeclaration } from './transitions/to-declaration';
import { transitionToReveal } from './transitions/to-reveal';
import { transitionFromReveal } from './transitions/from-reveal';
import { transitionToAssignment } from './transitions/to-assignment';
import { TranslationContext } from 'src/providers/translation-provider';

const MEMORIZATION_TIMEOUT = 30000;
const MEMORY_TIMEOUT = 1000;

export function HostDisplay() {
    const gameState = useContext(GameContext);
    const players = useContext(PlayersContext);
    const { translate } = useContext(TranslationContext);
    const { gameStage, id: gameId, flipDelay } = gameState;
    const timeoutRef = useRef(null);

    /**
     * Transition to the flip phase of the game
     * This is some fucked up shit right here.
     * This is where hooks sucks
     */
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (gameStage === GameStage.Memorization) {
            timeoutRef.current = setTimeout(
                () => transitionToFlipping(players, gameState),
                MEMORIZATION_TIMEOUT
            );
        } else if (gameStage === GameStage.Declaration) {
            timeoutRef.current = setTimeout(() => transitionToAssignment(gameId), flipDelay);
        } else if (gameStage === GameStage.Memory) {
            timeoutRef.current = setTimeout(() => transitionToNewGame(gameId), MEMORY_TIMEOUT);
        }
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [gameStage]);

    function renderHostDisplay() {
        switch (gameStage) {
            case GameStage.Initiation:
                return (
                    <div className="stack-y-2">
                        <h2>{translate('host.display.stage.initiation.title')}</h2>
                        <button
                            className="pure-button pure-button-primary"
                            onClick={() => transitionToMemorization(players, gameState)}
                        >
                            {translate('host.display.stage.initiation.button')}
                        </button>
                    </div>
                );
            case GameStage.Memorization:
                return (
                    <div className="stack-y-2">
                        <h3>{translate('host.display.stage.memorization.title')}</h3>
                        <h4>{translate('host.display.stage.memorization.subtitle')}</h4>
                    </div>
                );
            case GameStage.Flipping:
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
            case GameStage.Declaration:
                return (
                    <div className="stack-y-2">
                        <button
                            className="pure-button pure-button-primary"
                            onClick={() => {
                                clearTimeout(timeoutRef.current);
                                transitionToAssignment(gameState.id);
                            }}
                        >
                            {translate('host.display.stage.declaration.button')}
                        </button>
                    </div>
                );
            case GameStage.Assign:
                return (
                    <div className="stack-y-2">
                        <h3>{translate('host.display.stage.assign.title')}</h3>
                        <button
                            className="pure-button pure-button-primary"
                            onClick={() => transitionToBullshit(gameState.id)}
                        >
                            {translate('host.display.stage.assign.button')}
                        </button>
                    </div>
                );
            case GameStage.Bullshit:
                return (
                    <div className="stack-y-2">
                        <h3>{translate('host.display.stage.bullshit.title')}</h3>
                        <button
                            className="pure-button pure-button-primary"
                            onClick={() => transitionToReveal(gameState.id)}
                        >
                            {translate('host.display.stage.bullshit.button')}
                        </button>
                    </div>
                );
            case GameStage.Reveal:
                return (
                    <div className="stack-y-2">
                        <h3>{translate('host.display.stage.reveal.title')}</h3>
                        <button
                            className="pure-button pure-button-primary"
                            onClick={() => transitionFromReveal(players, gameState)}
                        >
                            {translate('host.display.stage.reveal.button')}
                        </button>
                    </div>
                );
            default:
                return null;
        }
    }

    if (!gameState) {
        return null;
    }

    return <div data-testid="host-display">{renderHostDisplay()}</div>;
}
