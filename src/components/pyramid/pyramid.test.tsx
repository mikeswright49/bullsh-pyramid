import { render } from '@testing-library/react';
import React from 'react';
import { Pyramid } from './pyramid';
jest.mock('../../utilities/shortid');

describe('<Unit Test> Pyramid', () => {
    it('should be able to render the component', () => {
        const { container } = render(
            <Pyramid
                tiers={[
                    [
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
                    [
                        {
                            value: 4,
                            hidden: false,
                            suit: 0,
                        },
                        {
                            value: 5,
                            hidden: false,
                            suit: 0,
                        },
                    ],
                    [
                        {
                            value: 6,
                            hidden: false,
                            suit: 0,
                        },
                    ],
                ]}
            />
        );
        expect(container).toMatchSnapshot();
    });
});
