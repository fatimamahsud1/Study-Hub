import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const StartQuiz = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedTopic = route.params?.selectedTopic || 'Default Topic';

  const handleStartQuiz = () => {
    // Navigate to Mcqs screen and pass the selected topic
    navigation.navigate('Mcqs', { selectedTopic });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Start Quiz</Text>
      <Text style={styles.topicText}>Selected Topic: {selectedTopic}</Text>
      <Text style={styles.instructionsText}>
        These are the quiz instructions. Provide a brief description of what the quiz entails.
      </Text>
      <TouchableOpacity style={styles.startQuizButton} onPress={handleStartQuiz}>
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  topicText: {
    fontSize: 18,
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 16,
    marginBottom: 20,
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
