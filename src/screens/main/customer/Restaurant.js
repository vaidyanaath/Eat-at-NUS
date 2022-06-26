import React from 'react';
import { StatusBar, StyleSheet, Text, View, FlatList, Image } from 'react-native';

// import components
import { StyledContainer } from '../../../components/containers/StyledContainer'
import { InnerContainer } from '../../../components/containers/InnerContainer';
import { ListContainer } from '../../../components/containers/ListContainer';
import { RegularText } from '../../../components/texts/RegularText';

// import colors
import { colors } from '../../../assets/colors';

const Restaurant = ({ navigation, route }) => {
  

  return (
      <StyledContainer style={styles.mainContainer}>
          <StatusBar barStyle="dark-content" backgroundColor={colors.bg}  />
          <InnerContainer style={styles.body}>
              
            <RegularText style={{fontSize: 25, marginBottom: 5, alignSelf: 'flex-start',}}>Dishes</RegularText>
              
            <FlatList
                data={DUMMY_DATA.sort((a, b) => b.rating.localeCompare(a.rating))}
                renderItem={({ item }) => <ListContainer item={item} onPress={() => navigation.navigate('Dish', {dishId: "d1"})}/>}
                keyExtractor={item => item.id}
                style={styles.discoverList}
                ListFooterComponent={<View marginBottom={20}></View>}
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



export default Restaurant;