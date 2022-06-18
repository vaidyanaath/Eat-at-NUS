import React from 'react';
import { StyleSheet, View, TextInput, Image, TouchableOpacity } from 'react-native';

import { colors } from '../assets/colors';

export const SearchBar = () => {
    return(
      <View style={searchBarStyle.container}>
        <View style={searchBarStyle.searchContainer}>
          <Image source={require('../assets/images/search.png')} style={searchBarStyle.searchIcon} />
          <TextInput placeholder='Search' selectionColor={colors.secondary} style={searchBarStyle.searchTextInput}/>
        </View>
        <TouchableOpacity style={searchBarStyle.filterButton}>
        <Image source={require('../assets/images/filter.png')} style={searchBarStyle.filterIcon} />
        </TouchableOpacity>
  
      </View>
    );
  };
  
  const searchBarStyle = StyleSheet.create({
    container: {
      flex: 1, 
      flexDirection: 'row',
      minHeight: 50, 
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      // backgroundColor: '#e71837'
    },
    searchContainer : {
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
      width: 18,
      height: 18,
      tintColor: colors.gray,
    },
    filterButton: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 10,
    },
    searchTextInput: {
      flex: 1,
      // backgroundColor: '#fed34a', // turquoise
    },
  
  });