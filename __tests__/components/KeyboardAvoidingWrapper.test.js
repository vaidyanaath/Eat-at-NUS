import React from 'react';
import renderer from 'react-test-renderer';

import { KeyboardAvoidingWrapper } from '../../src/components/KeyboardAvoidingWrapper';

describe('<KeyboardAvoidingWrapper />', () => {
    
    it('Renders correctly', () => {
        const tree = renderer.create(<KeyboardAvoidingWrapper children="" />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    
});