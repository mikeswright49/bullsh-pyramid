import HowToPlay from '../pages/about/how-to-play';
import { render } from '@testing-library/react';
import React from 'react';

describe('<Unit Test> - How to play', () => {
    it('should be able to render the component', () => {
        expect(render(<HowToPlay />).container).toMatchSnapshot();
    });
});
