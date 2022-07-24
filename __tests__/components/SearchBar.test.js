import React from 'react';
import renderer from 'react-test-renderer';

import { SearchBar } from '../../src/components/SearchBar';

describe('<SearchBar />', () => {
    
    it('Renders correctly', () => {
        const tree = renderer.create(<SearchBar />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});