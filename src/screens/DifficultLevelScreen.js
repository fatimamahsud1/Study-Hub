import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import cheerio from 'cheerio';
import { RadioButton } from 'react-native-paper';
import Button from '../components/Button';

const DifficultLevelScreen = () => {
  const [mcqsQuestions, setMcqsQuestions] = useState([]);
  const [mcqsOptions, setMcqsOptions] = useState([]);
  const [mcqsCorrectAnswers, setMcqsCorrectAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
  const navigation = useNavigation();
  let interval;

  const correctAnswersList = [
    "Container that stores the elements of similar types",
    "int javatpoint[10];",
    "int arr[2] = {10, 20}",
    "Easier to access the elements in an array",
    "Stack and Queue data structures can be implemented through an array.",
    "Insert",
    "Overflow",
    "Underflow",
    "Recursion",
    "Queue",
    "Stack",
    "ABC+*",
    "+A*BC",
    "First node",
    "Circular Queue",
    "3241",
    "Linear Queue",
    "FIFO principle",
    "Process with different priority can be easily handled",
    "Both a and b",
    "LIFO",
    "Balancing of symbols",
    "At the tail position of the linked list",
    "3",
    "Data is transferred asynchronously",
    "In enqueue operation, new nodes are inserted from the end and in dequeue operation, nodes are deleted from the beginning.",
    "Overflow",
    "Heap",
    "FIFO",
    "Deletion is easier",
    "Queue",
    "Input-restricted queue",
    "Both a and b",
    "Underflow",
    "Stack",
    "Circular queue",
    "",
    "O(1)",
    "O(1)",
    "O(1)",
    "O(1)",
    "O(1)",
    "We can traverse in both the directions.",
    "It stores the addresses of the next and the previous node",
    "3",
    "Inorder traversal",
    "The left and right sub trees should also be a binary search tree",
    "A tree which is binary search tree and height balanced tree.",
    "Red Black trees are not strictly balanced",
    "Both b and c",
    "A tree which is a binary search tree but not strictly balanced tree.",
    "Black, if the new node is not a root node",
    "",
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.javatpoint.com/data-structure-mcq', { timeout: 10000 });
        const htmlContent = response.data;
        const $ = cheerio.load(htmlContent);

        const questions = [];
        const options = [];

        $('p.pq').each((index, element) => {
          const questionText = $(element).text().trim();
          questions.push(questionText);

          const optionsForQuestion = [];
          $(element)
            .next('ol.pointsa')
            .find('li')
            .each((optionIndex, optionElement) => {
              optionsForQuestion.push($(optionElement).text().trim());
            });

          options.push(optionsForQuestion);
        });

        setMcqsQuestions(questions);
        setMcqsOptions(options);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        console.error('Error details:', error);
      }
    };

    fetchData();
  }, []);

 
  const handleAnswerChange = (questionIndex, choiceIndex) => {
    const newSelectedAnswers = { ...selectedAnswers };
    newSelectedAnswers[questionIndex] = choiceIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const submitAnswers = () => {
    setIsQuizSubmitted(true);

    const userScore = mcqsQuestions.reduce(
      (score, question, questionIndex) =>
        selectedAnswers[questionIndex] === correctAnswersList.indexOf(mcqsOptions[questionIndex][question]) ? score + 1 : score,
      0
    );

    navigation.navigate('DifficultLevelFeedbackScreen', {
      userScore,
      correctAnswers: userScore,
      totalQuestions: mcqsQuestions.length,
      elapsedMinutes: timer.minutes,
      elapsedSeconds: timer.seconds,
      feedbackData: { correct: userScore, incorrect: mcqsQuestions.length - userScore },
    });
  };

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

      {mcqsQuestions.map((question, questionIndex) => (
        <View key={questionIndex} style={styles.questionContainer}>
          <Text style={styles.questionText}>{`Question ${questionIndex + 1}: ${question}`}</Text>
          {mcqsOptions[questionIndex] &&
            mcqsOptions[questionIndex].map((choice, choiceIndex) => (
              <TouchableOpacity
                key={choiceIndex}
                style={[
                  styles.choiceContainer,
                  isQuizSubmitted &&
                    selectedAnswers[questionIndex] === choiceIndex && {
                      backgroundColor: choiceIndex === correctAnswersList.indexOf(question) ? '#4CAF50' : '#FF5252',
                    },
                ]}
                onPress={() => handleAnswerChange(questionIndex, choiceIndex)}
              >
                <View style={styles.radioButtonContainer}>
                  <RadioButton
                    value={choiceIndex}
                    status={selectedAnswers[questionIndex] === choiceIndex ? 'checked' : 'unchecked'}
                    onPress={() => handleAnswerChange(questionIndex, choiceIndex)}
                    color="#022150"
                  />
                </View>
                <Text style={styles.choiceText}>{`${choice}`}</Text>
              </TouchableOpacity>
            ))}
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <Button onPress={submitAnswers} text="Submit Quiz" bgColor="#022150" style={styles.button} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
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
  header: {
    backgroundColor: '#022150',
    padding: 10,
    alignItems: 'center',
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
    marginBottom: 120,
    width: '100%',
    height: '8%',
  },
  radioButtonContainer: {
    marginRight: 10,
  },
});

export default DifficultLevelScreen;