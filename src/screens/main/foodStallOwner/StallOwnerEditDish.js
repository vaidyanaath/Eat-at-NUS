import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { InnerContainer } from '../../../components/containers/InnerContainer';
import { StyledContainer } from '../../../components/containers/StyledContainer';
import { SmallText } from '../../../components/texts/SmallText';
import { RegularText } from '../../../components/texts/RegularText';

import { MaterialIcons } from '@expo/vector-icons';

import { auth, db, storage } from '../../../firebase/config';
import { ref as storageRef } from 'firebase/storage';

// Import Database
import { ref, onValue } from 'firebase/database';

import editDishInfo from '../../../firebase/EditDishInfo';
import uploadDishImage from '../../../firebase/UploadDishImage';

import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../../assets/colors';

const StallOwnerEditDish = ({ navigation, route }) => {
  const dishID = route.params.dishID;
  const user = auth.currentUser;

  // Fetch dish data
  const [dishName, setDishName] = useState('');
  const [dishPrice, setDishPrice] = useState('');
  const [dishImageURL, setDishImageURL] = useState(null);
  const [dishDescription, setDishDescription] = useState('');
  const [dishCalories, setDishCalories] = useState('');
  const [dishAllergens, setDishAllergens] = useState('');

  useEffect(() => {
    const reference = ref(db, 'dishes/' + dishID);
    onValue(reference, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setDishName(data.name);
        setDishPrice(data.price);
        setDishImageURL(data.imageURL);
        setDishDescription(data.description);
        setDishCalories(data.calories);
        setDishAllergens(data.allergenInfo);
      } else {
        setDishData(null);
        console.log('No data found!');
      }
    });

    return () => {
      setDishName('');
      setDishPrice('');
      setDishImageURL(null);
      setDishDescription('');
      setDishCalories('');
      setDishAllergens('');
    };
  }, [db]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [10, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setDishImageURL(result.uri);
    }
  };

  const deleteImage = () => {
    setDishImageURL(null);
  };

  const handleSave = () => {
    editDishInfo(
      user.uid,
      dishID,
      dishName,
      dishPrice,
      dishDescription,
      dishCalories,
      dishAllergens,
      dishImageURL
    );
    // uploadDishImage(user.uid, dishID, dishImageURL);
    navigation.navigate('StallOwnerHome');
    //navigation.navigate('StallOwnerDish', { dishID: dishID });
  };

  return (
    <StyledContainer style={styles.mainContainer}>
      <InnerContainer style={styles.fieldContainer}>
        <RegularText style={styles.headingText}>Dish Name:</RegularText>
        <TextInput
          style={styles.input}
          onChangeText={(dishName) => setDishName(dishName)}
          value={dishName}
          placeholder="Dish Name"
          autoCorrect={false}
        />
      </InnerContainer>

      <InnerContainer style={styles.fieldContainer}>
        <RegularText style={styles.headingText}>Price:</RegularText>
        <TextInput
          style={styles.input}
          onChangeText={(dishPrice) => setDishPrice(dishPrice)}
          value={dishPrice}
          placeholder="$"
          autoCorrect={false}
        />
      </InnerContainer>

      <InnerContainer style={styles.fieldContainer}>
        <RegularText style={styles.headingText}>Calories:</RegularText>
        <TextInput
          style={styles.input}
          onChangeText={(dishCalories) => setDishCalories(dishCalories)}
          value={dishCalories}
          placeholder="kcal"
          autoCorrect={false}
        />
      </InnerContainer>

      <ImageBackground
        style={styles.ImageBackground}
        resizeMode={'contain'}
        source={
          dishImageURL ? { uri: dishImageURL } : require('../../../assets/images/bgbannerlight.png')
        }
      >
        {dishImageURL ? (
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              paddingHorizontal: 20,
              paddingVertical: 10,
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <MaterialIcons name="add-photo-alternate" size={24} color={colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadButton} onPress={deleteImage}>
              <MaterialIcons name="delete" size={24} color={colors.secondary} />
            </TouchableOpacity>
          </View>
        ) : (
          <InnerContainer style={styles.imageUploadContainer}>
            <SmallText style={styles.imageText}>
              There is no dish photo. Items sell better when they have a well-taken photo.
            </SmallText>
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <MaterialIcons name="add-photo-alternate" size={24} color="black" />
              <SmallText style={styles.imageText}>Upload Photo</SmallText>
            </TouchableOpacity>
          </InnerContainer>
        )}
      </ImageBackground>

      <InnerContainer style={styles.descriptionContainer}>
        <RegularText style={styles.headingText}>Description:</RegularText>
        <TextInput
          style={styles.descriptionInput}
          onChangeText={(dishDescription) => setDishDescription(dishDescription)}
          value={dishDescription}
          multiline={true}
          placeholder="Max 100 characters"
          autoCorrect={false}
        />
      </InnerContainer>

      <InnerContainer style={styles.descriptionContainer}>
        <RegularText style={styles.headingText}>Allergens:</RegularText>
        <TextInput
          style={styles.descriptionInput}
          onChangeText={(dishAllergens) => setDishAllergens(dishAllergens)}
          value={dishAllergens}
          multiline={true}
          placeholder="Add details the consumer might need to know (e.g. Halal or Dairy).  Separate with commas"
          autoCorrect={false}
        />
      </InnerContainer>

      <InnerContainer style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <RegularText style={styles.buttonText}>Save</RegularText>
        </TouchableOpacity>
      </InnerContainer>
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
  fieldContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#ff2324',
    maxHeight: '7%',
    marginVertical: 3,
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
    maxWidth: '50%',
    // backgroundColor: '#adda12',
  },
  descriptionInput: {
    flex: 1,
    paddingVertical: 3,
    paddingHorizontal: 10,
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
    marginVertical: 20,
    justifyContent: 'center',
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
    maxHeight: '18%',
    marginVertical: 5,
    // backgroundColor: "#ff9",
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

export default StallOwnerEditDish;
