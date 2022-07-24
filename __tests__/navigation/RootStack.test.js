import React from 'react';
import renderer from 'react-test-renderer';

import RootStack from '../../src/navigation/RootStack';

describe('<RootStack />', () => {
    
    it('Renders correctly', () => {
        const tree = renderer.create(<RootStack />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});