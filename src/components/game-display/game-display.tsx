import React from 'react';
import { GameStage } from 'src/enums/game-stage';
import { useContext } from 'react';
import { GameBoard } from 'src/components/game-board/game-board';
import { GameContext } from 'src/providers/game-provider';

import { GameInitiation } from './stages/game-initiation';
import { GameDeclaration } from './stages/game-declaration';
import { Leaderboard } from 'src/components/leaderboard/leaderboard';
import { GameComplete } from './stages/game-complete';

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
        text: 'You have 30s to remember your cards!',
        hideGameboard: false,
        hideLeaderboard: true,
    },
    [GameStage.Flipping]: {
        text: 'The host is flipping a card',
    },
    [GameStage.Declaration]: {
        text: 'Let the world know if you have it',
        Component: GameDeclaration,
        hideGameboard: false,
        hideLeaderboard: true,
    },
    [GameStage.Bullshit]: {
        text: 'People should know who you think was lieing',
    },
    [GameStage.Reveal]: {
        text: 'We all now know the truth',
    },
    [GameStage.Memory]: {
        text: 'Well which cards did you have?',
    },
    [GameStage.Complete]: {
        text: 'Well time for a new game',
        Component: GameComplete,
    },
};

export function GameDisplay() {
    const gameState = useContext(GameContext);
    const { gameStage } = gameState;

    const displayStage = DISPLAY_CONFIGURATION[gameStage];

    return (
        <div className="row">
            <div className="col-3">
                {displayStage.text && <h2>{displayStage.text}</h2>}
                {displayStage.Component && <displayStage.Component />}
                {!displayStage.hideLeaderboard && <Leaderboard />}
            </div>
            <div className="col-9">{!displayStage.hideGameboard && <GameBoard />}</div>
        </div>
    );
}
