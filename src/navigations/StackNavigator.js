// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChooseDifficulty from '../screens/ChooseDifficulty';
import ChooseSubject from '../screens/ChooseSubject';
import QuizHome from '../screens/QuizHome';
import OptionsScreen from '../screens/OptionsScreen';
import Mcqs from '../screens/Mcqs';
import SelectTopics from '../screens/SelectTopics';
import StartQuiz from '../screens/StartQuiz';
import FeedbackScreen from '../screens/FeedbackScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="QuizzHome">
        <Stack.Screen name="QuizzHome" component={QuizHome} options={{ headerShown: false }} />
        <Stack.Screen name="ChooseSubject" component={ChooseSubject}  options={{ headerShown: false }} />
        <Stack.Screen name="ChooseDifficulty" component={ChooseDifficulty}  options={{ headerShown: false }} />
        <Stack.Screen name="OptionsScreen" component={OptionsScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Mcqs" component={Mcqs}  options={{ headerShown: false }} />
        <Stack.Screen name="SelectTopics" component={SelectTopics}  options={{ headerShown: false }} />
        <Stack.Screen name="StartQuiz" component={StartQuiz}  options={{ headerShown: false }} />
        <Stack.Screen name="FeedbackScreen" component={FeedbackScreen}  options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
