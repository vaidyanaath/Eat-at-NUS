import React from 'react';
import renderer from 'react-test-renderer';

import Landing from '../../../src/screens/auth/Landing';

describe('<Landing />', () => {
    
    it('Renders correctly', () => {
        const mockNavigation = { navigate: () => {} };
        const tree = renderer.create(<Landing navigation={mockNavigation}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});