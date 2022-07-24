import React from 'react';
import renderer from 'react-test-renderer';

import { ProfileButton } from '../../../src/components/buttons/ProfileButton';

describe('<ProfileButton />', () => {
    
    it('Renders correctly', () => {
        const tree = renderer.create(<ProfileButton />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});