import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const StartQuiz = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedTopic = route.params?.selectedTopic || 'Default Topic';

  const handleStartQuiz = () => {
    // Navigate to Mcqs screen and pass the selected topic
    navigation.navigate('McqsScreen', { selectedTopic });
  };

  return (
   
      <View style={styles.container}>
        <Text style={styles.headerText}>Welcome to the Quiz</Text>
        <Text style={styles.topicText}>Selected Topic: {selectedTopic}</Text>
        <Text style={styles.instructionsText}>
          Test your knowledge with this engaging quiz on {selectedTopic}. Each question has multiple
          choice options, and your goal is to select the correct one. Let's see how well you know
          the topic! Take your time, and enjoy the quiz experience.
        </Text>
        <TouchableOpacity style={styles.startQuizButton} onPress={handleStartQuiz}>
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
  );
};


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust the opacity as needed
    borderRadius: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#022150', // Dark blue color
  },
  topicText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#022150',
  },
  instructionsText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#022150',
  },
  startQuizButton: {
    backgroundColor: '#022150',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default StartQuiz;
