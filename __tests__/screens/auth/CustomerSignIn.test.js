import React from 'react';
import renderer from 'react-test-renderer';

import CustomerSignIn from '../../../src/screens/auth/CustomerSignIn';

describe('<CustomerSignIn />', () => {
  it('Renders correctly', () => {
    const mockNavigation = { navigate: () => {} };
    const tree = renderer.create(<CustomerSignIn navigation={mockNavigation} />);
    expect(tree).toMatchSnapshot();
  });
});
