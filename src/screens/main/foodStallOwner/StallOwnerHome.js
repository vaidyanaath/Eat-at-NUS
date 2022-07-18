import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

// import components
import { StyledContainer } from '../../../components/containers/StyledContainer';
import { InnerContainer } from '../../../components/containers/InnerContainer';
import { ListContainer } from '../../../components/containers/ListContainer';
import { RegularText } from '../../../components/texts/RegularText';
import { SmallText } from '../../../components/texts/SmallText';
import { ProfileButton } from '../../../components/buttons/ProfileButton';
import { RegularButton } from '../../../components/buttons/RegularButton';

import SwitchToggle from 'react-native-switch-toggle';

// import colors
import { colors } from '../../../assets/colors';

// import icon
import { Ionicons, Feather } from '@expo/vector-icons';

// get current user
import { auth } from '../../../firebase/config';

// Import Database
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase/config';

import setDishAvailability from '../../../firebase/SetDishAvailability';

const StallOwnerHome = ({ navigation }) => {
  const user = auth.currentUser;
  const stallID = user.uid; //'Bhaiya khaana dedo';

  const placeholderAvatar =
    'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
  const avatar = user && user.photoURL ? user.photoURL : placeholderAvatar;

  const [stallData, setStallData] = useState(null);
  const [dishesMetadataArr, setDishesMetadataArr] = useState(null);
  const DISH_PLACEHOLDER = "https://cdn-icons-png.flaticon.com/512/857/857681.png";

  // Fetch stall data
  useEffect(() => {
    const reference = ref(db, 'stalls/' + stallID);
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      setStallData(data);
    });

    return () => {
      setStallData(null);
    }
  }, [db]);

  // Fetch dishes metadata
  useEffect(() => {
    const reference = ref(db, 'dishesMetadata/' + stallID);
    onValue(reference, (snapshot) => {
      var items = [];
      snapshot.forEach((child) => {
        items.push({
          id: child.key,
          availability: child.val().availability,
          imageURL: child.val().imageURL,
          name: child.val().name,
          price: child.val().price,
          rating: child.val().rating,
        });
      });
      setDishesMetadataArr(items);
    });

    return () => {
      setDishesMetadataArr(null);
    }
  }, [db]);

  // Add dish footer
  const addDishFooter = () => {
    return (
      <InnerContainer
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 15,
          paddingHorizontal: 20,
        }}
      >
        <SmallText style={{ flex: 1 }}></SmallText>
        <SmallText style={{ flex: 4, justifyContent: 'center' }}>
          Click '+' to add a new dish
        </SmallText>
        <RegularButton
          onPress={() => navigation.navigate('StallOwnerAddDish')}
          style={{
            flex: 1,
            backgroundColor: colors.primary,
            maxHeight: 30,
            maxWidth: 30,
            borderRadius: 30,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <RegularText style={{ color: colors.white }}>+</RegularText>
        </RegularButton>
      </InnerContainer>
    );
  };

  return (
    user &&
    stallData &&
    dishesMetadataArr && ( // Load data before rendering
      <StyledContainer style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

        <InnerContainer style={styles.header}>
          <RegularText style={styles.greeting}>My Stall:</RegularText>
          <ProfileButton source={{ uri: avatar }} />
        </InnerContainer>

        <InnerContainer style={styles.stallInfo}>
          <View style={styles.leftSection}>
            <View style={styles.nameSection}>
              <RegularText style={styles.name}>{stallData.name}</RegularText>
            </View>

            <RegularText style={styles.infoText}>{stallData.cuisine}</RegularText>
            <View style={styles.locationContainer}>
              <Ionicons name="ios-location-outline" size={24} color={colors.primary} />
              <RegularText style={styles.infoText}> {stallData.address}</RegularText>
            </View>
            <RegularText style={styles.infoText}>
              Hours: {stallData.openingTime} - {stallData.closingTime}
            </RegularText>
          </View>

          <View style={styles.rightSection}>
            <TouchableOpacity
              style={styles.editIconButton}
              onPress={() => navigation.navigate('StallOwnerEditStall')}
            >
              <Feather name="edit-2" size={20} color={colors.secondary} />
            </TouchableOpacity>

            <View style={styles.ratingContainer}>
              <View style={styles.ratingBG}>
                <Text style={styles.stallRating}>{stallData.rating}</Text>
              </View>
            </View>
          </View>
        </InnerContainer>

        <InnerContainer style={styles.body}>
          <RegularText style={{ fontSize: 25, marginBottom: 5, alignSelf: 'flex-start' }}>
            Dishes
          </RegularText>
          <FlatList
            data={dishesMetadataArr}
            renderItem={({ item }) => (
              <ListContainer
                photo={item.imageURL ? item.imageURL : DISH_PLACEHOLDER}
                onPress={() => 
                  navigation.navigate('StallOwnerDish', { dishID: item.id })
                }
                content={dishContent(item)}
              />
            )}
            style={styles.discoverList}
            ListFooterComponent={addDishFooter}
            showsVerticalScrollIndicator={false}
            vertical={true}
          />
        </InnerContainer>
      </StyledContainer>
    )
  );
};

// Content in each dish item
const dishContent = (item) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={cardStyles.textContainer}>
        <RegularText style={cardStyles.dishName}>{item.name}</RegularText>
        <RegularText style={cardStyles.stallDistance}>$ {item.price}</RegularText>
      </View>
      <View style={cardStyles.ratingContainer}>
        <View style={cardStyles.ratingBG}>
          <Text style={cardStyles.stallRating}>{item.rating}</Text>
        </View>
        <SwitchToggle
          switchOn={item.availability}
          onPress={() => {
            if (item) {
              setDishAvailability(auth.currentUser.uid, item.id, !item.availability)
            }
          }}
          circleColorOff="#ffffff"
          circleColorOn="#ffffff"
          backgroundColorOn="green"
          backgroundColorOff="#D21F3C"
          containerStyle={{
            marginTop: 0,
            width: 35,
            height: 20,
            borderRadius: 25,
            padding: 5,
          }}
          circleStyle={{
            width: 13,
            height: 13,
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  textContainer: {
    flex: 1,
    maxWidth: 110,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingVertical: 10,
    // backgroundColor: "#abcdef",
  },
  dishName: {
    fontSize: 19,
  },
  ratingContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    // backgroundColor: "#23af"
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
    minWidth: 28,
    alignItems: 'center',
    backgroundColor: '#FFB81C',
  },
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: 0,
    paddingHorizontal: 10,
    paddingTop: 5,
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
  },
  greeting: {
    paddingLeft: 15,
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
    flexDirection: 'row',
    maxHeight: '20%',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 25,
    maxWidth: '95%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bg, //"#fa2",
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  rightSection: {
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: "#f44",
    paddingVertical: 10,
  },
  nameSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxHeight: '25%',
    // backgroundColor: "#ae2",
  },
  name: {},
  locationContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
    maxHeight: 30,
    // backgroundColor: '#afaa'
  },
  infoText: {
    fontSize: 16,
    marginVertical: 1,
  },
  ratingContainer: {
    justifyContent: 'flex-start',
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

export default StallOwnerHome;
