import React, { useContext } from 'react';
import { TranslationContext, TranslationProvider } from './translation-provider';
import { render } from '@testing-library/react';
import { MOCK_GAME_STATE } from 'src/__tests__/data/mock-game-state';
import { GameContext } from './game-provider';

describe('Translation Provider', () => {
    function ComponentMock() {
        const data = useContext(TranslationContext);
        return <div>{JSON.stringify(data)}</div>;
    }
    it('should be able to load and handle translations', () => {
        const { container } = render(
            <GameContext.Provider value={MOCK_GAME_STATE}>
                <TranslationProvider>
                    <ComponentMock />
                </TranslationProvider>
            </GameContext.Provider>
        );
        expect(container).toMatchSnapshot();
    });
});
