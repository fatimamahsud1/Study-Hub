import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Button } from 'react-native';
import axios from 'axios';
import cheerio from 'cheerio';
import { RadioButton } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const McqsScreen = ({ route, navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [userScore, setUserScore] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
  const [feedbackData, setFeedbackData] = useState({ correct: 0, incorrect: 0 });

  const selectedTopic = route.params?.selectedTopic || 'Default Topic';
  let interval; // Declare interval variable

  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  const handleSubmitQuiz = () => {
    clearInterval(interval);
  
    let correctCount = 0;
    let incorrectCount = 0;
    const newFeedbackData = { correct: 0, incorrect: 0 };
  
    shuffledQuestions.forEach((question, index) => {
      const selectedAnswerIndex = selectedOptions[index];
      const correctAnswerIndex = question.correctIndex;
  
      if (selectedAnswerIndex === correctAnswerIndex) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });
  
    setUserScore(correctCount);
    setFeedbackData({ correct: correctCount, incorrect: incorrectCount });
    setIsQuizSubmitted(true);
  
    navigation.navigate('QuizResultScreen', {
      userScore: correctCount,
      correctAnswers: correctCount, // Updated this line
      totalQuestions: shuffledQuestions?.length || 0,
      elapsedMinutes: timer.minutes,
      elapsedSeconds: timer.seconds,
      feedbackData: newFeedbackData,
    });
  };

  const extractExplanation = (questionElement) => {
    const explanationElement = questionElement.find('.mtq_explanation-text');
    return explanationElement.text().trim();
  };

  useEffect(() => {
    const scrapeQuestions = async () => {
      try {
        const response = await axios.get(`https://www.geeksforgeeks.org/data-structure-gq/top-mcqs-on-binary-trees-data-structure-with-answers/`);
        const $ = cheerio.load(response.data);

        const questions = [];
        const correctAnswers = [];
        

        $('div.mtq_question_text').each((index, questionElement) => {
          const questionText = $(questionElement).text().trim();
          const choices = [];
          let correctOptionText = null;

          $(`tr[id^="mtq_row-${index + 1}-"]`).each((index, choiceElement) => {
            const choiceText = $(choiceElement).find('div.mtq_answer_text').text().trim();
            choices.push(choiceText);

            if ($(choiceElement).find('div.mtq_correct_marker').length > 0) {
              correctOptionText = choiceText;
            }
          });
          

          const correctIndex = choices.findIndex((choice) => choice === correctOptionText);

          questions.push({ text: questionText, choices, correctIndex });
          correctAnswers.push(correctOptionText);
        });

        setQuestions(questions);
        setShuffledQuestions(shuffleArray(questions));
        setCorrectAnswers(correctAnswers);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
   

    const shuffleArray = (array) => {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    };

    scrapeQuestions();
  }, [selectedTopic]);

  useEffect(() => {
    interval = setInterval(() => {
      setTimer((prevTimer) => {
        const newSeconds = prevTimer.seconds + 1;
        const newMinutes = Math.floor(newSeconds / 60);
        return {
          minutes: newMinutes,
          seconds: newSeconds % 60,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (
      <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Time Elapsed: {timer.minutes} minutes {timer.seconds} seconds</Text>
      </View>
      {shuffledQuestions.map((question, questionIndex) => (
        <View key={questionIndex} style={styles.questionContainer}>
          <Text style={styles.questionText}>{`Question ${questionIndex + 1}: ${question.text}`}</Text>
          {question.choices.map((choice, choiceIndex) => (
            <TouchableOpacity
              key={choiceIndex}
              style={[
                styles.choiceContainer,
                isQuizSubmitted &&
                  selectedOptions[questionIndex] === choiceIndex && {
                    backgroundColor:
                      choiceIndex === question.correctIndex ? '#4CAF50' : '#FF5252',
                  },
              ]}
              onPress={() => {
                const newSelectedOptions = { ...selectedOptions };
                newSelectedOptions[questionIndex] = choiceIndex;
                setSelectedOptions(newSelectedOptions);
              }}
            >
              <RadioButton
                value={choiceIndex}
                status={selectedOptions[questionIndex] === choiceIndex ? 'checked' : 'unchecked'}
                onPress={() => {
                  const newSelectedOptions = { ...selectedOptions };
                  newSelectedOptions[questionIndex] = choiceIndex;
                  setSelectedOptions(newSelectedOptions);
                }}
              />
              <Text style={styles.choiceText}>{`${choice}`}</Text>
            </TouchableOpacity>
          ))}
          {isQuizSubmitted && question.html && (
            <View style={styles.explanationContainer}>
              <Text style={styles.explanationLabel}>Explanation:</Text>
              <Text style={styles.explanationText}>
                {extractExplanation($(question.html))}
              </Text>
            </View>
          )}
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Submit Quiz" onPress={handleSubmitQuiz} />
      </View>
    </ScrollView>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  explanationContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  explanationLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  explanationText: {
    fontSize: 14,
    color: '#333',
  },
  
  header: {
    backgroundColor: '#022150',
    padding: 10,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 16,
  },
  questionContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
  },
  questionText: {
    fontSize: 16,
    color: '#022150',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  choiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  choiceText: {
    marginLeft: 10,
    color: '#022150',
  },
  buttonContainer: {
    margin: 20,
  },
});

export default McqsScreen;
