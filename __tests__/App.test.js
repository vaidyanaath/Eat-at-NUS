import React from 'react';
import renderer from 'react-test-renderer';


import App from '../src/App';

// Snapshot Test - to check if UI stays consistent
describe('<App />', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });
       
});