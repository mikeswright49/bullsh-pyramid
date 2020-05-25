import { render } from '@testing-library/react';
import React from 'react';
import { Card } from './card';

describe('<Unit Test> Card', () => {
    it('should be able to render the component', () => {
        const { container } = render(<Card card={{ value: 1, suit: 2, hidden: false }} />);
        expect(container).toMatchSnapshot();
    });
    it('shold be able to change styles on visibility', () => {
        const { container } = render(<Card card={{ value: 1, suit: 2, hidden: true }} />);
        expect(container).toMatchSnapshot();
    });
});
