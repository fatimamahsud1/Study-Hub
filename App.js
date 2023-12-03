import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './src/screens/OnboardingScreen';
import Signup from './src/screens/Signup';
import Signin from './src/screens/Signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigation from './src/navigations/AuthNavigation';
import StackNavigator from './src/navigations/StackNavigator';
import ChatScreen from './src/screens/SlidesScreen1';
const Stack = createStackNavigator();

const App = () => {
  
 
  return (
    
  // <ChatScreen></ChatScreen>
  <AuthNavigation></AuthNavigation>
  // <StackNavigator></StackNavigator>r
  );
};

export default App;
