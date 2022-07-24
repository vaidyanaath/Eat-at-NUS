import React from 'react';
import renderer from 'react-test-renderer';

import LoadingScreen from '../../../src/components/screens/LoadingScreen';

describe('<LoadingScreen />', () => {
    
    it('Renders correctly', () => {
        const tree = renderer.create(<LoadingScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});