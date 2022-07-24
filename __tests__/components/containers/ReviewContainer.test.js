import React from 'react';
import renderer from 'react-test-renderer';

import { ReviewContainer } from '../../../src/components/containers/ReviewContainer';

describe('<ReviewContainer />', () => {
    
    it('Renders correctly', () => {
        const tree = renderer.create(<ReviewContainer />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});