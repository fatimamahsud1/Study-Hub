import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../components/Button';
const EasyFeedbackScreen = ({ route }) => {
  const { userScore, correctAnswers, shuffledQuestions, elapsedMinutes, elapsedSeconds } = route.params;
  const navigation = useNavigation();

  const totalQuestions = shuffledQuestions.length;
  const incorrectCount = totalQuestions - userScore;
  const navigateToRetakeQuiz = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'EasyLevelScreen' }],
    });
  };
  
  const navigateToQuizHome = () => {
    navigation.navigate('QuizHome');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Quiz Results</Text>
      <View style={styles.resultContainer}>
      <Text style={styles.scoreText}>{`Your Score: ${userScore} / ${totalQuestions}`}</Text>
      <Text style={styles.correctCountText}>{`Correct Answers: ${userScore}`}</Text>
      <Text style={styles.timeText}>{`Time Elapsed: ${elapsedMinutes} minutes ${elapsedSeconds} seconds`}</Text>
      </View>
     
      <View style={styles.buttonContainer}>
      <Button  text ="Retake Quiz" bgColor= '#022150'  textColortitle onPress={navigateToRetakeQuiz} />
        <Button text ="Back to Home" bgColor= '#022150'  textColortitle onPress={navigateToQuizHome} />
      </View> 
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
  resultContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    marginBottom: 20,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    alignItems:'center'
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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    alignItems:'center'
  },
});

export default EasyFeedbackScreen;
