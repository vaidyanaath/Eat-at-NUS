import React from 'react';
import renderer from 'react-test-renderer';

import { RegularText } from '../../../src/components/texts/RegularText';

describe('<RegularText />', () => {
    
    it('Renders correctly', () => {
        const tree = renderer.create(<RegularText />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});