import React , { useState } from 'react';

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
import Restaurant from '../screens/main/customer/Restaurant';

// import auth
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

const RootStack = () => {
    const Stack = createNativeStackNavigator();
    const [isSignedIn, setIsSignedIn] = useState(false);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in.
            setIsSignedIn(true);
            console.log("user is signed in");
        } else {
            // No user is signed in.
            setIsSignedIn(false);
        }
    })
    
    return(
        <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
            headerStyle: {
                backgroundColor: colors.bg,
                borderBottomWidth: 0,
                // shadowColor: "transparent",
        
                height: 120,
            },
            headerRight: () => <ProfileButton />,
            headerShadowVisible: false,
            headerTintColor: colors.secondary,
            headerRightContainerStyle: {
                paddingRight: 25,
            },
            headerLeftContainerStyle: {
                paddingLeft: 25,	
            },
            }}
            // animation="" // suggest animations
        >
            
            {
                isSignedIn ? (
                    <>
                        <Stack.Screen name="Home" component={Home} options={{ headerShown: false}}/>
                        <Stack.Screen name="Restaurant" component={Restaurant} options={({ route }) => ({ title: route.params.name })} />
                    </>
                  ) : (
                    <>
                        <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false, animationTypeForReplace: isSignedIn ? 'push' : 'pop',}}/>
                        <Stack.Screen name="CustomerSignIn" component={CustomerSignIn} options={{title: null}}/>
                        <Stack.Screen name="CustomerSignUp" component={CustomerSignUp} options={{title: null}}/>
                    </>
                  )
            }
            
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;