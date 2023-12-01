import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const FeedbackScreen = ({ route, navigation }) => {
  const { userScore, correctAnswers, shuffledQuestions, elapsedMinutes, elapsedSeconds } = route.params;

  const renderFeedback = () => {
    return shuffledQuestions.map((question, index) => (
      <View key={index} style={styles.feedbackItem}>
        <Text style={styles.questionText}>{question.text}</Text>
        <Text style={styles.feedbackText}>
          Your Answer: {question.choices[correctAnswers[index]]}
        </Text>
        <Text style={styles.feedbackText}>
          Correct Answer: {question.choices[question.correctIndex]}
        </Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Feedback</Text>
      <Text style={styles.scoreText}>Your Score: {userScore}/{shuffledQuestions.length}</Text>
      <Text style={styles.timeText}>
        Time Taken: {elapsedMinutes} minutes {elapsedSeconds} seconds
      </Text>
      <View style={styles.feedbackContainer}>{renderFeedback()}</View>
      <Button title="Go Home" onPress={() => navigation.navigate('Home')} />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
    marginBottom: 20,
  },
  feedbackContainer: {
    width: '100%',
  },
  feedbackItem: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  feedbackText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default FeedbackScreen;
