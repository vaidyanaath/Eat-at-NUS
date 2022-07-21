import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet, ImageBackground } from 'react-native';

// import texts
import { RegularText } from '../../components/texts/RegularText';
import { SmallText } from '../../components/texts/SmallText';

// import icon
import { FontAwesome, Entypo } from '@expo/vector-icons';

// import colors
import { colors } from '../../assets/colors';

export const HorizontalListContainer = ({ item, onPress }) => (
  <TouchableOpacity style={cardStyles.button} onPress={onPress}>
    <View style={cardStyles.container}>
      <View style={cardStyles.topContainer}>
        <ImageBackground
          style={cardStyles.image}
          resizeMode="cover"
          source={require('../../assets/images/food2.jpg')} // replace with imageURL
        >
          <View style={cardStyles.ratingBG}>
            <Text style={cardStyles.stallRating}>{item.rating}</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={cardStyles.bottomContainer}>
        {/*left section*/}
        <View style={cardStyles.textContainer}>
          <RegularText style={cardStyles.dishName}>{item.name}</RegularText>
        </View>
        {/*right section*/}
        <View style={cardStyles.iconContainer}>
          {item.availability == true ? (
            <FontAwesome name="check-circle" size={16} color="green" />
          ) : (
            <Entypo name="circle-with-cross" size={16} color="red" />
          )}
          <SmallText style={cardStyles.dishPrice}>$ {item.price}</SmallText>
          
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const cardStyles = StyleSheet.create({
  button: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 10,
    activeOpacity: 0.8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 20,

    borderColor: colors.gray,
    borderWidth: 0,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    height: 135,
    width: 140,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    minWidth: 130,
  },
  topContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 50,
  },
  image: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomContainer: {
    flex: 1,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    // minHeight: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 5,
    paddingHorizontal: 15,
    // backgroundColor: "#2ba",
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    // justifyContent: 'flex-start',
    flexDirection: 'column',
    maxWidth: '60%',
    height: '100%',
    // backgroundColor: "#abcdef",
  },
  iconContainer: {
    minHeight: 45,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 3,
    // backgroundColor: '#eada'
  },
  dishName: {
    fontSize: 14,
    textAlignVertical: 'center',
  },
  dishPrice: {
    flex: 1,
    fontSize: 15,
  },
  stallRating: {
    fontSize: 13,
  },
  ratingBG: {
    alignSelf: 'flex-end',
    paddingHorizontal: 4,
    borderRadius: 3,
    backgroundColor: '#FFB81C',
  },
});
