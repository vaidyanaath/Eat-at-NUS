import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/animations/loader.json')}
        style={styles.lottie}
        autoPlay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});

export default LoadingScreen;
