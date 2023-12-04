import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import OnboardingScreen from '../screens/OnboardingScreen.js';
import Signup from '../screens/Signup';
import Signin from '../screens/Signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import ForgotPassword from '../screens/ForgotPassword.js';
import OPTscreen from '../screens/OPTscreen.js';
import BottomTabNavigation from './BottomTabNavigation';
import ChatScreen from '../screens/SlidesScreen1.js';
import ResponseScreen from '../screens/ResponseScreen.js';
import SlidesScreen1 from '../screens/SlidesScreen1.js';
import QuizHome from '../screens/QuizHome.js';
const Stack = createStackNavigator();

const AuthNavigation = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  React.useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const appData = await AsyncStorage.getItem('isAppFirstLaunched');
        if (appData === null) {
          setIsAppFirstLaunched(true);
          await AsyncStorage.setItem('isAppFirstLaunched', 'false');
        } else {
          setIsAppFirstLaunched(false);
        }
      } catch (error) {
        console.error('AsyncStorage error: ', error);
      }
    };

    checkFirstLaunch();
  }, []);


  let initialRouteName = isAppFirstLaunched ? 'onboardingScreen' : 'Signup';
  // let initialRouteName = 'SlidesScreen1'
  return (
    isAppFirstLaunched !== null && (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRouteName}>
          <Stack.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen name="QuizHome" component={QuizHome} options={{ headerShown: false }} />

          <Stack.Screen
            name="OPTscreen"
            component={OPTscreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SlidesScreen1"
            component={SlidesScreen1}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ResponseScreen"
            component={ResponseScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Home" component={BottomTabNavigation} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};

export default AuthNavigation;
