import React from 'react';
import renderer from 'react-test-renderer';

import FoodStallOwnerSignUp from '../../../src/screens/auth/FoodStallOwnerSignUp';

describe('<FoodStallOwnerSignUp />', () => {
    
    it('Renders correctly', () => {
        const tree = renderer.create(<FoodStallOwnerSignUp />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});