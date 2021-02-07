import React from 'react';
import { Player } from '../../../types/player';
import { GameState } from '../../../types/game-state';
import { MOCK_PLAYER } from '../../__tests__/data/mock-player';
import { MOCK_GAME_STATE } from '../../__tests__/data/mock-game-state';
import { GameStage } from '../../enums/game-stage';
import { render, screen } from '@testing-library/react';
import { GameContext } from '../../providers/game-provider';
import { PlayerContext } from '../../providers/player-provider';
import { GameDisplay } from './game-display';

describe('Game Display', () => {
    let playerMock: Player;
    let gameContextMock: GameState;
    beforeEach(() => {
        playerMock = Object.assign({}, MOCK_PLAYER);
        gameContextMock = Object.assign({}, MOCK_GAME_STATE);
    });

    const testCases = Object.keys(GameStage)
        .map((key) => (Number.isInteger(parseInt(key, 10)) ? null : [key]))
        .filter((x) => !!x);
    test.each(testCases)('it should be able to render the game view for %s', (stage) => {
        gameContextMock.gameStage = GameStage[stage];
        render(
            <GameContext.Provider value={gameContextMock}>
                <PlayerContext.Provider value={playerMock}>
                    <GameDisplay />
                </PlayerContext.Provider>
            </GameContext.Provider>
        );
        expect(screen.getByTestId('game-display')).toMatchSnapshot();
    });
});
