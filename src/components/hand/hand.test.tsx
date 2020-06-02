import { render } from '@testing-library/react';
import React from 'react';
import { Hand } from './hand';
jest.mock('../../utilities/shortid');

describe('<Unit Test> Hand', () => {
    it('should be able to render the component', () => {
        const { container } = render(
            <Hand
                cards={[
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
                ]}
                name="Frank"
            />
        );
        expect(container).toMatchSnapshot();
    });
});
