import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const EasyFeedbackScreen = ({ route, navigation }) => {
  const { userScore, correctAnswers, shuffledQuestions, elapsedMinutes, elapsedSeconds } = route.params;

  const totalQuestions = shuffledQuestions.length;
  const incorrectCount = totalQuestions - userScore;

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Quiz Results</Text>
      <Text style={styles.scoreText}>{`Your Score: ${userScore} / ${totalQuestions}`}</Text>
      <Text style={styles.correctCountText}>{`Correct Answers: ${userScore}`}</Text>
      <Text style={styles.incorrectCountText}>{`Incorrect Answers: ${incorrectCount}`}</Text>
      <Text style={styles.timeText}>{`Time Elapsed: ${elapsedMinutes} minutes ${elapsedSeconds} seconds`}</Text>
      <Button title="Go Back to Home" onPress={() => navigation.navigate('QuizHome')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  resultText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#022150',
  },
  scoreText: {
    fontSize: 22,
    marginBottom: 12,
    color: '#022150',
  },
  correctCountText: {
    fontSize: 18,
    marginBottom: 12,
    color: '#022150',
  },
  incorrectCountText: {
    fontSize: 18,
    marginBottom: 12,
    color: 'red',
  },
  timeText: {
    fontSize: 18,
    marginBottom: 12,
    color: '#022150',
  },
  buttonContainer: {
    margin: 20,
    backgroundColor: '#022150',
  },
});

export default EasyFeedbackScreen;
