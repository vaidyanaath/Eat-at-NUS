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

// import db writing functions
import addUser from '../../firebase/AddUser';
import addStall from '../../firebase/AddNewStall';

// show toast notifs
import Toast from 'react-native-root-toast';

const FoodStallOwnerSignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toastOptions = {
    duration: 5000,
    position: -120,
    shadow: true,
    shadowColor: colors.pale,
    animation: true,
    hideOnPress: true,
    delay: 0,
    opacity: 1,
    backgroundColor: colors.primary, //'#FFDC7C', // FFDC7C // FFF7D6
    textColor: colors.white, //'red',
  };

  const handleSignUp = () => {
    if (!name.replace(/\s/g, '').length || email == '' || password == '' || confirmPassword == '') {
      // regex to check if name is empty
      Toast.show('Please fill in all the fields', toastOptions);
      return;
    }
    if (password !== confirmPassword) {
      Toast.show("Passwords don't match", toastOptions);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // Update profile
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            // Add user to db
            addUser(user, 'foodStallOwner');
            // Add stall to db
            // addStall(user.uid, '', '', '', '', '');
          })
          .catch((error) => {
            console.log(error);
          });

        // Add user to db
        // addUser(user, 'foodStallOwner');

        // set(ref(db, 'users/' + user.uid), {
        //   name: name,
        //   email: email,
        //   type: 'foodStallOwner',
        // });

        // Make a stall
        // addStall(user.uid, '', '', '', '', '');

        // set(ref(db, 'stalls/' + user.uid), {
        //   address: '',
        //   cuisine: '',
        //   openingTime: '',
        //   closingTime: '',
        //   imageURL: '',
        //   name: '',
        //   rating: 0,
        // });

        // set(ref(db, 'stallsMetadata/' + user.uid), {
        //   cuisine: '',
        //   imageURL: '',
        //   name: '',
        //   rating: '',
        // });
      })
      .catch((error) => {
        let errorMessage = error.message.replace('Firebase: ', '').replace('.', '');

        if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address';
        }
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Email already in use';
        }
        if (error.code === 'auth/weak-password') {
          errorMessage = 'Password should be at least 6 characters';
        }

        Toast.show(errorMessage, toastOptions);
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

export default FoodStallOwnerSignUp;
