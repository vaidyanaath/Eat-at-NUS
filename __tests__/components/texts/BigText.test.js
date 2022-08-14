import React from 'react';
import renderer from 'react-test-renderer';

import { BigText } from '../../../src/components/texts/BigText';

describe('<BigText />', () => {
    
    it('Renders correctly', () => {
        const tree = renderer.create(<BigText />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});