import React from 'react';
import renderer from 'react-test-renderer';

import FoodStallOwnerSignIn from '../../../src/screens/auth/FoodStallOwnerSignIn';

describe('<FoodStallOwnerSignIn />', () => {
    
    it('Renders correctly', () => {
        const tree = renderer.create(<FoodStallOwnerSignIn />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});