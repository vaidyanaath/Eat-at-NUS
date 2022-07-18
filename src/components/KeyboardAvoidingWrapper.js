import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  View,
  Platform,
} from 'react-native';

export const KeyboardAvoidingWrapper = ({ children, style }) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      {/* <ScrollView contentContainerStyle={styles.scrollContainer}> */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={style}>{children}</View>
        </TouchableWithoutFeedback>
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
};

// create styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
});
