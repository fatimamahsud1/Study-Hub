import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import QuizHome from '../screens/QuizHome';
import DifficultyLevelsScreen from '../screens/DifficultyLevelsScreen';
import EasyFeedbackScreen from '../screens/EasyFeedbackScreen';
import OptionsScreen from '../screens/OptionsScreen';
import McqsScreen from '../screens/McqsScreen';
import SelectTopics from '../screens/SelectTopics';
import StartQuiz from '../screens/StartQuiz';
import QuizResultScreen from '../screens/QuizResultScreen';
import EasyLevelScreen from '../screens/EasyLevelScreen';
import NumberSelectionScreen from '../screens/NumberSelectionScreen';
import DifficultLevelScreen from '../screens/DifficultLevelScreen';
import DifficultLevelFeedbackScreen from '../screens/DifficultLevelFeedbackScreen';

const Stack = createStackNavigator();


  
const QuizStack = () => {
    
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
      name="EasyFeedbackScreen"
      component={EasyFeedbackScreen}
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
     <Stack.Screen
          name="DifficultLevelScreen"
          component={DifficultLevelScreen}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="DifficultLevelFeedbackScreen"
          component={DifficultLevelFeedbackScreen}
          options={{headerShown: false}}
        />
  </Stack.Navigator>
    
  );
};

export default QuizStack;
