import React from 'react';
import renderer from 'react-test-renderer';

import App from '../src/App';

// Unit Test - expected state of <App /> to have one child element
// describe('<App />', () => {
//     it('has 1 child', () => {
//         const tree = renderer.create(<App />).toJSON();
//         expect(tree.children.length).toBe(1);
//     });
// });

// Snapshot Test - to check if UI stays consistent
describe('<App />', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });
       
});