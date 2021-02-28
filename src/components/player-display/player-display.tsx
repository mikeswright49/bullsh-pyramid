import React, { useContext } from 'react';
import { GameStage } from 'src/enums/game-stage';
import { Hand } from 'src/components/hand/hand';
import { GameContext } from 'src/providers/game-provider';
import { PlayerContext } from 'src/providers/player-provider';
import { TranslationContext } from 'src/providers/translation-provider';

import { PlayerDeclaration } from './stages/player-declaration';
import { PlayerBullshit } from './stages/player-bullshit';
import { PlayerReveal } from './stages/player-reveal';
import { PlayerAssign } from './stages/player-assignment';
import { PlayerInitiation } from './stages/player-initiation';
import { PlayerMemorization } from './stages/player-memorization';

export function PlayerDisplay() {
    const gameState = useContext(GameContext);
    const player = useContext(PlayerContext);
    const { translate } = useContext(TranslationContext);
    const { gameStage } = gameState;

    if (!player || !gameState) {
        return null;
    }

    function renderPlayerDisplay() {
        switch (gameStage) {
            case GameStage.Initiation:
                return <PlayerInitiation />;
            case GameStage.Memorization:
                return <PlayerMemorization />;
            case GameStage.Flipping:
                return (
                    <div className="stack-y-2">
                        <h3>{translate('player.display.stage.flipping.title')}</h3>
                        <div className="stack-y-2">
                            <h3>{translate('global.your_hand')}</h3>
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
