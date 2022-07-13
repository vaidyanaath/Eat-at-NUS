import React from 'react';

// import fonts
import { useFonts } from 'expo-font';

// import screens
import RootStack from './navigation/RootStack';

// set app.js as entrypoint
import { registerRootComponent } from 'expo';

// toast notifications
import { RootSiblingParent } from 'react-native-root-siblings';

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

  return (
    <RootSiblingParent>
      <RootStack />
    </RootSiblingParent>
  );
};
export default registerRootComponent(App);
