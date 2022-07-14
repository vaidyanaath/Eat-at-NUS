import React from 'react';

// import fonts
import { useFonts } from 'expo-font';

// import screens
import RootStack from './navigation/RootStack';

// set app.js as entrypoint
import { registerRootComponent } from 'expo';

const App = () => {
  let [loaded] = useFonts({
    'SourceSansPro-Light': require('./assets/fonts/SourceSansPro-Light.ttf'),
    'SourceSansPro-Regular': require('./assets/fonts/SourceSansPro-Regular.ttf'),
    'SourceSansPro-SemiBold': require('./assets/fonts/SourceSansPro-SemiBold.ttf'),
    'SourceSansPro-Bold': require('./assets/fonts/SourceSansPro-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return <RootStack />;
};

export default registerRootComponent(App);
