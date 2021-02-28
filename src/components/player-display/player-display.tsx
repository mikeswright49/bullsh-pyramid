import React, { useContext } from 'react';
import { GameStage } from 'src/enums/game-stage';
import { Hand } from 'src/components/hand/hand';
import { GameContext } from 'src/providers/game-provider';

import { PlayerDeclaration } from './stages/player-declaration';
import { PlayerBullshit } from './stages/player-bullshit';
import { PlayerReveal } from './stages/player-reveal';
import { PlayerAssign } from './stages/player-assignment';
import { PlayerContext } from '../../providers/player-provider';

export function PlayerDisplay() {
    const gameState = useContext(GameContext);
    const player = useContext(PlayerContext);
    const { gameStage } = gameState;

    if (!player || !gameState) {
        return null;
    }

    function renderPlayerDisplay() {
        switch (gameStage) {
            case GameStage.Initiation:
                return (
                    <div className="stack-y-2">
                        <h3>Waiting for the game to start</h3>
                    </div>
                );
            case GameStage.Memorization:
                return (
                    <div className="stack-y-2">
                        <h3>You have 30s to remember your cards!</h3>
                        <div className="stack-y-2">
                            <Hand cards={player.hand} />
                        </div>
                    </div>
                );
            case GameStage.Flipping:
                return (
                    <div className="stack-y-2">
                        <h3>Flipping a card</h3>
                        <div className="stack-y-2">
                            <Hand cards={player.hand} />
                        </div>
                    </div>
                );
            case GameStage.Declaration:
                return <PlayerDeclaration />;
            case GameStage.Assign:
                return <PlayerAssign />;
            case GameStage.Bullshit:
                return <PlayerBullshit />;
            case GameStage.Reveal:
                return <PlayerReveal />;
            case GameStage.Memory:
                return (
                    <>
                        <div className="stack-y-2">
                            <h3>Well which cards did you have?</h3>
                        </div>
                    </>
                );
            case GameStage.Complete:
                return (
                    <>
                        <div className="stack-y-2">
                            <h3>Game Over Everyone</h3>
                        </div>
                    </>
                );
            default:
                return <h1>Terrible error</h1>;
        }
    }

    return <div data-testid="player-display">{renderPlayerDisplay()}</div>;
}
