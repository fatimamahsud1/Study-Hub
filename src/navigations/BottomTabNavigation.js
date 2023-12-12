import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import plus from '../assets/plus.png';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useRef, useState, useEffect} from 'react';
import QuizHome from '../screens/QuizHome';
import SlidesScreen1 from '../screens/SlidesScreen1';
import Home from '../screens/Home';
import Scan from '../screens/Scan';
import StackNavigator from './StackNavigator';
import SlidesStack from './SlidesStack';
import QuizStack from './QuizStack';
import {PDF, Quiz, Quiz2} from '../assets/Icons';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation({navigation}) {
  const tabOffsetY = useRef(
    new Animated.Value(Dimensions.get('window').height),
  ).current;
  useEffect(() => {
    Animated.timing(tabOffsetY, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [tabOffsetY]);
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            headerShown: false,
            transform: [{translateY: tabOffsetY}],
            backgroundColor: '#022150',
            position: 'absolute',
            bottom: 10,
            showLabel: false,
            marginHorizontal: 20,
            height: 60,
            borderRadius: 30,
            shadowColor: '#000',
            shadowOpacity: 0.09,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            paddingHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}>
        <Tab.Screen
          name={'Home'}
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  position: 'absolute',
                  top: 20,
                }}>
                <FontAwesome5
                  name="home"
                  size={20}
                  color={focused ? '#fe8c00' : 'white'}></FontAwesome5>
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}></Tab.Screen>

        <Tab.Screen
          name={'SlidesStack'}
          component={SlidesStack}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  position: 'absolute',
                  top: 20,
                }}>
                <FontAwesome5
                  name="slideshare"
                  size={22}
                  color={focused ? '#fe8c00' : 'white'}></FontAwesome5>
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}></Tab.Screen>

        {}

        <Tab.Screen
  name={'Scan'}
  component={Scan}
  options={{
    headerShown: false,
    tabBarIcon: ({ focused }) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Scan')
        }}
      >
        <View
          style={{
            width: 55,
            height: 55,
            backgroundColor: '#fe8c00',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: Platform.OS == 'android' ? 50 : 30,
          }}
        >
          <Image
            source={plus}
            style={{
              width: 32,
              height: 32,
              tintColor: 'white',
            }}
          ></Image>
        </View>
      </TouchableOpacity>
    ),
  }}
/>


        <Tab.Screen
          name={'Quiz'}
          component={QuizStack}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={{position: 'absolute'}}>
               <Quiz/>
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />

        <Tab.Screen
          name={'Settings'}
          component={QuizHome}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  // centring Tab Button...
                  position: 'absolute',
                  top: 20,
                }}>
                <FontAwesome5
                  name="user-alt"
                  size={20}
                  color={focused ? '#fe8c00' : 'white'}></FontAwesome5>
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}></Tab.Screen>
      </Tab.Navigator>

      <Animated.View
        style={{
          width: getWidth() - 20,
          height: 3,
          backgroundColor: '#fe8c00',
          position: 'absolute',
          bottom: 67,

          left: 40,
          borderRadius: 20,
          transform: [{translateX: tabOffsetValue}],
        }}></Animated.View>
    </>
  );
}

function getWidth() {
  let width = Dimensions.get('window').width;

  // Horizontal Padding = 20...
  width = width - 80;

  // Total five Tabs...
  return width / 5;
}

function EmptyScreen() {
  return (
    <View
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}></View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function NotificationScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Notifications!</Text>
    </View>
  );
}

function SearchScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Search!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
