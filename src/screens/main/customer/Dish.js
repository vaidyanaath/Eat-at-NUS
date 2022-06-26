import React, { useState, useEffect } from 'react';
import { View, Text, Image, StatusBar, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { InnerContainer } from '../../../components/containers/InnerContainer';
import { StyledContainer } from '../../../components/containers/StyledContainer';

import { colors } from '../../../assets/colors';
import { BigText } from '../../../components/texts/BigText';
import { RegularText } from '../../../components/texts/RegularText';

import { FontAwesome, FontAwesome5, Entypo } from '@expo/vector-icons';
import { SmallText } from '../../../components/texts/SmallText';

// Import Database
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase/config';

const Dish = ({ route }) => {
    const dishID = route.params.dishID;

    // Fetch dish data
    const [dishData, setDishData] = useState(null);

    useEffect(() => {
        const reference = ref(db, 'dishes/' + dishID);
        onValue(reference, (snapshot) => {
            const data = snapshot.val();
            setDishData(data);          
        });
    }, [setDishData]);

    return(
        dishData &&
        <StyledContainer style={styles.mainContainer} >
            <StatusBar barStyle="dark-content" backgroundColor={colors.bg}  />
            
            <InnerContainer style={styles.infoContainer}>
                <InnerContainer style={styles.topContainer}>
                    <InnerContainer style={styles.namePriceContainer}>
                    <RegularText style={styles.name}>{dishData.name}</RegularText>
                    <BigText style={styles.price}>S$ {dishData.price}</BigText>
                    </InnerContainer>
                    
                    <TouchableOpacity style={styles.heartIconButton}>
                        <Image source={require('../../../assets/images/heart.png')} style={styles.heartIcon} />
                    </TouchableOpacity>
                </InnerContainer>
                <InnerContainer style={styles.imageContainer}>
                    <Image style={styles.image} source={{ uri : dishData.imageURL }} />
                </InnerContainer>
                <ScrollView style={{flex: 1}}>
                    
                    <InnerContainer style={styles.section}>
                        <View flex={1} flexDirection='row' paddingHorizontal={10} alignItems='center'>
                        {dishData.availability == true 
                            ? <FontAwesome name="check-circle" size={22} color="green" /> 
                            : <Entypo name="circle-with-cross" size={22} color="red" />
                        }
                        {dishData.availability == true 
                            ? <RegularText style={styles.sectionText}>Available</RegularText>
                            : <RegularText style={styles.sectionText}>Not Available</RegularText>
                        }
                        </View>

                        <View flex={1} flexDirection='row' paddingHorizontal={10} marginHorizontal={10} alignItems='center'>
                            <FontAwesome5 name="fire-alt" size={20} color={colors.primary} />
                            <RegularText style={styles.sectionText}>{dishData.calories} kcal</RegularText>
                        </View>
                        
                        <View style={styles.ratingBG}>  
                            <Text style={styles.stallRating}>{dishData.rating}</Text>
                        </View>
                    </InnerContainer>

                    <InnerContainer style={{marginBottom: 15}}>
                        <SmallText style={{fontSize: 16}}>
                            {dishData.description}
                        </SmallText>
                    </InnerContainer>
                    <RegularText style={{marginVertical: 5,}}>Contains allergens: </RegularText>
                    <InnerContainer style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                        <SmallText>{dishData.allergenInfo}</SmallText>
                    </InnerContainer>
                </ScrollView>
            
            </InnerContainer>
        </StyledContainer>
    );

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // backgroundColor: colors.primary,
        paddingTop: 0,
        paddingLeft: 10,
        paddingRight: 10,
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
    infoContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 2,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 35,
        paddingTop: 20,
        backgroundColor: colors.bg,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        // borderColor: 'black',
        // borderWidth: 1,
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
        alignItems: 'flex-start'
    },
    name: {
        fontSize: 30,
        marginBottom: 5,
    },
    price: {
        color: colors.primary,
    },
    heartIconButton: {
        maxWidth: 40,
        maxHeight: 40,
        tintColor: colors.secondary,
    },
    heartIcon: {
        width: 40,
        height: 40,
        tintColor: colors.secondary,
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
        paddingHorizontal: 4,
        borderRadius: 3,
        backgroundColor: '#FFB81C',
    },

})

export default Dish;