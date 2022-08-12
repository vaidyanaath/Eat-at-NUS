import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';

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
import LoadingScreen from '../../../components/screens/LoadingScreen';

const StallOwnerHome = ({ navigation }) => {
  const user = auth.currentUser;
  const stallID = user.uid;

  const AVATAR =
    'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';

  const [stallData, setStallData] = useState(null);
  const [dishesMetadataArr, setDishesMetadataArr] = useState(null);

  const handleProfileButtonPress = () => {
    navigation.navigate('Profile');
  };

  // Fetch stall data
  useEffect(() => {
    const reference = ref(db, 'stalls/' + stallID);
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      setStallData(data);
    });

    return () => {
      setStallData(null);
    };
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
    };
  }, [db]);

  if (!(user && stallData && dishesMetadataArr)) {
    return <LoadingScreen />;
  }

  return (
    <StyledContainer style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

      <InnerContainer style={styles.header}>
        <RegularText style={styles.greeting}>My Stall:</RegularText>
        {/* Profile Button */}
        <TouchableOpacity
          onPress={handleProfileButtonPress}
          backgroundColor={colors.black}
          style={styles.profilePic}
        >
          <Image style={styles.profilePic} source={{ uri: AVATAR }} />
        </TouchableOpacity>
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
        <InnerContainer
          style={{
            flex: 1,
            minHeight: 60,
            flexDirection: 'row',
            justifyContent: 'space-between',
            // backgroundColor: '#2ff3',
          }}
        >
          <RegularText style={{ fontSize: 25 }}>Dishes</RegularText>
          <RegularButton
            onPress={() => navigation.navigate('StallOwnerAddDish')}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: colors.primary,
              // maxHeight: 30,
              maxWidth: 90,
              // borderRadius: 30,
              paddingTop: 0,
              paddingBottom: 0,
            }}
          >
            <SmallText style={{ color: colors.white }}>Add Dish</SmallText>
            <RegularText style={{ color: colors.white }}>+</RegularText>
          </RegularButton>
        </InnerContainer>

        <FlatList
          data={dishesMetadataArr}
          renderItem={({ item }) => (
            <ListContainer
              photo={item.imageURL}
              onPress={() => navigation.navigate('StallOwnerDish', { dishID: item.id })}
              content={dishContent(item)}
            />
          )}
          style={styles.discoverList}
          // ListHeaderComponent={addDishFooter}
          showsVerticalScrollIndicator={false}
          vertical={true}
        />
      </InnerContainer>
    </StyledContainer>
  );
};

// Content in each dish item
const dishContent = (item) => {
  return (
    item && (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={cardStyles.textContainer}>
          <RegularText style={cardStyles.dishName}>{item.name}</RegularText>
          <RegularText style={cardStyles.dishPrice}>$ {item.price}</RegularText>
        </View>
        <View style={cardStyles.ratingContainer}>
          <View style={cardStyles.ratingBG}>
            <Text style={cardStyles.stallRating}>{item.rating}</Text>
          </View>
          <SwitchToggle
            switchOn={item.availability}
            onPress={() => {
              setDishAvailability(auth.currentUser.uid, item.id, !item.availability);
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
    )
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
    fontSize: 18,
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
    fontSize: 18,
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
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  body: {
    paddingHorizontal: 10,
    marginBottom: 10,
    // backgroundColor: "#ff2"
  },
  discoverList: {
    width: '100%',
    // backgroundColor: "#369963"
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
