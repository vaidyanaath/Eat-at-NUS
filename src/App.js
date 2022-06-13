// import fonts
import {
  useFonts,
  SourceSansPro_300Light,
  SourceSansPro_400Regular,
  SourceSansPro_600SemiBold,
  SourceSansPro_700Bold,
} from '@expo-google-fonts/source-sans-pro';

// import screens
import Landing from './screens/auth/Landing';

// set app.js as entrypoint
import { registerRootComponent } from 'expo';

const App = () => {
  let [fontsLoaded] = useFonts({
    SourceSansPro_300Light,
    SourceSansPro_400Regular,
    SourceSansPro_600SemiBold,
    SourceSansPro_700Bold,
  });
  if (!fontsLoaded) {
    console.log("Loading..."); // @TODO use splash screen async
  }

  return (
    <Landing />
  );
}
export default registerRootComponent(App);

