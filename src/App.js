import React from 'react';

// import fonts
import { useFonts } from 'expo-font'

// import screens
import RootStack from "./navigation/RootStack";

// set app.js as entrypoint
import { registerRootComponent } from 'expo';

// import db
import { db } from './firebase/config';
import { ref, set } from "firebase/database";

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

  
  function writeData(stallId, cuisine, imageURL, name, rating) {
    const reference = ref(db, 'stallsMetadata/' + stallId);
    set(reference, {
      cuisine: cuisine,
      imageURL: imageURL,
      name: name,
      rating: rating,
    });
  }

  // writeData("Bhaiya khaana dedo", 
  //           "indian", 
  //           "https://cdn.pixabay.com/photo/2017/09/09/12/09/india-2731817_960_720.jpg",
  //           "Bhaiya khaana dedo",
  //           4);

  return(
    <RootStack />
  )


}
export default registerRootComponent(App);

