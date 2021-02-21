import React from 'react';
import { GameStage } from 'src/enums/game-stage';
import { HostDisplay } from './host-display';
import { GameContext } from 'src/providers/game-provider';
import { render, screen } from '@testing-library/react';
import { PlayersContext } from 'src/providers/players-provider';
import { GameState } from 'types/game-state';
import { MOCK_GAME_STATE } from 'src/__tests__/data/mock-game-state';
import { MOCK_PLAYERS } from 'src/__tests__/data/mock-players';
import { TranslationContext } from 'src/providers/translation-provider';
import { MOCK_TRANSLATIONS } from 'src/__tests__/data/mock-translations';

describe('HostDisplay', () => {
    let gameContextMock: GameState;
    beforeEach(() => {
        gameContextMock = Object.assign({}, MOCK_GAME_STATE);
    });

    const testCases = Object.keys(GameStage)
        .map((key) => (Number.isInteger(parseInt(key, 10)) ? null : [key]))
        .filter((x) => !!x);
    test.each(testCases)('it should be able to render the host view for %s', (stage) => {
        gameContextMock.gameStage = GameStage[stage];
        render(
            <GameContext.Provider value={gameContextMock}>
                <PlayersContext.Provider value={MOCK_PLAYERS}>
                    <TranslationContext.Provider value={MOCK_TRANSLATIONS}>
                        <HostDisplay />
                    </TranslationContext.Provider>
                </PlayersContext.Provider>
            </GameContext.Provider>
        );
        expect(screen.getByTestId('host-display')).toMatchSnapshot();
    });
});
