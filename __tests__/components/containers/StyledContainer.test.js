import React from 'react';
import renderer from 'react-test-renderer';

import { StyledContainer } from '../../../src/components/containers/StyledContainer';

describe('<StyledContainer />', () => {
    
    it('Renders correctly', () => {
        const tree = renderer.create(<StyledContainer />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});