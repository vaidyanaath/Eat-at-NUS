import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput } from 'react-native';

// import components
import { StyledContainer } from '../../components/containers/StyledContainer';
import { InnerContainer } from '../../components/containers/InnerContainer';
import { ColoredButton } from '../../components/buttons/ColoredButton';

import { KeyboardAvoidingWrapper } from '../../components/KeyboardAvoidingWrapper';

// import texts
import { BigText } from '../../components/texts/BigText';
import { RegularText } from '../../components/texts/RegularText';
import { SmallText } from '../../components/texts/SmallText'; 

// import colors
import { colors } from '../../assets/colors';
import { RegularButton } from '../../components/buttons/RegularButton';

const CustomerSignIn = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {}
    const handleForgotPassword = () => {}
    const handleSignUpPageLink = () => {}

    return (
       
        <StyledContainer>
            <StatusBar barStyle="dark-content" backgroundColor={colors.bg}  />
            <InnerContainer style={styles.topSection}>
                <KeyboardAvoidingWrapper>
                    <TextInput
                        style={styles.input}
                        onChangeText={email => setEmail(email)}
                        value={email}
                        placeholder="Email"
                        autoCorrect={false}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={password => setPassword(password)}
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
    },

    noAccountText: {
        color: colors.secondary,
        textAlign: 'right',
    },

    signUpPageButton: {
      alignSelf: 'center',
      minHeight: '80%',
    },

    signUpPageText: {
      color: colors.primary,
    },
  });

  export default CustomerSignIn;
