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
import { VotesContext } from 'src/providers/votes-provider';

const MEMORIZATION_TIMEOUT = 30000;
const MEMORY_TIMEOUT = 1000;

export function HostDisplay() {
    const gameState = useContext(GameContext);
    const players = useContext(PlayersContext);
    const { dispatch } = useContext(VotesContext);
    const { gameStage, id: gameId, flipDelay } = gameState;
    const timeoutRef = useRef(null);

    /**
     * Transition to the flip phase of the game
     * This is some fucked up shit right here.
     * This is where hooks sucks
     */
    useEffect(() => {
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
                    <h3>You&apos;re still the host</h3>
                    <h4>Everone has 30s to remember their cards!</h4>
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
        case GameStage.Declaration:
            return (
                <div className="stack-y-2">
                    <h3>Players who have finished:</h3>
                    {players
                        .filter((player) => player.hasVoted)
                        .map((player) => {
                            <span>{player.name}</span>;
                        })}
                    <button
                        className="pure-button pure-button-primary"
                        onClick={() => {
                            clearTimeout(timeoutRef.current);
                            transitionToAssignment(gameState.id);
                        }}
                    >
                        Start giving out drinks
                    </button>
                </div>
            );
        case GameStage.Assign:
            return (
                <div className="stack-y-2">
                    <h3>Players who have finished:</h3>
                    {players
                        .filter((player) => player.hasVoted)
                        .map((player) => {
                            <div className="stack-y-2">{player.name}</div>;
                        })}
                    <button
                        className="pure-button pure-button-primary"
                        onClick={() => transitionToBullshit(gameState.id)}
                    >
                        Find who has to do what
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
                        onClick={() => transitionFromReveal(players, gameState, dispatch)}
                    >
                        Flip card
                    </button>
                </div>
            );
        default:
            return null;
    }
}
