import React from 'react';
import { StyleSheet } from 'react-native';
import { RegularButton } from '../../components/buttons/RegularButton';
import { InnerContainer } from '../../components/containers/InnerContainer';
import { BigText } from '../../components/texts/BigText';
import { RegularText } from '../../components/texts/RegularText';
import { SmallText } from '../../components/texts/SmallText';

import { MaterialIcons, Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../assets/colors';

const Profile = () => {
  return (
    <InnerContainer style={styles.container}>
      <InnerContainer style={styles.infoContainer}>
        <BigText style={styles.name}>FIRST NAME</BigText>
        <BigText style={styles.name}>LAST NAME</BigText>
      </InnerContainer>

      <InnerContainer style={styles.emailContainer}>
        <MaterialIcons name="email" size={24} color={colors.primary} />
        <SmallText style={styles.email}>email@email.com</SmallText>
      </InnerContainer>

      <InnerContainer style={styles.buttonsContainer}>
        <RegularButton style={styles.button}>
          <MaterialCommunityIcons name="account-edit-outline" size={20} color="white" />
          <RegularText style={styles.buttonText}>Change Password</RegularText>
        </RegularButton>
        <RegularButton style={styles.button}>
          <Feather name="trash-2" size={20} color="white" />
          <RegularText style={styles.buttonText}>Delete Account</RegularText>
        </RegularButton>
        <RegularButton style={styles.button}>
          <Ionicons name="ios-power-sharp" size={20} color="white" />
          <RegularText style={styles.buttonText}>Sign Out</RegularText>
        </RegularButton>
      </InnerContainer>
    </InnerContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  infoContainer: {
    flex: 1,
    maxHeight: '20%',
    maxWidth: '95%',
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    // backgroundColor: '#fc4',
  },
  emailContainer: {
    flex: 1,
    paddingHorizontal: 20,
    maxHeight: '10%',
    maxWidth: '95%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: '#ffc',
  },
  buttonsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'flex-start',
  },
  name: {
    fontSize: 30,
  },
  email: {
    marginLeft: 10,
  },
  button: {
    flexDirection: 'row',
    paddingLeft: 30,
    justifyContent: 'flex-start',
    minWidth: '95%',
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: colors.pale,
    marginLeft: 20,
  },
});

export default Profile;
