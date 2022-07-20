import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, FlatList, Image, Modal } from 'react-native';

// import components
import { StyledContainer } from '../../../components/containers/StyledContainer';
import { SearchBar } from '../../../components/SearchBar';
import { ProfileButton } from '../../../components/buttons/ProfileButton';
import { FilterSection } from '../../../components/FilterSection';

import Overlay from 'react-native-modal-overlay';

// import colors
import { colors } from '../../../assets/colors';
import { InnerContainer } from '../../../components/containers/InnerContainer';

import { RegularText } from '../../../components/texts/RegularText';

import { ListContainer } from '../../../components/containers/ListContainer';
import { HorizontalListContainer } from '../../../components/containers/HorizontalListContainer';

import { auth } from '../../../firebase/config';

// Import Database
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase/config';

const discover = () => (
  <RegularText style={{ fontSize: 25, marginVertical: 10 }}>Discover</RegularText>
);

const Home = ({ navigation }) => {
  const user = auth.currentUser;
  const placeholderAvatar =
    'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
  const avatar = user && user.photoURL ? user.photoURL : placeholderAvatar;

  // Fetch stalls Metadata
  const [stallsMetadataArr, setStallsMetadataArr] = useState(null);

  useEffect(() => {
    const reference = ref(db, 'stallsMetadata/');
    onValue(reference, (snapshot) => {
      var items = [];
      snapshot.forEach((child) => {
        items.push({
          id: child.key,
          cuisine: child.val().cuisine,
          imageURL: child.val().imageURL,
          name: child.val().name,
          rating: child.val().rating,
        });
      });
      setStallsMetadataArr(items);
    });

    return () => {
      setStallsMetadataArr(null);
    }
  }, [db]);

  const [showFilter, setShowFilter] = useState(false);

  const handleFilter = () => {
    setShowFilter(true);
    console.log('Filter button pressed!');
  };

  return (
    user &&
    stallsMetadataArr && (
      <StyledContainer style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
        <InnerContainer style={styles.header}>
          <RegularText style={styles.greeting}>
            Hello, {user.displayName ? user.displayName.split(' ')[0] : 'foodie'}
          </RegularText>
          <ProfileButton source={{ uri: avatar }} />
        </InnerContainer>
        <InnerContainer style={styles.body}>
          <SearchBar onPress={handleFilter} />
          <Overlay
            visible={showFilter}
            onClose={() => setShowFilter(false)}
            closeOnTouchOutside
            animationType="zoomIn"
            containerStyle={styles.overlayWrapper}
            childrenWrapperStyle={styles.filterOverlay}
          >
            <FilterSection />
          </Overlay>

          <RegularText style={{ fontSize: 25, alignSelf: 'flex-start', marginVertical: 10 }}>
            Popular Near You
          </RegularText>
          <FlatList
            data={DUMMY_DATA.sort((a, b) => b.rating.localeCompare(a.rating))}
            renderItem={({ item }) => (
              <HorizontalListContainer
                item={item}
                onPress={() => navigation.navigate('Dish', { name: item.name })}
              />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            minHeight={165}
            backgroundColor={colors.bg} //'#ff75'
          />
          <FlatList
            data={stallsMetadataArr}
            renderItem={({ item }) => (
              <ListContainer
                photo={item.imageURL}
                onPress={() => navigation.navigate('Stall', { stall: item })}
                content={stallContent(item)}
              />
            )}
            ListHeaderComponent={discover}
            style={styles.discoverList}
            ListFooterComponent={<View marginBottom={15}></View>}
            showsVerticalScrollIndicator={false}
            vertical={true}
          />
        </InnerContainer>
      </StyledContainer>
    )
  );
};

const stallContent = (stallMetadata) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={cardStyles.textContainer}>
        <RegularText style={cardStyles.stallName}>{stallMetadata.name}</RegularText>
        <RegularText style={cardStyles.stallDistance}>{/* 5 Km away */}</RegularText>
        <RegularText style={cardStyles.stallDistance}>{stallMetadata.cuisine}</RegularText>
      </View>
      <View style={cardStyles.ratingContainer}>
        <View style={cardStyles.ratingBG}>
          <Text style={cardStyles.stallRating}>{stallMetadata.rating}</Text>
        </View>
      </View>
    </View>
  );
};

const cardStyles = StyleSheet.create({
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
    fontSize: 19,
  },
  stallDistance: {
    flex: 2,
    fontSize: 15,
  },
  ratingContainer: {
    justifyContent: 'flex-start',
    padding: 15,
    // backgroundColor: "#23af"
  },
  stallRating: {
    fontSize: 15,
  },
  ratingBG: {
    paddingHorizontal: 4,
    borderRadius: 3,
    minWidth: 28,
    alignItems: 'center',
    backgroundColor: '#FFB81C',
  },
});

const styles = StyleSheet.create({
  mainContainer: {
    paddingBottom: 0,
    paddingHorizontal: 30,
    paddingTop: 10,
    // alignItems: 'flex-start',
    backgroundColor: colors.bg, //"#ff234a",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: '10%',
    paddingHorizontal: 10,
    // backgroundColor: '#abcdef',
  },
  overlayWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(96,96,96,0.3)',
  },
  filterOverlay: {
    flex: 1,
    borderRadius: 25,
    maxHeight: '65%',
    width: '90%',
    padding: 0,
  },
  greeting: {
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
    rating: '4.2',
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
  },
];

export default Home;
