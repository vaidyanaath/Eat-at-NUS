import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-test-renderer';

import StallOwnerEditStall from '../../../../src/screens/main/foodStallOwner/StallOwnerEditStall';

describe('<StallOwnerEditStall />', () => {
    
    it('Renders correctly', () => {
        const mockNavigation = { navigate: () => {} };

        let tree;
        act(() => {
            tree = renderer.create(<StallOwnerEditStall navigation={mockNavigation} />).toJSON();
        });

        expect(tree).toMatchSnapshot();
        
    });
    
});