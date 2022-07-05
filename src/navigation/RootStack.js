import React, { useState, useEffect } from 'react';

// import navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import components
import { ProfileButton } from '../components/buttons/ProfileButton';

// import colors
import { colors } from '../assets/colors';

// import screens
import Landing from '../screens/auth/Landing';
import CustomerSignIn from '../screens/auth/CustomerSignIn';
import Home from '../screens/main/customer/Home';
import CustomerSignUp from '../screens/auth/CustomerSignUp';
import Stall from '../screens/main/customer/Stall';
import Dish from '../screens/main/customer/Dish';
import FoodStallOwnerSignIn from '../screens/auth/FoodStallOwnerSignIn';
import StallOwnerHome from '../screens/main/foodStallOwner/StallOwnerHome';

// import auth
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

const RootStack = () => {
  const Stack = createNativeStackNavigator();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
        console.log('Signed in');
        console.log(user.displayName);
      } else {
        setIsSignedIn(false);
        console.log('Signed out');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.bg,
            borderBottomWidth: 0,
            // shadowColor: "transparent",

            height: 120,
          },
          headerRight: () => (isSignedIn ? <ProfileButton /> : null),
          headerShadowVisible: false,
          headerTintColor: colors.secondary,
          headerRightContainerStyle: {
            paddingRight: 25,
          },
          headerLeftContainerStyle: {
            paddingLeft: 25,
          },
        }}
      >
        {isSignedIn ? (
          auth.currentUser.type == 'customer' ? (
            <>
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
              <Stack.Screen
                name="Stall"
                component={Stall}
                options={({ route }) => ({ title: route.params.stallID.name })}
              />
              <Stack.Screen name="Dish" component={Dish} options={{ title: null }} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="StallOwnerHome"
                component={StallOwnerHome}
                options={{ headerShown: false }}
              />
            </>
          )
        ) : (
          <>
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{ headerShown: false, animationTypeForReplace: isSignedIn ? 'push' : 'pop' }}
            />
            <Stack.Screen
              name="CustomerSignIn"
              component={CustomerSignIn}
              options={{ title: null }}
            />
            <Stack.Screen
              name="CustomerSignUp"
              component={CustomerSignUp}
              options={{ title: null }}
            />
            <Stack.Screen
              name="FoodStallOwnerSignIn"
              component={FoodStallOwnerSignIn}
              options={{ title: null }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
