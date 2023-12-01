// Options.js
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import SimpleHeader from '../components/SimpleHeader';

const OptionsScreen = () => {
  const navigation = useNavigation();

  const navigateToOptionsScreen = () => {
    navigation.navigate('OptionsScreen');
  };

  

  const navigateToRandomQuiz = () => {
    // You can navigate to the screen where you want to generate random quiz questions
    // Update 'RandomQuizScreen' with the actual screen name for generating random questions
    navigation.navigate('RandomQuizScreen');
  };

  const navigateToSelectTopics = () => {
    // You can navigate to the screen where users can select topics for the quiz
    // Update 'SelectTopicsScreen' with the actual screen name for selecting topics
    navigation.navigate('SelectTopics');
  };

  return (
    <>
      <SimpleHeader headerText="Quiz Generation Options" />
      <View style={styles.container}>
        <Text style={styles.text}>Choose an Option</Text>
        <TouchableOpacity style={styles.button} onPress={navigateToRandomQuiz}>
          <Text style={styles.buttonText}>Generate Random Quiz Questions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToSelectTopics}>
          <Text style={styles.buttonText}>Select Topics</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#022150',

  },
  button: {
    backgroundColor: '#022150',
    padding: 15,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OptionsScreen;
