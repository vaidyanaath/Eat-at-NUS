import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-test-renderer';

import StallOwnerHome from '../../../../src/screens/main/foodStallOwner/StallOwnerHome';

describe('<StallOwnerHome />', () => {
    
    it('Renders correctly', () => {
        const mockNavigation = { navigate: () => {} };

        let tree;
        act(() => {
            tree = renderer.create(<StallOwnerHome navigation={mockNavigation} />).toJSON();
        });

        expect(tree).toMatchSnapshot();
        
    });
    
});