import React, { useState } from 'react';

// import fonts
import useFonts from "./hooks/useFonts";

// import screens
import AppLoading from "expo-app-loading";
import Landing from './screens/auth/Landing';
import CustomerSignIn from './screens/auth/CustomerSignIn';

// set app.js as entrypoint
import { registerRootComponent } from 'expo';

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  const loadFonts = async () => {
    await useFonts();
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontLoaded(true)}
        onError={() => console.warn("Error loading fonts")}
      />
    );
  }

  return (
    <CustomerSignIn />
  );
}
export default registerRootComponent(App);

