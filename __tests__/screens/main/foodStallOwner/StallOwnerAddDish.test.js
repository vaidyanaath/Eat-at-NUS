import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-test-renderer';

import StallOwnerAddDish from '../../../../src/screens/main/foodStallOwner/StallOwnerAddDish';

describe('<StallOwnerAddDish />', () => {
    
    it('Renders correctly', () => {
        const mockNavigation = { navigate: () => {} };

        let tree;
        act(() => {
            tree = renderer.create(<StallOwnerAddDish navigation={mockNavigation} route={{}} />).toJSON();
        });

        expect(tree).toMatchSnapshot();
        
    });
    
});