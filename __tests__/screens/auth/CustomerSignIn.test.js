import React from 'react';
import renderer from 'react-test-renderer';
// import { render, fireEvent } from '@testing-library/react-native';

import CustomerSignIn from '../../../src/screens/auth/CustomerSignIn';

describe('<CustomerSignIn />', () => {

    it('Renders correctly', () => {
        const mockNavigation = { navigate: () => {} };
        const tree = renderer.create(<CustomerSignIn navigation={mockNavigation} />);
        expect(tree).toMatchSnapshot();
    });

    // it('Sign In button calls handleSignIn function', () => {
    //    const { getByTestId } = render(<CustomerSignIn />);
    //    spyOn(CustomerSignIn.prototype, 'handleSignIn')
    //    fireEvent.press(getByTestId("SignInButton"));
    //    expect(handleSignIn).toBeCalled();
    // });
});
