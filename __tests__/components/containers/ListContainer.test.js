import React from 'react';
import renderer from 'react-test-renderer';

import { ListContainer } from '../../../src/components/containers/ListContainer';

describe('<ListContainer />', () => {
    
    it('Renders correctly', () => {
        const mockItem = { name: "", id: "", rating: "" };
        const tree = renderer.create(<ListContainer item = {mockItem} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});