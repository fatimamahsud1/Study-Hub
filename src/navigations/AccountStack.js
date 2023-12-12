import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyProfile from '../screens/Accounts/Profile';
import Settings from '../screens/Settings';
const Stack = createStackNavigator();
const AccountStack = () => {
    return (
      <Stack.Navigator>
           <Stack.Screen name="Settings" component={Settings} options={{headerShown: false,}} />
      <Stack.Screen name="Profile" component={MyProfile} options={{headerShown: false,}} />
    
    </Stack.Navigator>
    );
  };
  
  export default AccountStack;