import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-test-renderer';

import StallOwnerDish from '../../../../src/screens/main/foodStallOwner/StallOwnerDish';

describe('<StallOwnerDish />', () => {
    
    it('Renders correctly', () => {
        const mockNavigation = { navigate: () => {} };
        const mockRoute = {
            params:{
                dishID: '-N76rICVGyYnqh1ewsgQ'
            }
        }

        let tree;
        act(() => {
            tree = renderer.create(<StallOwnerDish navigation={mockNavigation} route={mockRoute} />).toJSON();
        });

        expect(tree).toMatchSnapshot();
        
    });
    
});