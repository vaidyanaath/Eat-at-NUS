import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-test-renderer';

import Review from '../../../../src/screens/main/customer/Review';

describe('<Review />', () => {
    
    it('Renders correctly', () => {
        act(() => {
            const mockNavigation = { navigate: () => {} };
            const mockRoute = {
                params: {
                    dishID: '-N76rICVGyYnqh1ewsgQ',
                    dishRating: 5,
                    userType: 'customer'
                }
            };
    
            const tree = renderer.create(<Review navigation={mockNavigation} route={mockRoute} />).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
    
});