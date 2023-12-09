// Navigation.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import QuizHome from '../screens/QuizHome';
import OptionsScreen from '../screens/OptionsScreen';
import SelectTopics from '../screens/SelectTopics';
import StartQuiz from '../screens/StartQuiz';
import NumberSelectionScreen from '../screens/NumberSelectionScreen';
import EasyLevelScreen from '../screens/EasyLevelScreen';
import DifficultyLevelsScreen from '../screens/DifficultyLevelsScreen';
import McqsScreen from '../screens/McqsScreen';
import QuizResultScreen from '../screens/QuizResultScreen';
import Signup from '../screens/Signup';
import OnboardingScreen from '../screens/OnboardingScreen';
import EasyFeedbackScreen from '../screens/EasyFeedbackScreen';
import DifficultLevelScreen from '../screens/DifficultLevelScreen';
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    
      <Stack.Navigator>
        <Stack.Screen
          name="QuizzHome"
          component={QuizHome}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="DifficultyLevelsScreen"
          component={DifficultyLevelsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OptionsScreen"
          component={OptionsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="McqsScreen"
          component={McqsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SelectTopics"
          component={SelectTopics}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StartQuiz"
          component={StartQuiz}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="QuizResultScreen"
          component={QuizResultScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EasyLevelScreen"
          component={EasyLevelScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NumberSelectionScreen"
          component={NumberSelectionScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
<Stack.Screen
          name="EasyFeedbackScreen"
          component={EasyFeedbackScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DifficultLevelScreen"
          component={DifficultLevelScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    
  );
};

export default StackNavigator;
