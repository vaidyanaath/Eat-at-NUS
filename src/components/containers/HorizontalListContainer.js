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
import { SmallText } from '../../components/texts/SmallText';

// import colors
import { colors } from '../../assets/colors';

export const HorizontalListContainer = ({ item }) => (
    <TouchableOpacity style={cardStyles.button}>
        <View style={cardStyles.container}>
            <View style={cardStyles.topContainer}>
                <Image 
                    style={cardStyles.image} 
                    resizeMode='cover'
                    source={require('../../assets/images/food2.jpg')} 
                />
                
            </View>
            <View style={cardStyles.bottomContainer}>
                <View style={cardStyles.textContainer}>
                    <RegularText style={cardStyles.dishName}>
                    {item.name}
                    </RegularText>
                    <SmallText style={cardStyles.dishInfo}>
                    {item.id} Km away
                    </SmallText>

                </View>
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
    marginVertical: 5,
    marginHorizontal: 10,
    activeOpacity: 0.8,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // borderRadius: 20,

    borderColor: colors.gray,
    borderWidth: 0,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    minHeight: 155,
    minWidth: 150,
},
container: {
    flex: 1,
    flexDirection: 'column',
    minWidth: 130,
},
topContainer: {
    flex: 1,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: 50,
    
},
image: {

    height: '95%',
    width: '100%',
    // borderRadius: 20,
    
},
bottomContainer: {
    flex: 1,
    // borderBottomRightRadius: 20,
    // borderBottomLeftRadius: 20,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 5,
    paddingHorizontal: 10,
    // backgroundColor: "#2ba",
},
textContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    // backgroundColor: "#abcdef",
},
dishName: {
    fontSize: 20,
},
dishInfo: {
    flex: 1,
    fontSize: 15,
},
stallRating: {
    fontSize: 13,
},
ratingBG: {
    alignSelf: 'flex-end',
    marginBottom: 5,
    paddingHorizontal: 4,
    borderRadius: 3,
    backgroundColor: '#FFB81C',
    
}
});