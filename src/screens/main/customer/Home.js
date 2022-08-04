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
import { ref, onValue, query, orderByChild, limitToFirst } from 'firebase/database';
import { db } from '../../../firebase/config';

const Home = ({ navigation }) => {
  const user = auth.currentUser;
  const placeholderAvatar =
    'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
  const avatar = user && user.photoURL ? user.photoURL : placeholderAvatar;

  // Fetch popular dishes
  const [popularDishes, setPopularDishes] = useState([]);
  useEffect(() => {
    const reference = ref(db, 'dishes/');
    const topDishesRef = query(reference, orderByChild('ratingIndex'), limitToFirst(8));
    onValue(topDishesRef, (snapshot) => {
      var dishes = [];
      snapshot.forEach((child) => {
        dishes.push({
          id: child.key,
          availability: child.val().availability,
          name: child.val().name,
          rating: child.val().rating,
          imageURL: child.val().imageURL,
          price: child.val().price,
        });
      });
      setPopularDishes(dishes);
    });

    return () => {
      setPopularDishes([]);
    };
  }, [db]);

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
    };
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

          <RegularText style={{ fontSize: 22, alignSelf: 'flex-start', marginVertical: 5 }}>
            Popular Near You
          </RegularText>
          <FlatList
            data={popularDishes}
            renderItem={({ item }) => (
              <HorizontalListContainer
                item={item}
                onPress={() => navigation.navigate('Dish', { dishID: item.id })}
              />
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            minHeight={145}
            backgroundColor={colors.bg} //'#ff75'
          />
          <RegularText style={{ fontSize: 22, marginVertical: 5, alignSelf: 'flex-start' }}>
            Discover
          </RegularText>
          <FlatList
            data={stallsMetadataArr}
            renderItem={({ item }) => (
              <ListContainer
                photo={item.imageURL}
                onPress={() => navigation.navigate('Stall', { stall: item })}
                content={stallContent(item)}
              />
            )}
            // ListHeaderComponent={discover}
            style={styles.discoverList}
            ListFooterComponent={<View marginBottom={15} />}
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
        <RegularText style={cardStyles.stallCuisine}>{stallMetadata.cuisine}</RegularText>
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
    fontSize: 18,
  },
  stallCuisine: {
    color: colors.primary,
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

export default Home;
