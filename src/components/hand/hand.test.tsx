import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { Hand, HandProps } from './hand';

describe('<Unit Test> Hand', () => {
    let mockProps: HandProps;
    beforeEach(() => {
        mockProps = {
            cards: [
                {
                    value: 1,
                    hidden: false,
                    suit: 0,
                },
                {
                    value: 2,
                    hidden: false,
                    suit: 0,
                },
                {
                    value: 3,
                    hidden: false,
                    suit: 0,
                },
            ],
            selectedCards: [],
            onSelected: jest.fn(),
        };
    });

    it('should be able to render the component', () => {
        const { container } = render(<Hand {...mockProps} />);
        expect(container).toMatchSnapshot();
    });

    it('should hide the card if it is selected', () => {
        mockProps.selectedCards = [{ value: 1, suit: 0, hidden: false }];
        const { container } = render(<Hand {...mockProps} />);
        expect(container).toMatchSnapshot();
    });

    it('should call the props callback if the button is clicked', () => {
        render(<Hand {...mockProps} />);
        fireEvent.click(screen.getByTestId('card-0-1'));
        expect(mockProps.onSelected).toHaveBeenCalled();
    });
});
