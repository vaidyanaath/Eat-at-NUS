import React, { useState } from 'react';
import { StatusBar, StyleSheet, TextInput } from 'react-native';

// import components
import { StyledContainer } from '../../components/containers/StyledContainer';
import { InnerContainer } from '../../components/containers/InnerContainer';
import { ColoredButton } from '../../components/buttons/ColoredButton';
import { RegularButton } from '../../components/buttons/RegularButton';
import { KeyboardAvoidingWrapper } from '../../components/KeyboardAvoidingWrapper';

// import texts
import { RegularText } from '../../components/texts/RegularText';
import { SmallText } from '../../components/texts/SmallText';

// import colors
import { colors } from '../../assets/colors';

// import auth
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

// show toast notifs
import Toast from 'react-native-root-toast';

const CustomerSignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toastOptions = {
    duration: Toast.durations.LONG,
    position: -160,
    shadow: true,
    shadowColor: colors.pale,
    animation: true,
    hideOnPress: true,
    delay: 0,
    opacity: 1,
    backgroundColor: colors.primary, //'#FFDC7C', // FFDC7C // FFF7D6
    textColor: colors.white, //'red',
  };

  const handleSignIn = () => {
    if (email === '' || password === '') {
      Toast.show('Please enter your email and password', toastOptions);
      return;
    }
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      let errorMessage = error.message.replace('Firebase: ', '').replace('.', '');
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      }
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Your email or password is incorrect';
      }
      Toast.show(errorMessage, toastOptions);
    });
  };

  const handleForgotPassword = () => {
    if (email === '') {
      Toast.show('Please enter your email', toastOptions);
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        const message = 'Password reset email sent';
        Toast.show(message, toastOptions);
      })
      .catch((error) => {
        let errorMessage = error.message.replace('Firebase: ', '').replace('.', '');
        if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address';
        }
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'Your email is not registered';
        }
        Toast.show(errorMessage, toastOptions);
      });
  };

  const handleSignUpPageLink = () => {
    navigation.navigate('CustomerSignUp');
  };

  return (
    <StyledContainer style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
      <InnerContainer style={styles.topSection}>
        <KeyboardAvoidingWrapper>
          <TextInput
            style={styles.input}
            onChangeText={(email) => setEmail(email)}
            value={email}
            placeholder="Email"
            autoCorrect={false}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            onChangeText={(password) => setPassword(password)}
            value={password}
            placeholder="Password"
            autoCorrect={false}
            secureTextEntry={true}
          />
          <ColoredButton style={styles.signInButton} onPress={handleSignIn}>
            <RegularText style={styles.signInText}>Sign In</RegularText>
          </ColoredButton>
          <RegularButton style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
            <SmallText style={styles.forgotPasswordText}>Forgot Password?</SmallText>
          </RegularButton>
        </KeyboardAvoidingWrapper>
      </InnerContainer>
      <InnerContainer style={styles.bottomSection}>
        <SmallText style={styles.noAccountText}> Don't have an account? </SmallText>
        <RegularButton style={styles.signUpPageButton} onPress={handleSignUpPageLink}>
          <SmallText style={styles.signUpPageText}> Sign Up </SmallText>
        </RegularButton>
      </InnerContainer>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: 0,
    // backgroundColor: '#f5cccc'
  },
  topSection: {
    minHeight: '90%',
    //   backgroundColor: "#2311ab"
  },

  input: {
    height: 45,
    width: 280,
    marginVertical: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.bg,
  },

  signInButton: {
    height: 48,
    width: 280,
    backgroundColor: colors.secondary,
  },

  signInText: {
    fontSize: 17,
    color: colors.white,
  },

  forgotPasswordButton: {
    marginTop: 0,
    backgroundColor: colors.bg,
  },

  forgotPasswordText: {
    color: colors.primary,
    fontSize: 17,
  },

  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 80,
  },

  noAccountText: {
    color: colors.secondary,
    textAlign: 'right',
  },

  signUpPageButton: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
  },

  signUpPageText: {
    color: colors.primary,
  },
});

export default CustomerSignIn;
