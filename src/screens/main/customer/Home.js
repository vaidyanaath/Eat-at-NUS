import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';

// import components
import { StyledContainer } from '../../../components/containers/StyledContainer';
import { SearchBar } from '../../../components/SearchBar';
import { ProfileButton } from '../../../components/buttons/ProfileButton';
import { FilterSection } from '../../../components/FilterSection';

import Overlay from 'react-native-modal-overlay';

// Filter modal popup
import SelectableChips from 'react-native-chip/SelectableChips';
import Slider from 'react-native-slider';

// import colors
import { colors } from '../../../assets/colors';
import { InnerContainer } from '../../../components/containers/InnerContainer';
import { RegularButton } from '../../../components/buttons/RegularButton';

import { RegularText } from '../../../components/texts/RegularText';
import { BigText } from '../../../components/texts/BigText';

import { ListContainer } from '../../../components/containers/ListContainer';
import { HorizontalListContainer } from '../../../components/containers/HorizontalListContainer';

import { auth } from '../../../firebase/config';

// Import Database
import { ref, onValue, query, orderByChild, limitToFirst } from 'firebase/database';
import { db } from '../../../firebase/config';

import filterData from '../../../firebase/filter/FilterData';

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

  const handleFilterButtonPress = () => {
    setShowFilter(true);
    console.log('Filter button pressed!');
  };

  const applyFilter = async () => {
    const result = await filterData(searchText, cuisines);
    console.log(result[0]);
    console.log(result[1]);
    setShowFilteredData(true);
    setShowFilter(false);
    console.log('Filter applied!');
  };

  const clearFilter = () => {
    setShowFilteredData(false);
    setShowFilter(false);
    console.log('Filter cleared!');
  }

  // Search and filter data
  const [searchText, setSearchText] = useState('');
  const [cuisines, setCuisines] = useState([]);
  const [priceEnd, setPriceEnd] = useState(0);
  const [distance, setDistance] = useState(0);
  const [showFilteredData, setShowFilteredData] = useState(false);

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
          {/* SearchBar */}
          <View style={searchBarStyle.container}>
            <View style={searchBarStyle.searchContainer}>
              <Image
                source={require('../../../assets/images/search.png')}
                style={searchBarStyle.searchIcon}
              />
              <TextInput
                placeholder="Search"
                selectionColor={colors.secondary}
                style={searchBarStyle.searchTextInput}
                onChangeText={(text) => setSearchText(text)}
              />
            </View>
            <TouchableOpacity style={searchBarStyle.filterButton} onPress={handleFilterButtonPress}>
              <Image
                source={require('../../../assets/images/filter.png')}
                style={searchBarStyle.filterIcon}
              />
            </TouchableOpacity>
          </View>

          <Overlay
            visible={showFilter}
            onClose={() => setShowFilter(false)}
            closeOnTouchOutside
            animationType="zoomIn"
            containerStyle={styles.overlayWrapper}
            childrenWrapperStyle={styles.filterOverlay}
          >
            {/* Filter popup */}
            <StyledContainer style={filterStyles.mainContainer}>
              <InnerContainer style={filterStyles.headerContainer}>
                <BigText style={{ fontSize: 30 }}>Filter</BigText>
              </InnerContainer>
              <InnerContainer style={filterStyles.cuisineContainer}>
                <RegularText style={filterStyles.subHeading}>Cuisine</RegularText>
                <SelectableChips
                  chipStyle={filterStyles.chipContainer}
                  valueStyle={filterStyles.chipValue}
                  chipStyleSelected={filterStyles.chipSelectedContainer}
                  valueStyleSelected={filterStyles.chipSelectedValue}
                  initialChips={[
                    'Chinese',
                    'Japanese',
                    'Korean',
                    'Thai',
                    'Western',
                    'Indian',
                    'Malay',
                    'Taiwanese',
                  ]}
                  onChangeChips={(chips) => setCuisines(chips)}
                  alertRequired={false}
                />
              </InnerContainer>
              <InnerContainer style={filterStyles.sliderContainer}>
                <InnerContainer style={filterStyles.sliderHeader}>
                  <RegularText style={filterStyles.subHeadingRow}>Price</RegularText>
                  <RegularText>&lt; ${priceEnd}</RegularText>
                </InnerContainer>
                <Slider
                  onValueChange={(value) => setPriceEnd(value)}
                  minimumValue={0}
                  maximumValue={50}
                  step={2}
                  style={filterStyles.slider}
                />
              </InnerContainer>

              {/* {filterData(searchText, cuisines)} */}

              <InnerContainer style={filterStyles.sliderContainer}>
                <InnerContainer style={filterStyles.sliderHeader}>
                  <RegularText style={filterStyles.subHeadingRow}>Distance</RegularText>
                  <RegularText>
                    &lt; {distance >= 1000 ? distance / 1000 + ' km' : distance + ' m'}{' '}
                  </RegularText>
                </InnerContainer>
                <Slider
                  onValueChange={(value) => setDistance(value)}
                  minimumValue={0}
                  maximumValue={3000}
                  step={100}
                  style={filterStyles.slider}
                />
              </InnerContainer>
              <RegularButton style={filterStyles.applyButton} onPress={applyFilter}>
                <RegularText style={filterStyles.applyButtonText}>Apply</RegularText>
              </RegularButton>
              <RegularButton style={filterStyles.applyButton} onPress={clearFilter}>
                <RegularText style={filterStyles.applyButtonText}>Clear</RegularText>
              </RegularButton>
            </StyledContainer>
          </Overlay>

          <RegularText style={{ fontSize: 22, alignSelf: 'flex-start', marginVertical: 5 }}>
            {showFilteredData ? 'Matching dishes' : 'Popular Near You'}
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
            maxHeight={145}
            marginBottom={10}
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

const searchBarStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    // backgroundColor: '#e71837'
  },
  searchContainer: {
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
    width: 20,
    height: 20,
    tintColor: colors.secondary,
  },
  filterButton: {
    // backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  searchTextInput: {
    flex: 1,
    // backgroundColor: '#fed34a', // turquoise
  },
});

const filterStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: '#ffc',
    borderRadius: 25,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  cuisineContainer: {
    flex: 1,
    // alignItems: "flex-start",
    justifyContent: 'flex-start',
    // backgroundColor: "#ac3",
    maxHeight: 160,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 50,
    // backgroundColor: "#ffcdcc",
  },
  sliderContainer: {
    flex: 1,
    maxHeight: 80,
    // backgroundColor: '#cff',
  },
  sliderHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#aaf',
  },
  subHeading: {
    alignSelf: 'flex-start',
    marginVertical: 5,
    // backgroundColor: '#ffc',
  },
  subHeadingRow: {
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  chipContainer: {
    maxHeight: 30,
    padding: 2,
    borderColor: colors.primary,
  },
  chipValue: {
    fontSize: 14,
    color: colors.primary,
  },
  chipSelectedContainer: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipSelectedValue: {
    color: colors.white,
    fontSize: 14,
  },
  slider: {
    flex: 1,
    width: '100%',
    // width: 200,
    // backgroundColor: "#23ada4",
  },
  applyButton: {
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: colors.primary,
  },
  applyButtonText: {
    color: colors.bg,
    fontSize: 19,
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
