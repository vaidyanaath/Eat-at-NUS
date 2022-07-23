import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { InnerContainer } from '../../../components/containers/InnerContainer';
import { StyledContainer } from '../../../components/containers/StyledContainer';
import { RegularButton } from '../../../components/buttons/RegularButton';

import { colors } from '../../../assets/colors';
import { BigText } from '../../../components/texts/BigText';
import { RegularText } from '../../../components/texts/RegularText';

import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { SmallText } from '../../../components/texts/SmallText';

// Import Database
import { ref, onValue } from 'firebase/database';
import { db, auth } from '../../../firebase/config';

import retrieveDishImage from '../../../firebase/RetrieveDishImage';
import deleteDish from '../../../firebase/DeleteDish';

const StallOwnerDish = ({ navigation, route }) => {
  const dishID = route.params.dishID;
  const user = auth.currentUser;
  const DISH_PLACEHOLDER = 'https://cdn-icons-png.flaticon.com/512/857/857681.png';

  const [dishData, setDishData] = useState(null);
  const [dishImage, setDishImage] = useState(null);

  // Fetch dish image
  // const image = retrieveDishImage(user.uid, dishID);
  // setDishImage(image.url);

  // Fetch dish data
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

  const handleEditDish = () => {
    navigation.navigate('StallOwnerEditDish', { dishID: dishID });
  };

  const handleNotify = () => {};

  const handleDeleteDish = () => {
    Alert.alert('Delete Dish', 'Are you sure you want to delete ' + dishData.name + '?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteDish(user.uid, dishID);
          // react state cleanup
          setDishData(null);
          navigation.navigate('StallOwnerHome');
        },
      },
    ]);
  };

  return (
    dishData && (
      <StyledContainer style={styles.mainContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />

        <InnerContainer style={styles.topContainer}>
          <InnerContainer style={styles.namePriceContainer}>
            <RegularText style={styles.name}>{dishData.name}</RegularText>
            <BigText style={styles.price}>$ {dishData.price}</BigText>
          </InnerContainer>

          <InnerContainer style={styles.iconButtonsContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() =>
                navigation.navigate('Review', {
                  dishID: dishID,
                  dishName: dishData.name,
                  dishRating: dishData.rating,
                  userType: 'stallOwner',
                })
              }
            >
              <MaterialCommunityIcons
                name="comment-text-outline"
                size={24}
                color={colors.secondary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleDeleteDish}>
              <Feather name="trash-2" size={24} color={colors.secondary} />
            </TouchableOpacity>
          </InnerContainer>
        </InnerContainer>

        <InnerContainer style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: dishData.imageURL ? dishData.imageURL : DISH_PLACEHOLDER }}
          />
        </InnerContainer>
        <ScrollView style={{ flex: 1 }}>
          <InnerContainer style={styles.section}>
            <View flex={1} flexDirection="row" alignItems="center">
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
          <InnerContainer style={{ marginBottom: 10, alignItems: 'flex-start' }}>
            <RegularText style={{ paddingHorizontal: 10, fontSize: 20 }}>
              Contains allergens:{' '}
            </RegularText>
          </InnerContainer>
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
          <InnerContainer style={styles.buttonContainer}>
            <RegularButton style={styles.notifyButton} onPress={handleNotify}>
            <Ionicons name="notifications" size={24} color="black" />
            </RegularButton>
            <RegularButton style={styles.editButton} onPress={handleEditDish}>
              <RegularText style={styles.buttonText}>Edit Dish</RegularText>
            </RegularButton>
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
    alignItems: 'center',
    maxHeight: 95,
    // backgroundColor: "#34adaa",
    marginBottom: 10,
  },
  namePriceContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '100%',
    // backgroundColor: '#8c84c1',
  },
  iconButtonsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    maxWidth: 30,
    height: '80%',
    // backgroundColor: "#99636a"
  },
  name: {
    fontSize: 30,
    marginBottom: 5,
  },
  price: {
    color: colors.primary,
  },
  iconButton: {
    minWidth: 30,
    minHeight: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 30,
    // borderColor: colors.primary,
    // borderWidth: 2,
    // backgroundColor: '#42faac',
  },
  section: {
    flex: 1,
    maxWidth: '95%',
    // backgroundColor: "#2ca",
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  sectionText: {
    marginHorizontal: 5,
    fontSize: 15,
  },
  stallRating: {
    alignSelf: 'center',
    fontSize: 15,
  },
  ratingBG: {
    maxWidth: 30,
    flex: 1,
    paddingHorizontal: 4,
    borderRadius: 3,
    backgroundColor: '#FFB81C',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    // paddingHorizontal: 5,
    alignSelf: 'center',
    width: '95%',
    marginTop: 40,
    // backgroundColor: '#288BA8',
  },
  notifyButton: {
    borderWidth: 1,
    borderColor: colors.secondary,
    // flex: 1,
  },
  editButton: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: colors.bg,
  },
});

export default StallOwnerDish;
