import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StyledContainer } from './containers/StyledContainer';
import { InnerContainer } from './containers/InnerContainer';
import { RegularButton } from './buttons/RegularButton';
import { RegularText } from './texts/RegularText';
import { BigText } from './texts/BigText';

import SelectableChips from 'react-native-chip/SelectableChips';
import { colors } from '../assets/colors';
import { SmallText } from './texts/SmallText';

export const FilterSection = () => {
  const handleApplyFilter = () => {
    console.log('Apply filter button pressed!');
  };

  return (
    <StyledContainer style={styles.mainContainer}>
      <InnerContainer style={styles.headerContainer}>
        <BigText style={{ fontSize: 30 }}>Filter</BigText>
      </InnerContainer>
      <InnerContainer style={styles.cuisineContainer}>
        <RegularText style={styles.subHeading}>Cuisine</RegularText>
        <SelectableChips
          chipStyle={styles.chipContainer}
          valueStyle={styles.chipValue}
          chipStyleSelected={styles.chipSelectedContainer}
          valueStyleSelected={styles.chipSelectedValue}
          initialChips={[
            'Chinese',
            'Japanese',
            'Korean',
            'Thai',
            'Western',
            'Indian',
            'Malay',
            'Taiwanese',
          ]}
          onChangeChips={(chips) => console.log(chips)}
          alertRequired={false}
        />
      </InnerContainer>

      {/* Apply Button */}
      <RegularButton style={styles.applyButton} onPress={handleApplyFilter}>
        <RegularText style={styles.applyButtonText}>Apply</RegularText>
      </RegularButton>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: '#ffc',
    borderRadius: 25,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  cuisineContainer: {
    flex: 1,
    // alignItems: "flex-start",
    justifyContent: 'flex-start',
    // backgroundColor: "#ac3",
    maxHeight: 160,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 50,
    // backgroundColor: "#ffcdcc",
  },
  sliderContainer: {
    flex: 1,
    maxHeight: 80,
    // backgroundColor: '#cff',
  },
  sliderHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#aaf',
  },
  subHeading: {
    alignSelf: 'flex-start',
    marginVertical: 5,
    // backgroundColor: '#ffc',
  },
  subHeadingRow: {
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  chipContainer: {
    maxHeight: 30,
    padding: 2,
    borderColor: colors.primary,
  },
  chipValue: {
    fontSize: 14,
    color: colors.primary,
  },
  chipSelectedContainer: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipSelectedValue: {
    color: colors.white,
    fontSize: 14,
  },
  slider: {
    flex: 1,
    width: '100%',
    // width: 200,
    // backgroundColor: "#23ada4",
  },
  applyButton: {
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: colors.secondary,
  },
  applyButtonText: {
    color: colors.bg,
    fontSize: 19,
  },
});
