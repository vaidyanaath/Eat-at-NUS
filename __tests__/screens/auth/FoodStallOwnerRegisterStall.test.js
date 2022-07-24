import React from 'react';
import renderer from 'react-test-renderer';

import FoodStallOwnerRegisterStall from '../../../src/screens/auth/FoodStallOwnerRegisterStall';

describe('<FoodStallOwnerRegisterStall />', () => {
    
    it('Renders correctly', () => {
        const dummyRoute = {
            params: {
                name: 'aaa',
                email: 'aaa.gmail.com',
                password: 'aaa'
            }
        };

        const tree = renderer.create(<FoodStallOwnerRegisterStall route={dummyRoute} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});