import React from 'react';
import Host from 'src/pages/game/host';
import { render, fireEvent, act } from '@testing-library/react';
import { GameStore } from 'src/stores/game-store';

jest.mock('src/stores/game-store');
describe('<Unit Test> Host Page', () => {
    beforeEach(() => {
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

    it('should render the page', () => {
        const { container } = render(<Host />);
        expect(container.querySelector('[data-testid="host-page"]')).toMatchSnapshot();
    });
    it('should call the store to set up the game on submit', async () => {
        (GameStore.createGame as jest.Mock).mockReturnValue(Promise.resolve('a-game-id'));

        const { container } = render(<Host />);
        fireEvent.change(container.querySelector('[data-testid="player-count"]'), {
            target: { value: '123' },
        });
        fireEvent.change(container.querySelector('[data-testid="tier-count"]'), {
            target: { value: '456' },
        });
        fireEvent.change(container.querySelector('[data-testid="flip-delay"]'), {
            target: { value: '789' },
        });
        await act(async () =>
            fireEvent.submit(container.querySelector('[data-testid="host-form"]'))
        );
        expect(GameStore.createGame).toHaveBeenCalledWith({
            cardCount: 4,
            flipDelay: 789,
            playerCount: 123,
            tierCount: 456,
        });
        expect(window.location.assign).toHaveBeenCalledWith('/game/a-game-id');
    });
});
