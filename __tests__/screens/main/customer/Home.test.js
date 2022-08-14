import React from 'react';
import renderer from 'react-test-renderer';

import Home from '../../../../src/screens/main/customer/Home';

describe('<Home />', () => {
    
    it('Renders correctly', () => {
        const mockNavigation = { navigate: () => {} };
        const tree = renderer.create(<Home navigation={mockNavigation} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});