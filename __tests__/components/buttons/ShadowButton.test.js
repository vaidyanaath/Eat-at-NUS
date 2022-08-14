import React from 'react';
import renderer from 'react-test-renderer';

import { ShadowButton } from '../../../src/components/buttons/ShadowButton';

describe('<ShadowButton />', () => {
    
    it('Renders correctly', () => {
        const tree = renderer.create(<ShadowButton />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});