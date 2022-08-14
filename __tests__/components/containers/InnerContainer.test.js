import React from 'react';
import renderer from 'react-test-renderer';

import { InnerContainer } from '../../../src/components/containers/InnerContainer';

describe('<InnerContainer />', () => {
    
    it('Renders correctly', () => {
        const tree = renderer.create(<InnerContainer />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});