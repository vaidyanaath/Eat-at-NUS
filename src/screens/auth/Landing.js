import React from 'react';
import { StatusBar, StyleSheet, Text, Image } from 'react-native';

// import components
import { StyledContainer } from '../../components/containers/StyledContainer';
import { ColoredButton } from '../../components/buttons/ColoredButton';
import { BigText } from '../../components/texts/BigText';
import { RegularText } from '../../components/texts/RegularText';

// import colors
import { colors } from '../../assets/colors';

const Landing = () => {
    const handleIsCustomer = () => {}
    const handleIsFoodStallOwner = () => {}

    return (
      <StyledContainer style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.bg}  />
        <BigText style={styles.welcomeText}> Welcome to Eat@NUS </BigText>
        <Image source={require('../../assets/images/adaptive-icon.png')} style={styles.logo} />
        <BigText style={styles.subText}> I am a . . . </BigText>
        <ColoredButton onPress={handleIsCustomer} style={styles.button}>
            <RegularText style={styles.buttonText}> Customer </RegularText>
        </ColoredButton>
        <ColoredButton onPress={handleIsFoodStallOwner} style={styles.button}>
            <RegularText style={styles.buttonText}> Food Stall Owner </RegularText>
        </ColoredButton>
      </StyledContainer>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 50,
        fontFamily: 'SourceSansPro_700Bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 40,
    },
    subText: {
        fontSize: 33,
        marginBottom: 5,
    },
    button: {
        width: 280, 
        height: 70, 
        marginBottom: 10,
    },
    buttonText: {
        color: colors.white,
    },
  });
  
  export default Landing;
