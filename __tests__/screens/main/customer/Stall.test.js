import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-test-renderer';

import Stall from '../../../../src/screens/main/customer/Stall';

describe('<Stall />', () => {
    
    it('Renders correctly', () => {
        act(() => {
            const mockNavigation = { navigate: () => {} };
            const mockRoute = {
                params: {
                    stall: {
                        id: 'S1'
                    }
                }
            };
    
            const tree = renderer.create(<Stall navigation={mockNavigation} route={mockRoute} />).toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
    
});