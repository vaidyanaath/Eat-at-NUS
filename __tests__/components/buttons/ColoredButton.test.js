import React from 'react';
import renderer from 'react-test-renderer';

import { ColoredButton } from '../../../src/components/buttons/ColoredButton';

describe('<ColoredButton />', () => {
    
    it('Renders correctly', () => {
        const tree = renderer.create(<ColoredButton />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});