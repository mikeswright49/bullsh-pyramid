import React from 'react';
import { GameStage } from 'src/enums/game-stage';
import { useContext } from 'react';
import { GameBoard } from 'src/components/game-board/game-board';
import { GameContext } from 'src/providers/game-provider';

import { GameInitiation } from './stages/game-initiation';
import { GameDeclaration } from './stages/game-declaration';
import { GameComplete } from './stages/game-complete';
import { TranslationContext } from 'src/providers/translation-provider';

type DisplayConfiguration = {
    text: string;
    Component?: () => JSX.Element;
    hideLeaderboard?: boolean;
    hideGameboard?: boolean;
};
const DISPLAY_CONFIGURATION: { [key: number]: DisplayConfiguration } = {
    [GameStage.Initiation]: {
        text: '',
        Component: GameInitiation,
        hideGameboard: true,
        hideLeaderboard: true,
    },
    [GameStage.Memorization]: {
        text: 'game.display.stage.memorization.text',
        hideGameboard: false,
        hideLeaderboard: true,
    },
    [GameStage.Flipping]: {
        text: 'game.display.stage.flipping.text',
    },
    [GameStage.Declaration]: {
        text: 'game.display.stage.declaration.text',
        Component: GameDeclaration,
        hideGameboard: false,
        hideLeaderboard: true,
    },
    [GameStage.Assign]: {
        text: 'game.display.stage.assign.text',
    },
    [GameStage.Bullshit]: {
        text: 'game.display.stage.bullshit.text',
    },
    [GameStage.Reveal]: {
        text: 'game.display.stage.reveal.text',
    },
    [GameStage.Memory]: {
        text: 'game.display.stage.memory.text',
    },
    [GameStage.Complete]: {
        text: 'game.display.stage.complete.text',
        Component: GameComplete,
    },
};

export function GameDisplay() {
    const gameState = useContext(GameContext);
    const { translate } = useContext(TranslationContext);
    const { gameStage } = gameState;

    const displayStage = DISPLAY_CONFIGURATION[gameStage];

    if (!displayStage) {
        return null;
    }

    return (
        <div className="row" data-testid="game-display">
            <div className="col-3">
                {displayStage.text && <h2>{translate(displayStage.text)}</h2>}
                {displayStage.Component && <displayStage.Component />}
            </div>
            <div className="col-9">{!displayStage.hideGameboard && <GameBoard />}</div>
        </div>
    );
}
