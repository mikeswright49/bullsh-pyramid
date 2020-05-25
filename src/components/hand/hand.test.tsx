import { render } from '@testing-library/react';
import React from 'react';
import { Hand } from './hand';
jest.mock('../../utilities/shortid');

describe('<Unit Test> Hand', () => {
    it('should be able to render the component', () => {
        const { container } = render(<Hand cards={[1, 2, 3]} name="Frank" hidden={false} />);
        expect(container).toMatchSnapshot();
    });
});
