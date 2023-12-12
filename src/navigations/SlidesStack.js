import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ResponseScreen from '../screens/ResponseScreen';
import SlidesScreen1 from '../screens/SlidesScreen1';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {BottomTabBar} from '@react-navigation/bottom-tabs';


const Stack = createStackNavigator();

function getRouteName(route) {
 
  return getFocusedRouteNameFromRoute(route) ?? 'Slides';
}

const SlidesStack = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Slides" component={SlidesScreen1} options={{headerShown: false,}} />
    <Stack.Screen name="ResponseScreen" component={ResponseScreen} options={{headerShown: false,}}  />
  </Stack.Navigator>
  );
};

export default SlidesStack;
