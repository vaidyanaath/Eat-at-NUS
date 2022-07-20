import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';

// import colors
import { colors } from '../../assets/colors';
import { SmallText } from '../texts/SmallText';

import { AirbnbRating } from 'react-native-ratings';

/*

reviewerName={item.reviewerName}
              review={item.review}
              rating={item.rating}
              timeStamp={item.timeStamp}
*/

export const ReviewContainer = ({ reviewerName, review, rating, timeStamp }) => {
  return (
    <View style={cardStyles.container}>
      <View style={cardStyles.topSection}>
        <SmallText style={cardStyles.reviewerName}>{reviewerName}</SmallText>
        <SmallText style={cardStyles.timeStamp}>{timeStamp}</SmallText>
        <AirbnbRating 
        isDisabled={true}
        showRating={false}
        size={20}
        defaultRating={rating}
        />
      </View>
      <View style={cardStyles.bottomSection}>
        <SmallText style={cardStyles.review}>{review}</SmallText>
      </View>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    width: '98%',
    marginVertical: 5,
    activeOpacity: 0.8,
    borderRadius: 20,
    borderColor: colors.gray,
    borderWidth: 0,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  topSection: {
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    // backgroundColor: "#fef342",
    maxWidth: 140,
    // width: 150,
  },
  image: {
    flex: 1,
    borderRadius: 20,
    resizeMode: 'cover',
    width: 125,
  },
  textContainer: {
    flex: 1,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingVertical: 10,
    //backgroundColor: "#abcdef",
  },
  stallName: {
    fontSize: 20,
  },
  stallDistance: {
    flex: 2,
    fontSize: 15,
  },
  stallRating: {
    fontSize: 15,
  },
  ratingBG: {
    paddingHorizontal: 4,
    borderRadius: 3,
    backgroundColor: '#FFB81C',
  },
});
