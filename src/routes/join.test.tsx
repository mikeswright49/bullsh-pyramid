import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { Join } from './join';
import { PlayerStore } from 'src/stores/player-store';
import { GameStore } from 'src/stores/game-store';

jest.mock('src/stores/player-store');
jest.mock('src/stores/game-store');

describe('<Unit Test> Join Route', () => {
    beforeEach(() => {
        (PlayerStore.createPlayer as jest.Mock).mockReturnValue(Promise.resolve('a-player-id'));

        const oldWindowLocation = window.location;
        delete window.location;

        window.location = Object.defineProperties(
            {},
            {
                ...Object.getOwnPropertyDescriptors(oldWindowLocation),
                assign: {
                    configurable: true,
                    value: jest.fn(),
                },
            }
        );
    });

    it('should render the form with a game id input if no id is provided', () => {
        const { container } = render(<Join />);
        expect(container.querySelector('[data-testid="join-page"]')).toMatchSnapshot();
    });
    it('should render a strong gameId if provided', () => {
        const { container } = render(<Join gameId={'1234'} />);
        expect(container.querySelector('[data-testid="join-page"]')).toMatchSnapshot();
    });
    it('should be able to create the player and add them to the game on submit', async () => {
        const { container } = render(<Join gameId={'1234'} />);
        fireEvent.change(container.querySelector('[data-testid="player-name"]'), {
            target: { value: 'frank' },
        });
        await act(async () =>
            fireEvent.submit(container.querySelector('[data-testid="join-form"]'))
        );
        expect(PlayerStore.createPlayer).toHaveBeenCalledWith('frank', true);
        expect(GameStore.joinGame).toHaveBeenCalledWith('1234', 'a-player-id');
        expect(container.querySelector('[data-testid="join-page"]')).toMatchSnapshot();
        expect(window.location.assign).toHaveBeenCalledWith('/game/1234/player/a-player-id');
    });
});
