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

import { Feather, FontAwesome, FontAwesome5, Entypo } from '@expo/vector-icons';
import { SmallText } from '../../../components/texts/SmallText';

// Import Database
import { ref, onValue } from 'firebase/database';
import { db, auth } from '../../../firebase/config';

import retrieveDishImage from '../../../firebase/RetrieveDishImage';

const StallOwnerDish = ({ navigation, route }) => {
  const dishID = route.params.dishID;
  const user = auth.currentUser;

  // Fetch dish data
  const [dishData, setDishData] = useState(null);

  useEffect(() => {
    const reference = ref(db, 'dishes/' + dishID);
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      setDishData(data);
    });
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
            style={styles.editIconButton}
            onPress={() => navigation.navigate('StallOwnerEditDish', { dishID: dishID })}
          >
            <Feather name="edit-2" size={16} color={colors.secondary}/>
          </TouchableOpacity>
        </InnerContainer>

        <InnerContainer style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: retrieveDishImage(user.uid, dishID).url }} />
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
          <RegularText style={{ marginTop: 5, marginBottom: 10, fontSize: 20, }}>Contains allergens: </RegularText>
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
  editIconButton: {
    minWidth: 30,
    minHeight: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.primary,
    borderWidth: 2,
    // backgroundColor: colors.secondary,
    marginTop: 7,
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
});

export default StallOwnerDish;
