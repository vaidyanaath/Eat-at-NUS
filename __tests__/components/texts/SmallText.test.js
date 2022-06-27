import React from 'react';
import renderer from 'react-test-renderer';

import { SmallText } from '../../../src/components/texts/SmallText';

describe('<SmallText />', () => {
    
    it('Renders correctly', () => {
        const tree = renderer.create(<SmallText />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});