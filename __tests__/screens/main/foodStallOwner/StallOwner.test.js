import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-test-renderer';

import StallOwner from '../../../../src/screens/main/foodStallOwner/StallOwner';

describe('<StallOwner />', () => {
    
    it('Renders correctly', () => {
        const mockNavigation = { navigate: () => {} };

        let tree;
        act(() => {
            tree = renderer.create(<StallOwner navigation={mockNavigation} />).toJSON();
        });

        expect(tree).toMatchSnapshot();
        
    });
    
});