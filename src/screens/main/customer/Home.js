import React from 'react';
import { StatusBar, StyleSheet, Text, View, FlatList, Image } from 'react-native';

// import components
import { StyledContainer } from '../../../components/containers/StyledContainer'

// import colors
import { colors } from '../../../assets/colors';
import { InnerContainer } from '../../../components/containers/InnerContainer';

import { RegularText } from '../../../components/texts/RegularText';
import { BigText } from '../../../components/texts/BigText';
import { SmallText } from '../../../components/texts/SmallText';


import { Feather } from '@expo/vector-icons';
import { ShadowButton } from '../../../components/buttons/ShadowButton';
import { RegularButton } from '../../../components/buttons/RegularButton';
import { TouchableOpacity } from 'react-native';
import { TextInput, ScrollView } from 'react-native';

import { ListContainer } from '../../../components/containers/ListContainer';
import { HorizontalListContainer } from '../../../components/containers/HorizontalListContainer';

const SearchBar = () => {
  return(
    <View style={searchBarStyle.container}>
      <View style={searchBarStyle.searchContainer}>
        <Image source={require('../../../assets/images/search.png')} style={searchBarStyle.searchIcon} />
        <TextInput placeholder='Search' selectionColor={colors.secondary} style={searchBarStyle.searchTextInput}/>
      </View>
      <TouchableOpacity style={searchBarStyle.filterButton}>
      <Image source={require('../../../assets/images/filter.png')} style={searchBarStyle.filterIcon} />
      </TouchableOpacity>

    </View>
  );
};

const searchBarStyle = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'row',
    minHeight: 50, 
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#e71837'
  },
  searchContainer : {
    flex: 1,
    flexDirection: 'row',
    minHeight: 20,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 5,
    backgroundColor: colors.gray,
    paddingRight: 20,
  },
  searchIcon: {
    width: 40,
    height: 40,
    tintColor: colors.secondary,
    // backgroundColor: 'purple',
  },
  filterIcon: {
    width: 18,
    height: 18,
    tintColor: colors.gray,
  },
  filterButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  searchTextInput: {
    flex: 1,
    // backgroundColor: '#fed34a', // turquoise
  },

});

const discover = () => (<RegularText style={{fontSize: 25, marginVertical: 10}}>Discover</RegularText>);


const Home = () => {
  return (
      <StyledContainer style={styles.mainContainer}>
          <StatusBar barStyle="dark-content" backgroundColor={colors.bg}  />
          <InnerContainer style={styles.header}>
              <RegularText style={styles.greeting}>Hello, Foodie</RegularText>
              <Image 
                  style={styles.profilePic} 
                  source={require('../../../assets/images/avatar.jpg')}
              />
          </InnerContainer>
          <InnerContainer style={styles.body}>
              <SearchBar />
              
              <RegularText style={{ fontSize: 25, alignSelf: 'flex-start', marginVertical: 10, }}>Popular Near You</RegularText>
              <FlatList
                  data={ANIMAL_NAMES}
                  renderItem={({ item }) => <HorizontalListContainer item={item} />}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  minHeight={160}
                  backgroundColor=  {colors.bg}//'#ff75'
              />
              <FlatList
                  data={ANIMAL_NAMES}
                  renderItem={({ item }) => <ListContainer item={item} />}
                  keyExtractor={item => item.id}
                  ListHeaderComponent={discover}
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
      backgroundColor: colors.bg//"#ff234a",
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
  profilePic: {
      width: 50,
      height: 50,
      borderRadius: 20,
  },
  body: {
      padding: 10,
      // backgroundColor: "#ff2"
  },
  discoverList: {
    width: '100%',
  },
});



const ANIMAL_NAMES = [
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



export default Home;