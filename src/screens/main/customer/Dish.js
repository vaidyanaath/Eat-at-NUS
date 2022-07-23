import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { InnerContainer } from '../../../components/containers/InnerContainer';
import { StyledContainer } from '../../../components/containers/StyledContainer';

import { colors } from '../../../assets/colors';
import { BigText } from '../../../components/texts/BigText';
import { RegularText } from '../../../components/texts/RegularText';

import { FontAwesome, FontAwesome5, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { SmallText } from '../../../components/texts/SmallText';

// Import Database
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase/config';

const Dish = ({ navigation, route }) => {
  const dishID = route.params.dishID;
  const DISH_PLACEHOLDER = 'https://cdn-icons-png.flaticon.com/512/857/857681.png';

  // Fetch dish data
  const [dishData, setDishData] = useState(null);

  useEffect(() => {
    const reference = ref(db, 'dishes/' + dishID);
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      setDishData(data);
    });

    return () => {
      setDishData(null);
    };
  }, [db]);

  return (
    dishData && (
      <StyledContainer style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

        <InnerContainer style={styles.topContainer}>
          <InnerContainer style={styles.namePriceContainer}>
            <RegularText style={styles.name}>{dishData.name}</RegularText>
            <BigText style={styles.price}>$ {dishData.price}</BigText>
          </InnerContainer>

          <TouchableOpacity
            style={styles.reviewIconButton}
            onPress={() =>
              navigation.navigate('Review', {
                dishID: dishID,
                dishName: dishData.name,
                dishRating: dishData.rating,
                userType: 'customer',
              })
            }
          >
            <MaterialCommunityIcons name="comment-text-outline" size={24} color="black" />
          </TouchableOpacity>
        </InnerContainer>

        <InnerContainer style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: dishData.imageURL ? dishData.imageURL : DISH_PLACEHOLDER }}
          />
        </InnerContainer>

        <ScrollView style={{ flex: 1 }}>
          <InnerContainer style={styles.section}>
            <View flex={1} flexDirection="row" paddingHorizontal={10} alignItems="center">
              {dishData.availability == true ? (
                <FontAwesome name="check-circle" size={22} color="green" />
              ) : (
                <Entypo name="circle-with-cross" size={22} color="red" />
              )}
              {dishData.availability == true ? (
                <RegularText style={styles.sectionText}>Available</RegularText>
              ) : (
                <RegularText style={styles.sectionText}>Not Available</RegularText>
              )}
            </View>

            <View
              flex={1}
              flexDirection="row"
              paddingHorizontal={10}
              marginHorizontal={10}
              alignItems="center"
            >
              <FontAwesome5 name="fire-alt" size={20} color={colors.primary} />
              <RegularText style={styles.sectionText}>{dishData.calories} kcal</RegularText>
            </View>

            <View style={styles.ratingBG}>
              <Text style={styles.stallRating}>{dishData.rating}</Text>
            </View>
          </InnerContainer>

          <InnerContainer style={{ marginBottom: 15 }}>
            <SmallText style={{ fontSize: 16 }}>{dishData.description}</SmallText>
          </InnerContainer>
          <RegularText style={{ marginVertical: 5, fontSize: 20, paddingHorizontal: 10 }}>
            Contains allergens:{' '}
          </RegularText>
          <InnerContainer
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
            }}
          >
            <SmallText>{dishData.allergenInfo}</SmallText>
          </InnerContainer>
        </ScrollView>
      </StyledContainer>
    )
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: colors.primary,
    paddingTop: 0,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 0,
    marginTop: 0,
  },
  imageContainer: {
    flex: 1,
    // backgroundColor: "#343a40",
    width: '100%',
    height: '100%',
    borderRadius: 25,
    marginBottom: 20,
    height: 150,
  },
  image: {
    flex: 1,
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    maxHeight: 95,
    // backgroundColor: "#34adaa",
    marginBottom: 10,
  },
  namePriceContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 30,
    marginBottom: 5,
  },
  price: {
    color: colors.primary,
  },
  reviewIconButton: {
    maxWidth: 40,
    maxHeight: 40,
    tintColor: colors.secondary,
    marginTop: 10,
    // backgroundColor: "#810cc2",
  },
  section: {
    flex: 1,
    width: 260,
    // backgroundColor: "#2ca",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  sectionText: {
    marginHorizontal: 5,
    fontSize: 15,
  },
  stallRating: {
    fontSize: 15,
  },
  ratingBG: {
    maxWidth: 30,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 4,
    borderRadius: 3,
    backgroundColor: '#FFB81C',
  },
});

export default Dish;
