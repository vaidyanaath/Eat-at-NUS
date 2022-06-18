import React from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    Text,
    StyleSheet,
} from 'react-native';

// import texts
import { RegularText } from '../../components/texts/RegularText';

// import colors
import { colors } from '../../assets/colors';

export const ListContainer = ({ item }) => (
    <TouchableOpacity style={cardStyles.button}>
        <View style={cardStyles.container}>
            <View style={cardStyles.imageContainer}>
              <Image 
                  style={cardStyles.image} 
                  source={require('../../assets/images/food.jpg')} 
              />
            </View>
            <View style={cardStyles.textContainer}>
                <RegularText style={cardStyles.stallName}>
                  {item.name}
                </RegularText>
                <RegularText style={cardStyles.stallDistance}>
                  {item.id} Km away
                </RegularText>
                
                <View style={cardStyles.ratingBG}>
                  <Text style={cardStyles.stallRating}>
                      {item.rating}
                  </Text>
                </View>
                
            </View>
        </View>
    </TouchableOpacity>
);

  
const cardStyles = StyleSheet.create({
button: {
    flex: 1,
    height: 110,
    marginVertical: 5,
    activeOpacity: 0.8,
    borderRadius: 20,
    borderColor: colors.gray,
    borderWidth: 0,
    backgroundColor: colors.gray,
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
    borderTopRightRadius: 20,
},
image: {
    flex: 1,
    borderRadius: 20,
    width: 150,
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
    fontSize: 26,
},
stallDistance: {
    flex: 2,
    fontSize: 18,
},
stallRating: {
    fontSize: 17,
},
ratingBG: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#FFB81C',
}
});