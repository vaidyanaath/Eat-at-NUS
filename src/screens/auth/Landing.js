import React from 'react';
import { StatusBar, StyleSheet, Image, View } from 'react-native';

// import components
import { InnerContainer } from '../../components/containers/InnerContainer';
import { ColoredButton } from '../../components/buttons/ColoredButton';
import { BigText } from '../../components/texts/BigText';
import { RegularText } from '../../components/texts/RegularText';

// import colors
import { colors } from '../../assets/colors';


const Landing = ({ navigation }) => {
    const handleIsCustomer = () => {navigation.navigate('CustomerSignIn')}
    const handleIsFoodStallOwner = () => {}

    return (
      <InnerContainer style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.secondary}  />
        
        <Image source={require('../../assets/images/logo_big.png')} style={styles.logo} />
        <BigText style={styles.welcomeText}> Eat@NUS </BigText>
        
        <RegularText style={styles.subText}> I am a . . . </RegularText>
        <ColoredButton onPress={handleIsCustomer} style={styles.button}>
            <BigText style={styles.buttonText}> Customer </BigText>
        </ColoredButton>
        <ColoredButton onPress={handleIsFoodStallOwner} style={styles.button}>
            <BigText style={styles.buttonText}> Food Stall Owner </BigText>
        </ColoredButton>
        
        
      </InnerContainer>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.secondary,
    },
    welcomeText: {
        fontSize: 35,
        fontFamily: 'SourceSansPro-Bold',
        marginTop: 10,
        marginBottom: 60,
        textAlign: 'center',
        color: colors.white,
        justifyContent: 'flex-end',
    },
    logo: {
        width: 150,
        height: 150,
        // backgroundColor: '#324',
    },
    subText: {
        fontSize: 30,
        marginBottom: 10,
        color: colors.white,
    },
    button: {
        width: 280, 
        height: 70, 
        marginBottom: 10,
        backgroundColor: colors.primary
    },
    buttonText: {
        color: colors.gray,
        fontSize: 25,
    },
  });
  
  export default Landing;
