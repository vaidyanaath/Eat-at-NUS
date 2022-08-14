import React from 'react';
import renderer from 'react-test-renderer';

import Dish from '../../../../src/screens/main/customer/Dish';

describe('<Dish />', () => {
    
    it('Renders correctly', () => {
        
        const mockRoute = {
            params: {
                dishId: "d1"
            }
        };

        const tree = renderer.create(<Dish route={mockRoute} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});