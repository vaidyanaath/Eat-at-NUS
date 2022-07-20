import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { InnerContainer } from '../../../components/containers/InnerContainer';
import { StyledContainer } from '../../../components/containers/StyledContainer';
import { BigText } from '../../../components/texts/BigText';
import { RegularText } from '../../../components/texts/RegularText';

import { Rating, AirbnbRating } from 'react-native-ratings';
import { SmallText } from '../../../components/texts/SmallText';
import { RegularButton } from '../../../components/buttons/RegularButton';

// Import Database
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase/config';
import LoadingScreen from '../../../components/screens/LoadingScreen';
import { ReviewContainer } from '../../../components/containers/ReviewContainer';

const Review = ({ navigation, route }) => {
  const dishID = route.params.dishID;
  const dishRating = route.params.dishRating;

  const [reviewData, setReviewData] = React.useState(null);

  // get reviews data

  useEffect(() => {
    const reference = ref(db, 'reviews/' + dishID);
    onValue(reference, (snapshot) => {
      var items = [];
      snapshot.forEach((child) => {
        items.push({
          reviewerName: child.val().reviewerName,
          review: child.val().review,
          rating: child.val().rating,
          timeStamp: child.val().timeStamp,
        });
      });
      setReviewData(items);
    });

    return () => {
      setReviewData(null);
    };
  }, [db]);

  if (!reviewData) {
    return <LoadingScreen />;
  }

  return (
    <StyledContainer style={styles.mainContainer}>
      <InnerContainer style={styles.infoContainer}>
        <RegularText style={styles.heading}>REVIEWS</RegularText>
        <BigText style={styles.rating}>{dishRating}</BigText>
        <Rating readonly={true} fractions={1} imageSize={30} startingValue={dishRating} />
      </InnerContainer>

      <InnerContainer style={styles.reviewsContainer}>
        <FlatList
          data={reviewData}
          renderItem={({ item }) => (
            <ReviewContainer
              reviewerName={item.reviewerName}
              review={item.review}
              rating={item.rating}
              timeStamp={item.timeStamp}
            />
          )}
          ListFooterComponent={<View marginBottom={15} />}
          showsVerticalScrollIndicator={false}
          vertical={true}
        />
      </InnerContainer>

      <InnerContainer style={styles.buttonContainer}>
        <RegularButton style={styles.button} onPress={() => navigation.navigate('WriteReview', {dishID: dishID})}>
          <RegularText style={styles.buttonText}>Write a Review</RegularText>
        </RegularButton>
      </InnerContainer>
    </StyledContainer>
  );
};

const reviewContent = (review) => {
  return (
    <InnerContainer style={styles.reviewItemContainer}>
      <SmallText>{review.reviewerName}</SmallText>
      <SmallText>{review.review}</SmallText>
    </InnerContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#E389B9',
    paddingTop: 0,
  },
  infoContainer: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    maxHeight: '30%',
    backgroundColor: '#288BA8',
  },
  heading: {
    fontWeight: 'bold',
    backgroundColor: '#FFCE30',
  },
  rating: {
    marginVertical: 10,
    fontSize: 50,
  },
  reviewsContainer: {
    maxHeight: '60%',
  },
  reviewItemContainer: {},
  buttonContainer: {
    width: '100%',
    marginTop: '10%',
    maxHeight: '10%',
    backgroundColor: '#288BA8',
  },
  button: { width: '100%', backgroundColor: '#FFCE30' },
  buttonText: {},
});

export default Review;
