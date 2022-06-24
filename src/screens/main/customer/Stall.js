import React from 'react';
import { StatusBar, StyleSheet, Text, View, FlatList, Image } from 'react-native';

// import components
import { StyledContainer } from '../../../components/containers/StyledContainer'
import { InnerContainer } from '../../../components/containers/InnerContainer';
import { ListContainer } from '../../../components/containers/ListContainer';
import { RegularText } from '../../../components/texts/RegularText';
import { SmallText } from '../../../components/texts/SmallText';

// import colors
import { colors } from '../../../assets/colors';

// import icon
import { Ionicons } from '@expo/vector-icons';

// Content in each list item
const dishContent = (item) => (
  <View style={cardStyles.textContainer}>
    
    <View style={cardStyles.topContainer}>
      <RegularText style={cardStyles.dishName}>
        {item.name}
      </RegularText>
      <View style={cardStyles.ratingBG}>
        <Text style={cardStyles.dishRating}>{item.rating}</Text>
      </View>
    </View>

    <RegularText style={cardStyles.dishPrice}>S$ {item.id}</RegularText>
    
    
    
  </View>
)

const cardStyles = StyleSheet.create({
  textContainer: {
      flex: 1,
      borderBottomRightRadius: 20,
      borderTopRightRadius: 20,
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      flexDirection: 'column',
      paddingVertical: 10,
      // backgroundColor: "#abcdef",
  },
  dishName: {
      fontSize: 20,
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingBottom: 5,
    alignItems: 'flex-end',
    // backgroundColor: "#34adcc"
  },
  dishPrice: {
      flex: 2,
      fontSize: 23,
  },
  dishRating: {
      fontSize: 15,
  },
  ratingBG: {
      paddingHorizontal: 4,
      borderRadius: 3,
      backgroundColor: '#FFB81C',
  }
});

const Stall = ({ navigation, route }) => {

  return (
      <StyledContainer style={styles.mainContainer}>
          <StatusBar barStyle="dark-content" backgroundColor={colors.bg}  />
          <InnerContainer style={styles.stallInfo}>
          <RegularText style={styles.infoText}>Cusisine Type</RegularText>
            <View style={styles.locationContainer}>
              <Ionicons name="ios-location-outline" size={24} color={colors.primary} />
              <RegularText>  Location address</RegularText>
            </View>
            
            
            <RegularText style={styles.infoText}>Opening Time:   8:00 am</RegularText>
            <RegularText style={styles.infoText}>Closing Time:     1:00 pm</RegularText>
            <RegularText style={styles.infoText}>Rating: {route.params.item.rating}</RegularText>

          </InnerContainer>
          <InnerContainer style={styles.body}>
            
              
            <RegularText style={{fontSize: 25, marginBottom: 5, alignSelf: 'flex-start',}}>Dishes</RegularText>
              
            <FlatList
                data={DUMMY_DATA.sort((a, b) => b.rating.localeCompare(a.rating))}
                renderItem={({ item }) => 
                  <ListContainer 
                    photo={require('../../../assets/images/food3.jpg')} 
                    onPress={() => navigation.navigate('Dish', {name: item.name})}
                    content={dishContent(item)}
                  />}
                keyExtractor={item => item.id}
                style={styles.discoverList}
                ListFooterComponent={<View marginBottom={10}></View>}
                showsVerticalScrollIndicator={false}
                vertical={true}
            />

          </InnerContainer>
      </StyledContainer>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
      paddingBottom: 0,
      paddingHorizontal: 30,
      paddingTop: 10,
      alignItems: 'center',
      // alignItems: 'flex-start',
    //   backgroundColor: "#ff234a",
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      maxHeight: '10%',
      paddingHorizontal: 10,
      // backgroundColor: '#abcdef',
  }, greeting: {
      fontWeight: 'bold',
  },
  body: {
      paddingHorizontal: 10,
      // backgroundColor: "#ff2"
  },
  discoverList: {
    width: '100%',
  },
  stallInfo: {
    flex: 1,
    maxHeight: '30%',
    padding: 30,
    borderRadius: 25,
    width: '95%',
    marginBottom: 20,
    alignItems: 'flex-start',
    backgroundColor: colors.bg, //"#fa2",
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  locationContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    minHeight: 40,
    //backgroundColor: '#afaa'
  },
  infoText: {
    fontSize: 18,
    marginVertical: 2,
  },

});



const DUMMY_DATA = [
    {
      id: 1,
      name: 'Western',
      rating: '4.5',
    },
    {
      id: 2,
      name: 'Fried Wok',
      rating: '4.3',
    },
    {
      id: 3,
      name: 'Chicken',
      rating: '4.2',
    },
    {
      id: 4,
      name: 'Duck',
      rating: '3.8',
    },
    {
      id: 5,
      name: 'Cow',
      rating: '4.8',
    },
    {
      id: 6,
      name: 'Deer',
      rating: '3.0',
    },
    {
      id: 7,
      name: 'Horse',
      rating: '4.2',
    },
    {
        id: 8,
        name: 'Pig',
        rating: '4.7',
    },
    {
        id: 9,
        name: 'Rabbit',
        rating: '3.2',
    },
    {
        id: 10,
        name: 'Sheep',
        rating: '3.8',
    },
    {
        id: 11,
        name: 'Goat',
        rating: '4.2'
    },
    {
        id: 12,
        name: 'Llama',
        rating: '4.2',
    },
    {
        id: 13,
        name: 'Panda',
        rating: '1.0',
    }
 
  ];



export default Stall;