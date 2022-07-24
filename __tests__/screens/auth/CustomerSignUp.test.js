import React from 'react';
import renderer from 'react-test-renderer';

import CustomerSignUp from '../../../src/screens/auth/CustomerSignUp';

describe('<CustomerSignUp />', () => {
    
    it('Renders correctly', () => {
        const tree = renderer.create(<CustomerSignUp />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});