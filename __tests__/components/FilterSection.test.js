import React from 'react';
import renderer from 'react-test-renderer';

import { FilterSection } from '../../src/components/FilterSection';

describe('<FilterSection />', () => {
    
    it('Renders correctly', () => {
        const tree = renderer.create(<FilterSection />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});