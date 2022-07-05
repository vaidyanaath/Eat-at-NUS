import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, FlatList, Image } from 'react-native';

// import components
import { StyledContainer } from '../../../components/containers/StyledContainer';
import { SearchBar } from '../../../components/SearchBar';
import { ProfileButton } from '../../../components/buttons/ProfileButton';

// import colors
import { colors } from '../../../assets/colors';
import { InnerContainer } from '../../../components/containers/InnerContainer';

import { RegularText } from '../../../components/texts/RegularText';

import { ListContainer } from '../../../components/containers/ListContainer';
import { HorizontalListContainer } from '../../../components/containers/HorizontalListContainer';

import { auth } from '../../../firebase/config';

// Import Database
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebase/config';

const StallOwnerHome = ({ navigation }) => {
    return (
        <StyledContainer style={styles.mainContainer}>
            <RegularText> Food Stall Owner Home </RegularText>
        </StyledContainer>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
      paddingBottom: 0,
      paddingHorizontal: 30,
      paddingTop: 10,
      // alignItems: 'flex-start',
      backgroundColor: colors.bg, //"#ff234a",
    },
});

export default StallOwnerHome;
