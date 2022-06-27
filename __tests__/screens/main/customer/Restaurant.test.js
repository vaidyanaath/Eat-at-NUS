import React from 'react';
import renderer from 'react-test-renderer';

import Restaurant from '../../../../src/screens/main/customer/Restaurant';

describe('<Restaurant />', () => {
    
    it('Renders correctly', () => {
        const mockNavigation = { navigate: () => {} };
        const tree = renderer.create(<Restaurant navigation={mockNavigation}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});