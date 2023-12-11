import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Button from '../components/Button';
import McqsScreen from './McqsScreen';
import QuizHome from './QuizHome';
import { useNavigation } from '@react-navigation/native';



const QuizResultScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userScore, correctAnswers, totalQuestions, elapsedMinutes, elapsedSeconds, feedbackData } = route.params;
  const correctCount = correctAnswers || 0;
  const navigateToRetakeQuiz = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'McqsScreen' }],
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
        <Text style={styles.correctCountText}>{`Correct Answers: ${correctCount}`}</Text>
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
  resultText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#022150',
  },
  resultContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    marginBottom: 20,
    elevation: 5,
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
  timeText: {
    fontSize: 18,
    marginBottom: 12,
    color: '#022150',
  },
  feedbackText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#022150',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    alignItems:'center'
  },
  
});

export default QuizResultScreen;
