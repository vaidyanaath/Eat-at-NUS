import React from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';

// import colors
import { colors } from '../../assets/colors';

export const ListContainer = ({ photo, onPress, content }) => {
  return (
    <TouchableOpacity style={cardStyles.button} onPress={onPress}>
      <View style={cardStyles.container}>
        <View style={cardStyles.imageContainer}>
          <Image style={cardStyles.image} source={{ uri: photo }} />
        </View>
        {content}
      </View>
    </TouchableOpacity>
  );
};

const cardStyles = StyleSheet.create({
  button: {
    flex: 1,
    height: 90,
    alignSelf: 'center',
    width: '99%',
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
  container: {
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
});
