import React, { useContext, useEffect } from 'react';
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

const MEMORIZATION_TIMEOUT = 30000;
const MEMORY_TIMEOUT = 10000;

export function HostDisplay() {
    const gameState = useContext(GameContext);
    const players = useContext(PlayersContext);
    const { gameStage, id: gameId, flipDelay } = gameState;

    /**
     * Transition to the flip phase of the game
     * This is some fucked up shit right here.
     * This is where hooks sucks
     */
    useEffect(() => {
        let ref: NodeJS.Timeout;
        if (gameStage === GameStage.Memorization) {
            ref = setTimeout(() => transitionToFlipping(players, gameState), MEMORIZATION_TIMEOUT);
        } else if (gameStage === GameStage.Declaration) {
            ref = setTimeout(() => transitionToBullshit(gameId), flipDelay);
        } else if (gameStage === GameStage.Memory) {
            ref = setTimeout(() => transitionToNewGame(gameId), MEMORY_TIMEOUT);
        }
        return () => {
            clearTimeout(ref);
        };
    }, [gameStage]);

    if (!gameState) {
        return null;
    }

    switch (gameStage) {
        case GameStage.Initiation:
            return (
                <div className="stack-y-2">
                    <h2>You&apos;re the host</h2>
                    <button
                        className="pure-button pure-button-primary"
                        onClick={() => transitionToMemorization(players, gameState)}
                    >
                        Start game
                    </button>
                </div>
            );
        case GameStage.Memorization:
            return (
                <div className="stack-y-2">
                    <h3>Everone has 30s to remember your cards!</h3>
                </div>
            );
        case GameStage.Flipping:
            return (
                <div className="stack-y-2">
                    <h3>Time to start flipping cards</h3>
                    <button
                        className="pure-button pure-button-primary"
                        onClick={() => transitionToDeclaration(gameState)}
                    >
                        Flip card
                    </button>
                </div>
            );
        case GameStage.Bullshit:
            return (
                <div className="stack-y-2">
                    <h3>Click the button to find out whats next</h3>
                    <button
                        className="pure-button pure-button-primary"
                        onClick={() => transitionToReveal(gameState.id)}
                    >
                        Reveal the truth
                    </button>
                </div>
            );
        case GameStage.Reveal:
            return (
                <div className="stack-y-2">
                    <h3>Move onto next round</h3>
                    <button
                        className="pure-button pure-button-primary"
                        onClick={() => transitionFromReveal(players, gameState)}
                    >
                        Flip card
                    </button>
                </div>
            );
        default:
            return null;
    }
}
