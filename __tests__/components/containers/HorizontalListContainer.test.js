import React from 'react';
import renderer from 'react-test-renderer';

import { HorizontalListContainer } from '../../../src/components/containers/HorizontalListContainer';

describe('<HorizontalListContainer />', () => {
    
    it('Renders correctly', () => {
        const mockItem = { name: "", id: "", rating: "" };
        const tree = renderer.create(<HorizontalListContainer item={mockItem} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});