import React, { useState } from 'react';
import { StatusBar, StyleSheet, TextInput } from 'react-native';

// import components
import { StyledContainer } from '../../components/containers/StyledContainer';
import { InnerContainer } from '../../components/containers/InnerContainer';
import { ColoredButton } from '../../components/buttons/ColoredButton';

import { KeyboardAvoidingWrapper } from '../../components/KeyboardAvoidingWrapper';

// import texts
import { RegularText } from '../../components/texts/RegularText';

// import colors
import { colors } from '../../assets/colors';

// import auth
import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const CustomerSignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            // Update successful
          })
          .catch((error) => {
            // An error happened
            console.log(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errMessage = error.message;
        console.log(errorCode);
        alert(errMessage);
      });
  };

  return (
    <StyledContainer>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
      <InnerContainer style={styles.topSection}>
        <KeyboardAvoidingWrapper>
          <TextInput
            style={styles.input}
            onChangeText={(name) => setName(name)}
            value={name}
            placeholder="Full Name"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            onChangeText={(email) => setEmail(email)}
            value={email}
            placeholder="Email"
            autoCorrect={false}
          />
          <TextInput
            style={styles.input}
            onChangeText={(password) => setPassword(password)}
            value={password}
            placeholder="Password"
            autoCorrect={false}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
            value={confirmPassword}
            placeholder="Confirm Password"
            autoCorrect={false}
            secureTextEntry={true}
          />
          <ColoredButton style={styles.signUpButton} onPress={handleSignUp}>
            <RegularText style={styles.signUpText}>Sign Up</RegularText>
          </ColoredButton>
        </KeyboardAvoidingWrapper>
      </InnerContainer>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  topSection: {
    minHeight: '80%',
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

  signUpButton: {
    height: 48,
    width: 280,
    backgroundColor: colors.secondary,
  },

  signUpText: {
    fontSize: 17,
    color: colors.white,
  },
});

export default CustomerSignUp;
