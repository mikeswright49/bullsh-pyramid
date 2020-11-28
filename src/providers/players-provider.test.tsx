import React from 'react';
import { useContext } from 'react';
import { PlayersContext } from 'src/context/players-context';
import { PlayersProvider } from './players-provider';
import { render, act } from '@testing-library/react';
import { usePlayers } from 'src/hooks/use-players';

jest.mock('src/hooks/use-players');
describe('<Unit Test> Players Provider', () => {
    function ComponentMock() {
        const data = useContext(PlayersContext);
        return <div>{JSON.stringify(data)}</div>;
    }

    beforeEach(() => {
        (usePlayers as jest.Mock).mockReturnValue({ '123': { name: 'Frank' } });
    });

    it('should subscribe to the usePlayers, and map the players to an array it as a value', async () => {
        let container: HTMLElement;
        await act(async () => {
            container = render(
                <PlayersProvider gameId="123">
                    <ComponentMock />
                </PlayersProvider>
            ).container;
        });
        expect(usePlayers).toHaveBeenCalledWith('123');
        expect(container).toMatchSnapshot();
    });
});
