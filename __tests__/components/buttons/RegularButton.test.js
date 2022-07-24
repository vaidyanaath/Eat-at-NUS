import React from 'react';
import renderer from 'react-test-renderer';

import { RegularButton } from '../../../src/components/buttons/RegularButton';

describe('<RegularButton />', () => {
    
    it('Renders correctly', () => {
        const tree = renderer.create(<RegularButton />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});