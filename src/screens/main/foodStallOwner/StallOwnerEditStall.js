import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { InnerContainer } from '../../../components/containers/InnerContainer';
import { StyledContainer } from '../../../components/containers/StyledContainer';
import { SmallText } from '../../../components/texts/SmallText';
import { RegularText } from '../../../components/texts/RegularText';

import { MaterialIcons } from '@expo/vector-icons';

import { colors } from '../../../assets/colors';

import { auth, db, storage } from '../../../firebase/config';
// Import Database
import { ref, onValue } from 'firebase/database';
import { ref as storageRef } from 'firebase/storage';

import SelectDropdown from 'react-native-select-dropdown';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RegularButton } from '../../../components/buttons/RegularButton';
import { KeyboardAvoidingWrapper } from '../../../components/KeyboardAvoidingWrapper';

import editStallInfo from '../../../firebase/EditStallInfo';
import LoadingScreen from '../../../components/screens/LoadingScreen';

const StallOwnerEditStall = ({ navigation }) => {
  const stallID = auth.currentUser.uid;

  // Fetch stall data
  const [loaded, setLoaded] = useState(false);
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

  useEffect(() => {
    const reference = ref(db, 'stalls/' + stallID);
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setLoaded(true);
        setStallName(data.name);
        setStallAddress(data.address);
        setStallCuisine(data.cuisine);
        setStallOpeningTime(data.openingTime);
        setStallClosingTime(data.closingTime);
      }
    });

    return () => {
      setStallName('');
      setStallAddress('');
      setStallCuisine('');
      setStallOpeningTime('');
      setStallClosingTime('');
      setLoaded(false);
    };
  }, [db]);

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

  const handleSave = () => {
    editStallInfo(
      stallID,
      stallName,
      stallAddress,
      stallOpeningTime,
      stallClosingTime,
      stallCuisine
    );
    navigation.navigate('StallOwnerHome');
  };

  if (!loaded) {
    return <LoadingScreen />;
  }

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
    borderColor: 'green',
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 1,
    // backgroundColor: "green",
  },
  buttonText: {
    color: 'green',
  },
});

export default StallOwnerEditStall;
