import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';

// Import Database
import { ref, onValue } from 'firebase/database';
import { auth, db } from '../../../firebase/config';
import { StyledContainer } from '../../../components/containers/StyledContainer';
import { InnerContainer } from '../../../components/containers/InnerContainer';
import LoadingScreen from '../../../components/screens/LoadingScreen';
import { RegularText } from '../../../components/texts/RegularText';
import { SmallText } from '../../../components/texts/SmallText';

import { AirbnbRating } from 'react-native-ratings';
import { RegularButton } from '../../../components/buttons/RegularButton';
import { colors } from '../../../assets/colors';
import { KeyboardAvoidingWrapper } from '../../../components/KeyboardAvoidingWrapper';
import addReview from '../../../firebase/AddReview';

const WriteReview = ({ navigation, route }) => {
  const dishID = route.params.dishID;
  const user = auth.currentUser;

  const [rating, setRating] = useState(3);
  const [review, setReview] = useState('');
  const [dishData, setDishData] = useState(null);

  useEffect(() => {
    const reference = ref(db, 'dishes/' + dishID);
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      setDishData(data);
    });

    return () => {
      setDishData(null);
    };
  }, [db]);

  const handleSubmitReview = () => {
    addReview(dishID, dishData.stall, rating, review, user.displayName);
    console.log("Review Submitted!");
    // cleanup
    // navigation.goBack();
    navigation.navigate('Dish', { dishID: dishID });
  }

  if (!dishData) {
    return <LoadingScreen />;
  }

  return (
    <StyledContainer style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingWrapper style={styles.keyboardWrapper}>
          <InnerContainer style={styles.topSection}>
            <InnerContainer style={styles.infoSection}>
              <RegularText style={styles.dishName}>{dishData.name}</RegularText>
              <SmallText style={styles.description}>{dishData.description}</SmallText>
            </InnerContainer>
            <Image
              style={styles.image}
              source={{ uri: dishData.imageURL }}
            />
          </InnerContainer>

          <InnerContainer style={styles.ratingSection}>
            <RegularText style={styles.heading}>Rate the dish:</RegularText>
            <AirbnbRating
              showRating={false}
              size={30}
              selectedColor={colors.primary}
              defaultRating={rating}
              onFinishRating={rating => setRating(rating)}
            />
          </InnerContainer>

          <InnerContainer style={styles.reviewSection}>
            <RegularText style={styles.heading}>Write your review:</RegularText>
            <TextInput
              style={styles.reviewInput}
              onChangeText={(review) => setReview(review)}
              value={review}
              multiline={true}
              autoCorrect={false}
            />
          </InnerContainer>

          <InnerContainer style={styles.buttonSection}>
            <RegularButton style={styles.button} onPress={handleSubmitReview}>
              <RegularText style={styles.buttonText}>Submit</RegularText>
            </RegularButton>
          </InnerContainer>
        </KeyboardAvoidingWrapper>
      </ScrollView>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 10,
    alignItems: 'flex-start',
    // backgroundColor: '#edf',
  },
  keyboardWrapper: {
    flex: 1,
    // backgroundColor: '#fedcba',
    minHeight: Dimensions.get('window').height - 80,
  },
  topSection: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 110,
    backgroundColor: '#cefe',
    borderRadius: 15,
    padding: 10,
  },
  image: {
    height: 90,
    width: 100,
    borderRadius: 10,
    alignSelf: 'center',
    marginRight: 10,
  },
  infoSection: {
    flex: 1,
    flexDirection: 'column',
    height: 90,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 10,
    // backgroundColor: "#4442ca"
  },
  dishName: {
    fontWeight: 'bold',
  },
  description: {
    fontSize: 13,
  },
  heading: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  ratingSection: {
    flex: 1,
    maxHeight: 150,
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 20,
    // backgroundColor: '#cefece',
  },
  reviewSection: {
    flex: 1,
    // maxHeight: 150,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 20,
    // backgroundColor: '#fecefe',
  },
  reviewInput: {
    flex: 1,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    minWidth: '100%',
    marginVertical: 10,
    // backgroundColor: '#adda12',
  },
  buttonSection: {
    maxHeight: '10%',
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    backgroundColor: colors.secondary,
    width: '100%',
  },
  buttonText: {
    color: colors.bg,
  },
});

export default WriteReview;
