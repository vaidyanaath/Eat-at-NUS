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
import { colors } from '../../../assets/colors';

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
          author: child.val().author,
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
        {/* <RegularText style={styles.heading}>REVIEWS</RegularText> */}
        <BigText style={styles.rating}>{dishRating}</BigText>
        <Rating
          type="custom"
          readonly={true}
          fractions={1}
          imageSize={30}
          startingValue={dishRating}
          ratingColor={colors.secondary}
        />
      </InnerContainer>

      <InnerContainer style={styles.reviewsContainer}>
        <FlatList
          data={reviewData}
          renderItem={({ item }) => (
            <ReviewContainer
              author={item.author}
              review={item.review}
              rating={item.rating}
              timeStamp={item.timeStamp}
            />
          )}
          ListFooterComponent={<View marginBottom={15} />}
          showsVerticalScrollIndicator={false}
          vertical={true}
          style={styles.reviewsList}
        />
      </InnerContainer>

      <InnerContainer style={styles.buttonContainer}>
        <RegularButton
          style={styles.button}
          onPress={() => navigation.navigate('WriteReview', { dishID: dishID })}
        >
          <RegularText style={styles.buttonText}>Write a Review</RegularText>
        </RegularButton>
      </InnerContainer>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    // backgroundColor: '#E389B9',
    paddingTop: 0,
    paddingBottom: 5,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    maxHeight: '20%',
    marginBottom: 10,
    // backgroundColor: '#288BA8',
  },
  heading: {
    fontWeight: 'bold',
    // backgroundColor: '#FFCE30',
  },
  rating: {
    marginVertical: 5,
    fontSize: 50,
  },
  reviewsContainer: {},
  reviewsList: {
    maxWidth: '98%',
    // backgroundColor: '#E389B9',
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '95%',
    marginTop: 5,
    maxHeight: '10%',
    // backgroundColor: '#288BA8',
  },
  button: {
    width: '100%',
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: colors.bg,
  },
});

export default Review;
