import React, { useState } from 'react';
import { ScrollView, Dimensions, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { InnerContainer } from '../../components/containers/InnerContainer';
import { StyledContainer } from '../../components/containers/StyledContainer';
import { SmallText } from '../../components/texts/SmallText';
import { RegularText } from '../../components/texts/RegularText';

import { colors } from '../../assets/colors';

// import auth
import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import SelectDropdown from 'react-native-select-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RegularButton } from '../../components/buttons/RegularButton';
import { KeyboardAvoidingWrapper } from '../../components/KeyboardAvoidingWrapper';

import addUser from '../../firebase/accountHandling/AddUser';
import addStall from '../../firebase/AddNewStall';

// show toast notifs
import Toast from 'react-native-root-toast';

const FoodStallOwnerRegisterStall = ({ route }) => {
  const name = route.params.name;
  const email = route.params.email;
  const password = route.params.password;

  // Fetch stall data
  const [stallName, setStallName] = useState('');
  const [stallAddress, setStallAddress] = useState('');
  const [stallCuisine, setStallCuisine] = useState('');
  const [stallOpeningTime, setStallOpeningTime] = useState('');
  const [stallClosingTime, setStallClosingTime] = useState('');
  const CUISINES = [
    'Chinese',
    'Indian',
    'Japanese',
    'Korean',
    'Malay',
    'Taiwanese',
    'Thai',
    'Western',
  ];

  const [isOpeningClockVisible, setOpeningClockVisibility] = useState(false);
  const [isClosingClockVisible, setClosingClockVisibility] = useState(false);

  const showOpeningClock = () => {
    setOpeningClockVisibility(true);
  };

  const showClosingClock = () => {
    setClosingClockVisibility(true);
  };

  const hideOpeningClock = () => {
    setOpeningClockVisibility(false);
  };

  const hideClosingClock = () => {
    setClosingClockVisibility(false);
  };

  const handleOpeningConfirm = (time) => {
    const convertedTime = time.getHours() + ':' + String(time.getMinutes()).padStart(2, '0');
    setStallOpeningTime(convertedTime);
    hideOpeningClock();
    hideDatePicker();
  };

  const handleClosingConfirm = (time) => {
    const convertedTime = time.getHours() + ':' + String(time.getMinutes()).padStart(2, '0');
    setStallClosingTime(convertedTime);
    hideClosingClock();
    hideDatePicker();
  };

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

  const handleSave = () => {
    if (
      !stallName.replace(/\s/g, '').length ||
      stallAddress == '' ||
      stallCuisine == '' ||
      stallOpeningTime == '' ||
      stallClosingTime == ''
    ) {
      Toast.show('Please fill in all the fields', toastOptions);
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
            addStall(
              user.uid,
              stallName,
              stallAddress,
              stallOpeningTime,
              stallClosingTime,
              stallCuisine
            );
          })
          .catch((error) => {
            console.log(error);
          });
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
    <StyledContainer style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingWrapper style={styles.keyboardWrapper}>
          <InnerContainer style={[styles.descriptionContainer, { maxHeight: '15%' }]}>
            <RegularText style={styles.headingText}>Stall Name:</RegularText>
            <TextInput
              style={[styles.descriptionInput, { maxHeight: '50%' }]}
              onChangeText={(stallName) => setStallName(stallName)}
              value={stallName}
              placeholder="Stall Name"
              autoCorrect={false}
            />
          </InnerContainer>

          <InnerContainer style={styles.descriptionContainer}>
            <RegularText style={styles.headingText}>Address:</RegularText>
            <TextInput
              style={styles.descriptionInput}
              onChangeText={(stallAddress) => setStallAddress(stallAddress)}
              value={stallAddress}
              placeholder="Stall Address"
              autoCorrect={false}
              multiline={true}
            />
          </InnerContainer>

          <InnerContainer style={styles.fieldContainer}>
            <RegularText style={styles.headingText}>Cuisine Type:</RegularText>
            <SelectDropdown
              data={CUISINES}
              defaultValue={stallCuisine}
              defaultButtonText={'Click to select'}
              onSelect={(selectedItem) => {
                setStallCuisine(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem) => {
                // text represented after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item) => {
                // text represented for each item in dropdown
                return item;
              }}
              buttonStyle={styles.input}
              buttonTextStyle={{
                fontSize: 17,
                color: colors.secondary,
                fontFamily: 'SourceSansPro-Regular',
              }}
              dropdownOverlayColor="rgba(255, 255, 255, 0)"
              dropdownStyle={{ backgroundColor: colors.gray }}
            />
          </InnerContainer>

          <InnerContainer style={styles.fieldContainer}>
            <RegularText style={styles.headingText}>Opening Time:</RegularText>
            <RegularButton onPress={showOpeningClock} style={styles.clockButton}>
              <RegularText style={{ fontSize: 17 }}>
                {stallOpeningTime ? stallOpeningTime : 'Open clock'}
              </RegularText>
            </RegularButton>
            <DateTimePickerModal
              isVisible={isOpeningClockVisible}
              mode="time"
              onConfirm={handleOpeningConfirm}
              onCancel={hideOpeningClock}
            />
          </InnerContainer>

          <InnerContainer style={styles.fieldContainer}>
            <RegularText style={styles.headingText}>Closing Time:</RegularText>
            <RegularButton onPress={showClosingClock} style={styles.clockButton}>
              <RegularText style={{ fontSize: 17 }}>
                {stallClosingTime ? stallClosingTime : 'Open clock'}
              </RegularText>
            </RegularButton>
            <DateTimePickerModal
              isVisible={isClosingClockVisible}
              mode="time"
              onConfirm={handleClosingConfirm}
              onCancel={hideClosingClock}
            />
          </InnerContainer>

          <InnerContainer style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <RegularText style={styles.buttonText}>Save</RegularText>
            </TouchableOpacity>
          </InnerContainer>
        </KeyboardAvoidingWrapper>
      </ScrollView>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 0,
    paddingLeft: 25,
    paddingRight: 25,
    // backgroundColor: '#fedcba',
  },
  keyboardWrapper: {
    flex: 1,
    minHeight: Dimensions.get('window').height - 80,
  },
  fieldContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#ff2324',
    maxHeight: '8%',
    marginVertical: 10,
  },
  headingText: {
    color: '#123456',
  },
  input: {
    flex: 1,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    height: '100%',
    maxWidth: '50%',
    backgroundColor: colors.bg,
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 17,
  },
  dropdownButton: {
    flex: 1,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    maxWidth: '50%',
    backgroundColor: colors.bg,
    alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  clockButton: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
    marginRight: 0,
    paddingBottom: 3,
    paddingTop: 3,
    height: '100%',
    maxWidth: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#accbaf'
  },
  descriptionInput: {
    flex: 1,
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 5,
    minWidth: '100%',
    marginVertical: 10,
    // backgroundColor: '#adda12',
  },
  imageUploadContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    maxWidth: '55%',
    padding: 10,
    marginVertical: 5,
    // backgroundColor: '#DBDBDB',
  },
  ImageBackground: {
    flex: 1,
    maxHeight: '25%',
    // backgroundColor: '#fcc',
    resizeMode: 'contain',
    marginVertical: 10,
  },
  imageText: {
    color: '#123456',
  },
  uploadButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'space-between',
    maxHeight: 40,
    padding: 5,
  },
  descriptionContainer: {
    flex: 1,
    alignItems: 'flex-start',
    maxHeight: '25%',
    marginVertical: 5,
    // backgroundColor: '#ff9',
  },
  buttonContainer: {
    flex: 1,
    maxHeight: '7%',
    alignItems: 'flex-end',
    // backgroundColor: '#123456',
  },
  button: {
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: colors.bg,
  },
});

export default FoodStallOwnerRegisterStall;
