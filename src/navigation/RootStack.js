import React, { useState, useEffect } from 'react';

// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// colors
import { colors } from '../assets/colors';

// screens
import LoadingScreen from '../components/screens/LoadingScreen';
import Profile from '../screens/main/Profile';

import Landing from '../screens/auth/Landing';
import CustomerSignIn from '../screens/auth/CustomerSignIn';
import CustomerSignUp from '../screens/auth/CustomerSignUp';
import Home from '../screens/main/customer/Home';
import Stall from '../screens/main/customer/Stall';
import Dish from '../screens/main/customer/Dish';
import Review from '../screens/main/customer/Review';
import WriteReview from '../screens/main/customer/WriteReview';

import FoodStallOwnerSignIn from '../screens/auth/FoodStallOwnerSignIn';
import FoodStallOwnerSignUp from '../screens/auth/FoodStallOwnerSignUp';
import FoodStallOwnerRegisterStall from '../screens/auth/FoodStallOwnerRegisterStall';
import StallOwnerHome from '../screens/main/foodStallOwner/StallOwnerHome';
import StallOwnerDish from '../screens/main/foodStallOwner/StallOwnerDish';
import StallOwnerEditDish from '../screens/main/foodStallOwner/StallOwnerEditDish';
import StallOwnerEditStall from '../screens/main/foodStallOwner/StallOwnerEditStall';
import StallOwnerAddDish from '../screens/main/foodStallOwner/StallOwnerAddDish';

// auth
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

// database
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase/config';

const RootStack = () => {
  const Stack = createNativeStackNavigator();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userType, setUserType] = useState('anonymous');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
        console.log('Signed in');
        console.log(user.email);
      } else {
        setIsSignedIn(false);
        setLoaded(true);
        console.log('Signed out');
      }
    });
    return unsubscribe;
  }, [db]);

  // get user type of entered email
  useEffect(() => {
    if (isSignedIn) {
      const email_key = auth.currentUser.email.replace('.', '%2E');
      const userTypeReference = ref(db, 'userType/' + email_key);
      onValue(userTypeReference, (snapshot) => {
        setUserType(snapshot.val());
        console.log('Fetching user type: ' + userType);
        setLoaded(true);
      });
    }
  }, [isSignedIn, db]);

  if (!loaded) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.bg,
            borderBottomWidth: 0,
            height: 120,
            // shadowColor: "transparent",
          },
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
          userType === 'customer' ? (
            <>
              <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
              <Stack.Screen
                name="Stall"
                component={Stall}
                options={({ route }) => ({ title: route.params.stall.name })}
              />
              <Stack.Screen name="Dish" component={Dish} options={{ title: null }} />
              <Stack.Screen
                name="Review"
                component={Review}
                options={({ route }) => ({ title: route.params.dishName })}
              />
              <Stack.Screen
                name="WriteReview"
                component={WriteReview}
                options={{ title: 'Write a Review' }}
              />
              <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="StallOwnerHome"
                component={StallOwnerHome}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="StallOwnerDish"
                component={StallOwnerDish}
                options={{ title: null }}
              />
              <Stack.Screen
                name="StallOwnerEditDish"
                component={StallOwnerEditDish}
                options={{ title: null }}
              />
              <Stack.Screen
                name="StallOwnerAddDish"
                component={StallOwnerAddDish}
                options={{ title: null }}
              />
              <Stack.Screen
                name="StallOwnerEditStall"
                component={StallOwnerEditStall}
                options={{ title: null }}
              />
              <Stack.Screen
                name="Review"
                component={Review}
                options={({ route }) => ({ title: route.params.dishName })}
              />
              <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
            </>
          )
        ) : (
          <>
            <Stack.Screen
              name="Landing"
              component={Landing}
              options={{ headerShown: false }} // animationTypeForReplace: isSignedIn ? 'push' : 'pop'
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
            <Stack.Screen
              name="FoodStallOwnerSignUp"
              component={FoodStallOwnerSignUp}
              options={{ title: null }}
            />
            <Stack.Screen
              name="FoodStallOwnerRegisterStall"
              component={FoodStallOwnerRegisterStall}
              options={{ title: null }}
            />
            <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
