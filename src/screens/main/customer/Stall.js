import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, FlatList } from 'react-native';

// import components
import { StyledContainer } from '../../../components/containers/StyledContainer';
import { InnerContainer } from '../../../components/containers/InnerContainer';
import { ListContainer } from '../../../components/containers/ListContainer';
import { RegularText } from '../../../components/texts/RegularText';

// import colors
import { colors } from '../../../assets/colors';

// import icon
import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';

// Import Database
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase/config';

const Stall = ({ navigation, route }) => {
  const stallID = route.params.stall.id;

  // Fetch stall data
  const [stallData, setStallData] = useState(null);

  useEffect(() => {
    const reference = ref(db, 'stalls/' + stallID);
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      setStallData(data);
    });
  }, [db]);

  // Fetch dishes metadata
  const [dishesMetadataArr, setDishesMetadataArr] = useState(null);

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
  }, [db]);

  return (
    stallData &&
    dishesMetadataArr && ( // Load data before rendering
      <StyledContainer style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

        <InnerContainer style={styles.stallInfo}>
          <RegularText style={styles.infoText}>{stallData.cuisine}</RegularText>
          <View style={styles.locationContainer}>
            <Ionicons name="ios-location-outline" size={24} color={colors.primary} />
            <RegularText> {stallData.address}</RegularText>
          </View>
          <RegularText style={styles.infoText}>Opening Time: {stallData.openingTime}</RegularText>
          <RegularText style={styles.infoText}>Closing Time: {stallData.closingTime}</RegularText>
          <RegularText style={styles.infoText}>Stall Rating: {stallData.rating}/5</RegularText>
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
                onPress={() => navigation.navigate('Dish', { dishID: item.id })}
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
      <RegularText style={cardStyles.stallDistance}>$ {item.price}</RegularText>
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

export default Stall;
