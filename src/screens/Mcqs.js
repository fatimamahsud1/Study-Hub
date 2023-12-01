import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Button } from 'react-native';
import axios from 'axios';
import cheerio from 'cheerio';
import { RadioButton } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Mcqs = ({ route }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [userScore, setUserScore] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });

  const selectedTopic = route.params?.selectedTopic || 'Default Topic';

  useEffect(() => {
    const shuffleArray = (array) => {
      const shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }
      return shuffledArray;
    };

    const scrapeQuestions = async () => {
      try {
        const response = await axios.get(`https://www.biologyonline.com/${selectedTopic}`);

        const $ = cheerio.load(response.data);

        const scrapedQuestions = [];

        $('.mlw_qmn_new_question').each((index, questionElement) => {
          const questionText = $(questionElement).text().trim();

          const choices = [];
          const choicesContainer = $(questionElement).closest('.quiz_section').find('.qmn_mc_answer_wrap');

          choicesContainer.each((index, choiceElement) => {
            const choiceText = $(choiceElement).find('label').text().trim();
            choices.push(choiceText);
          });

          scrapedQuestions.push({ text: questionText, choices });
        });

        const shuffledArray = shuffleArray(scrapedQuestions);
        setQuestions(shuffledArray);
        setShuffledQuestions(shuffledArray);

        // Initialize correctAnswers state
        const initialCorrectAnswers = {};
        shuffledArray.forEach((_, index) => {
          initialCorrectAnswers[index] = null;
        });
        setCorrectAnswers(initialCorrectAnswers);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    scrapeQuestions();
  }, [selectedTopic]);

  useEffect(() => {
    // Start the timer
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        const newSeconds = prevTimer.seconds + 1;
        const newMinutes = Math.floor(newSeconds / 60);
        return {
          minutes: newMinutes,
          seconds: newSeconds % 60,
        };
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleSubmitQuiz = () => {
    // Stop the timer
    clearInterval(interval);

    let score = 0;
    const newCorrectAnswers = { ...correctAnswers };

    shuffledQuestions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctIndex) {
        score++;
      }
      newCorrectAnswers[index] = question.correctIndex;
    });

    setUserScore(score);
    setCorrectAnswers(newCorrectAnswers);

    // Navigate to the feedback screen and pass the necessary information
    navigation.navigate('FeedbackScreen', {
      userScore: score,
      correctAnswers: newCorrectAnswers,
      shuffledQuestions,
      elapsedMinutes: timer.minutes,
      elapsedSeconds: timer.seconds,
    });
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Time Elapsed: {timer.minutes} minutes {timer.seconds} seconds</Text>
      </View>
      {shuffledQuestions.map((question, questionIndex) => (
        <View key={questionIndex} style={{ margin: 10 }}>
          <Text style={{ fontSize: 18, color: '#022150', fontWeight: 'bold', marginBottom: 10 }}>{question.text}</Text>
          {question.choices.map((choice, choiceIndex) => (
            <TouchableOpacity
              key={choiceIndex}
              style={{ flexDirection: 'row', color: '#022150', alignItems: 'center', marginVertical: 5 }}
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
              <Text style={{ marginLeft: 10 }}>{`${choice}`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Submit Quiz" onPress={handleSubmitQuiz} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#022150',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    height: windowHeight * 0.1,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 12,
    margin: 4,
  },
  buttonContainer: {
    margin: 20,
    color: '#022150',
  },
});

export default Mcqs;
