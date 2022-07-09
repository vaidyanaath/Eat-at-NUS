import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StyledContainer } from './containers/StyledContainer';
import { InnerContainer } from './containers/InnerContainer';
import { RegularButton } from './buttons/RegularButton';
import { RegularText } from './texts/RegularText';
import { BigText } from './texts/BigText';

import SelectableChips from 'react-native-chip/SelectableChips';
import Slider from 'react-native-slider';
import { colors } from '../assets/colors';
import { SmallText } from './texts/SmallText';

export const FilterSection = () => {
  const [priceEnd, setPriceEnd] = React.useState(0);
  const [distance, setDistance] = React.useState(0);

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
      <InnerContainer style={styles.sliderContainer}>
        <InnerContainer style={styles.sliderHeader}>
          <RegularText style={styles.subHeadingRow}>Price</RegularText>
          <RegularText>&lt; ${priceEnd}</RegularText>
        </InnerContainer>
        <Slider
          onValueChange={(value) => setPriceEnd(value)}
          minimumValue={0}
          maximumValue={50}
          step={2}
          style={styles.slider}
        />
      </InnerContainer>

      <InnerContainer style={styles.sliderContainer}>
        <InnerContainer style={styles.sliderHeader}>
          <RegularText style={styles.subHeadingRow}>Distance</RegularText>
          <RegularText>&lt; {distance} m</RegularText>
        </InnerContainer>
        <Slider
          onValueChange={(value) => setDistance(value)}
          minimumValue={0}
          maximumValue={3000}
          step={100}
          style={styles.slider}
        />
      </InnerContainer>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: '#ffc',
    borderRadius: 25,
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
  },
  cuisineContainer: {
    flex: 1,
    // alignItems: "flex-start",
    justifyContent: 'flex-start',
    // backgroundColor: "#ac3",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 60,
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
  },
  subHeading: {
    alignSelf: 'flex-start',
    marginVertical: 5,
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
    width: "100%",
    // width: 200,
    // backgroundColor: "#23ada4",
  },

});
