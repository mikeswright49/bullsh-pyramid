import React from 'react';
import { PlayerRoute } from './player';
import { render } from '@testing-library/react';
import { PlayerContext } from 'src/providers/player-provider';
import { MOCK_PLAYER } from 'src/__tests__/data/mock-player';

describe('Player Route', () => {
    it('should be able to render the component', () => {
        const { container } = render(
            <PlayerContext.Provider value={MOCK_PLAYER}>
                <PlayerRoute />
            </PlayerContext.Provider>
        );
        expect(container.querySelector('[data-testid="player-route"]')).toMatchSnapshot();
    });
});
