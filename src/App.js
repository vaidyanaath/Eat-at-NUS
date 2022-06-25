import React from 'react';

// import fonts
import { useFonts } from 'expo-font'

// import screens
import RootStack from "./navigation/RootStack";
import Dish from './screens/main/customer/Dish';
import Home from './screens/main/customer/Home';

// set app.js as entrypoint
import { registerRootComponent } from 'expo';

const App = () => {
  let [loaded] = useFonts({
    "SourceSansPro-Light": require("./assets/fonts/SourceSansPro-Light.ttf"),
    "SourceSansPro-Regular": require("./assets/fonts/SourceSansPro-Regular.ttf"),
    "SourceSansPro-SemiBold": require("./assets/fonts/SourceSansPro-SemiBold.ttf"),
    "SourceSansPro-Bold": require("./assets/fonts/SourceSansPro-Bold.ttf"),
  });
  
  if (!loaded) {
    return null;
  }

  return(
    <Home />
  )


}
export default registerRootComponent(App);