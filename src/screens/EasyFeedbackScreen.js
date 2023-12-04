import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import ButtonComponent from '../components/Button';

const EasyFeedbackScreen = ({ route, navigation }) => {
  const { userScore, correctAnswers, shuffledQuestions, elapsedMinutes, elapsedSeconds } = route.params;

  const renderQuestionFeedback = (question, index) => (
    <View key={index} style={styles.questionFeedback}>
      <Text style={styles.questionText}>{`${index + 1}. ${question.text}`}</Text>
      <Text style={styles.answerText}>{`Correct Answer: ${question.choices[correctAnswers[index]]}`}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Quiz Results</Text>
      </View>
      <View style={styles.feedbackContainer}>
        <Text style={styles.scoreText}>Your Score: {userScore}/{shuffledQuestions.length}</Text>
        <Text style={styles.timeText}>Time Elapsed: {elapsedMinutes} minutes {elapsedSeconds} seconds</Text>
        <Text style={styles.correctAnswersText}>Correct Answers:</Text>
        {shuffledQuestions.map(renderQuestionFeedback)}
      </View>
      <View style={styles.buttonContainer}>
        <ButtonComponent text="Home" bgColor="#022150" textColor="white" onPress={() => navigation.navigate('Home')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#022150',
    padding: 10,
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedbackContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
  },
  scoreText: {
    fontSize: 16,
    color: '#022150',
    fontWeight: '700',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 14,
    color: '#022150',
    marginBottom: 10,
  },
  correctAnswersText: {
    fontSize: 14,
    color: '#022150',
    fontWeight: '700',
    marginBottom: 5,
  },
  questionFeedback: {
    marginBottom: 10,
  },
  questionText: {
    fontSize: 14,
    color: '#022150',
    marginBottom: 5,
  },
  answerText: {
    fontSize: 12,
    color: '#4CAF50',
  },
  buttonContainer: {
    margin: 20,
  },
});

export default EasyFeedbackScreen;
