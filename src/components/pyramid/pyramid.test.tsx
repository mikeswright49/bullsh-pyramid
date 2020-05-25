import { render } from '@testing-library/react';
import React from 'react';
import { Pyramid } from './pyramid';
jest.mock('../../utilities/shortid');

describe('<Unit Test> Pyramid', () => {
    it('should be able to render the component', () => {
        const { container } = render(<Pyramid tiers={[[1, 2, 3], [4, 5], [6]]} />);
        expect(container).toMatchSnapshot();
    });
});
