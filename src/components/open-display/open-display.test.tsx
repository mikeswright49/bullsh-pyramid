import React from 'react';
import { GameStage } from 'src/enums/game-stage';
import { OpenDisplay } from './open-display';
import { MOCK_PLAYER } from 'src/__tests__/data/mock-player';
import { render, screen } from '@testing-library/react';
import { GameContext } from 'src/providers/game-provider';
import { PlayerContext } from 'src/providers/player-provider';
import { GameState } from 'types/game-state';
import { MOCK_GAME_STATE } from 'src/__tests__/data/mock-game-state';
import { PlayersContext } from 'src/providers/players-provider';
import { MOCK_PLAYERS } from 'src/__tests__/data/mock-players';

describe('Open display', () => {
    let gameContextMock: GameState;

    beforeEach(() => {
        gameContextMock = Object.assign({}, MOCK_GAME_STATE);
    });

    const testCases = [[GameStage.Initiation], [GameStage.Memorization], [GameStage.Flipping]];
    test.each(testCases)('It should be able to render for %s', (stage) => {
        gameContextMock.gameStage = stage;
        render(
            <GameContext.Provider value={gameContextMock}>
                <PlayersContext.Provider value={MOCK_PLAYERS}>
                    <PlayerContext.Provider value={MOCK_PLAYER}>
                        <OpenDisplay />
                    </PlayerContext.Provider>
                </PlayersContext.Provider>
            </GameContext.Provider>
        );
        expect(screen.getByTestId('open-display')).toMatchSnapshot();
    });
});
