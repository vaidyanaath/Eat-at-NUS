import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-test-renderer';

import WriteReview from '../../../../src/screens/main/customer/WriteReview';

describe('<WriteReview />', () => {
    
    it('Renders correctly', () => {
        act(() => {
            const mockNavigation = { navigate: () => {} };
            const mockRoute = {
                params: {
                    dishID: '-N76rICVGyYnqh1ewsgQ',
                }
            };
    
            const tree = renderer.create(<WriteReview navigation={mockNavigation} route={mockRoute} />).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
    
});