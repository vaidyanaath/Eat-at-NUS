import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-test-renderer';

import StallOwnerEditDish from '../../../../src/screens/main/foodStallOwner/StallOwnerEditDish';

describe('<StallOwnerEditDish />', () => {
    
    it('Renders correctly', () => {
        const mockNavigation = { navigate: () => {} };
        const mockRoute = {
            params:{
                dishID: '-N76rICVGyYnqh1ewsgQ'
            }
        }

        let tree;
        act(() => {
            tree = renderer.create(<StallOwnerEditDish navigation={mockNavigation} route={mockRoute} />).toJSON();
        });

        expect(tree).toMatchSnapshot();
        
    });
    
});