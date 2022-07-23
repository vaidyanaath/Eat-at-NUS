import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';

// import colors
import { colors } from '../../assets/colors';
import { SmallText } from '../texts/SmallText';

import { AirbnbRating } from 'react-native-ratings';

import { getTimeDifference } from '../../utils/getTimeDifference';

export const ReviewContainer = ({ author, review, rating, timeStamp }) => {
  return (
    <View style={cardStyles.container}>
      <View style={cardStyles.topSection}>
        <SmallText style={cardStyles.author}>{author}</SmallText>
        <AirbnbRating
          isDisabled={true}
          showRating={false}
          size={20}
          selectedColor={colors.primary}
          defaultRating={rating}
        />
      </View>
      <View style={cardStyles.reviewSection}>
        <SmallText style={cardStyles.review}>{review}</SmallText>
      </View>
      <View style={cardStyles.bottomSection}>
        <SmallText style={cardStyles.timeStamp}>{getTimeDifference(timeStamp, Date.now())}</SmallText>
      </View>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: '99%',
    minHeight: 125,
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginVertical: 5,
    borderRadius: 20,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    // backgroundColor: '#cefe',
  },
  author: {
    fontWeight: 'bold',
  },
  reviewSection: {
  },
  bottomSection: {
    marginVertical: 5,
    alignSelf: 'flex-end',
  },
  timeStamp: {
    color: colors.darkGray,
  }
});
