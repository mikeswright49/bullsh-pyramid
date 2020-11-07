import { render } from '@testing-library/react';
import React from 'react';
import { Hand, HandProps } from './hand';

describe('<Unit Test> Hand', () => {
    let mockProps: HandProps;
    beforeEach(() => {
        mockProps = {
            showSelector: false,
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
        };
    });

    it('should be able to render the component', () => {
        const { container } = render(<Hand {...mockProps} />);
        expect(container).toMatchSnapshot();
    });

    it('should be able to show the selection button', () => {
        mockProps.showSelector = true;
        const { container } = render(<Hand {...mockProps} />);
        expect(container).toMatchSnapshot();
    });
});
