import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, FlatList, Image } from 'react-native';

// import components
import { StyledContainer } from '../../../components/containers/StyledContainer';
import { ListContainer } from '../../../components/containers/ListContainer';
import { ProfileButton } from '../../../components/buttons/ProfileButton';
import { RegularText } from '../../../components/texts/RegularText';

// import colors
import { colors } from '../../../assets/colors';
import { InnerContainer } from '../../../components/containers/InnerContainer';

// import icon
import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';

// get current user
import { auth } from '../../../firebase/config';

// Import Database
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase/config';

const StallOwnerHome = ({ navigation }) => {
  const user = auth.currentUser;
  const placeholderAvatar =
    'https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
  const avatar = user && user.photoURL ? user.photoURL : placeholderAvatar;

  // Fetch stall data
  const [stallData, setStallData] = useState(null);
  const stallID = 'Bhaiya khaana dedo';

  useEffect(() => {
    const reference = ref(db, 'stalls/' + stallID);
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      setStallData(data);
    }, {
      once: true
    });
  }, [db]);

  // Fetch dishes metadata
  const [dishesMetadataArr, setDishesMetadataArr] = useState([]);

  useEffect(() => {
    const reference = ref(db, 'dishesMetadata/' + stallID);
    onValue(reference, (snapshot) => {
        var items = [];
        snapshot.forEach((child) => {
            items.push({
                availability: child.val().availability,
                imageURL: child.val().imageURL,
                name: child.val().name,
                price: child.val().price,
                rating: child.val().rating,
            });
        });
        setDishesMetadataArr(items);
        console.log(dishesMetadataArr);
    });
    
  }, [db]);

  return (
    user &&
    stallData &&
    dishesMetadataArr && 
    (
      <StyledContainer style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

        <InnerContainer style={styles.header}>
          <RegularText style={styles.greeting}>My Stall:</RegularText>

          <ProfileButton source={{ uri: avatar }} />
        </InnerContainer>

        <InnerContainer style={styles.stallInfo}>
          <View style={styles.nameSection}>
            <RegularText style={styles.name}>{stallID}</RegularText>
            <View style={styles.ratingContainer}>
              <View style={styles.ratingBG}>
                <Text style={styles.stallRating}>{stallData.rating}</Text>
              </View>
            </View>
          </View>

          <RegularText style={styles.infoText}>{stallData.cuisine}</RegularText>
          <View style={styles.locationContainer}>
            <Ionicons name="ios-location-outline" size={24} color={colors.primary} />
            <RegularText style={styles.infoText}> {stallData.address}</RegularText>
          </View>
          <RegularText style={styles.infoText}>
            Hours: {stallData.openingTime} - {stallData.closingTime}
          </RegularText>
        </InnerContainer>

        <InnerContainer style={styles.body}>
          <RegularText style={{ fontSize: 25, marginBottom: 5, alignSelf: 'flex-start' }}>
            Dishes
          </RegularText>
          <FlatList
            data={dishesMetadataArr}
            renderItem={({ item }) => (
              <ListContainer
                photo={item.imageURL}
                onPress={() => {}}
                content={dishContent(item)}
              />
            )}
            style={styles.discoverList}
            ListFooterComponent={<View marginBottom={10}></View>}
            showsVerticalScrollIndicator={false}
            vertical={true}
          />
        </InnerContainer>
      </StyledContainer>
    )
  );
};

// Content in each dish item
const dishContent = (item) => (
  <View style={{ flex: 1, flexDirection: 'row' }}>
    <View style={cardStyles.textContainer}>
      <RegularText style={cardStyles.dishName}>{item.name}</RegularText>
      <RegularText style={cardStyles.stallDistance}>S$ {item.price}</RegularText>
    </View>
    <View style={cardStyles.ratingContainer}>
      <View style={cardStyles.ratingBG}>
        <Text style={cardStyles.stallRating}>{item.rating}</Text>
      </View>
      {item.availability == true ? (
        <FontAwesome name="check-circle" size={20} color="green" />
      ) : (
        <Entypo name="circle-with-cross" size={20} color="red" />
      )}
    </View>
  </View>
);

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
    paddingHorizontal: 10,
    // alignItems: 'center',
    // paddingBottom: 0,
    // paddingHorizontal: 50,
    paddingTop: 5,
    // alignItems: 'flex-start',
    // backgroundColor: '#ff234a',
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
    paddingLeft: 20,
    fontWeight: 'bold',
  },
  stallInfo: {
    flex: 1,
    maxHeight: '20%',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 25,
    width: '95%',
    marginBottom: 20,
    alignItems: 'flex-start',
    alignSelf: 'center',
    backgroundColor: colors.bg, //"#fa2",
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
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
  body: {
    paddingHorizontal: 10,
    // backgroundColor: "#ff2"
  },
});

export default StallOwnerHome;
