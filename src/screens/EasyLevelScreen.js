import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Button } from 'react-native';
import axios from 'axios';
import cheerio from 'cheerio';
import { RadioButton } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import EasyFeedbackScreen from './EasyFeedbackScreen';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EasyLevelScreen = ({ route, navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [userScore, setUserScore] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
  const [selectedQuestionsCount, setSelectedQuestionsCount] = useState(10);
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [intervalId, setIntervalId] = useState(null);

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

    const scrapeQuestions = async (page) => {
      try {
        const response = await axios.get(`https://www.geeksforgeeks.org/top-50-data-structures-mcqs-with-answers/page/${page}/`);
        const $ = cheerio.load(response.data);

        const newQuestions = [];
        const correctOptions = [];

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

          const explanationElement = $(`div#mtq_question_explanation-${index + 1}`);
          let explanation = null;
          
          if (explanationElement.length > 0) {
            explanation = explanationElement.find('div.mtq_explanation-text').contents().filter(function () {
              return this.nodeType === 3;
            }).text().trim();
          }

          newQuestions.push({ text: questionText, choices });
          correctOptions.push(correctOptionText);
        });

        setQuestions((prevQuestions) => [...prevQuestions, ...newQuestions]);
        setShuffledQuestions(shuffleArray([...questions, ...newQuestions]));
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    const fetchAllPages = async () => {
      let page = 1;
      let hasMorePages = true;

      while (hasMorePages) {
        await scrapeQuestions(page);
        page++;
        const nextPageButton = $(`a.page.quiz_navigation_btn.next_quiz[data-pageid="${page * 100000}"]`);
        hasMorePages = nextPageButton.length > 0;
      }
    };

    fetchAllPages();
  }, [selectedTopic]);

  useEffect(() => {
    setDisplayedQuestions(shuffledQuestions.slice(0, selectedQuestionsCount));
  }, [shuffledQuestions, selectedQuestionsCount]);

  useEffect(() => {
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

    setIntervalId(interval);

    return () => clearInterval(interval);
  }, []);

  const handleSubmitQuiz = () => {
    clearInterval(intervalId);

    let score = 0;
    const newCorrectAnswers = {};

    shuffledQuestions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctIndex) {
        score++;
      }
      newCorrectAnswers[index] = question.correctIndex;
    });

    setUserScore(score);
    setCorrectAnswers(newCorrectAnswers);

    navigation.navigate('EasyFeedbackScreen', {
      userScore: score,
      correctAnswers: newCorrectAnswers,
      shuffledQuestions,
      elapsedMinutes: timer.minutes,
      elapsedSeconds: timer.seconds,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Time Elapsed: {timer.minutes} minutes {timer.seconds} seconds</Text>
      </View>
      <DropDownPicker
        items={[
          { label: '10', value: 10 },
          { label: '20', value: 20 },
          { label: '30', value: 30 },
          { label: '40', value: 40 },
          { label: '50', value: 50 },
        ]}
        defaultValue={selectedQuestionsCount.toString()}
        containerStyle={{ height: 40, margin: 10 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => {
          setSelectedQuestionsCount(Number(item.value));
        }}
      />
      {displayedQuestions.map((question, questionIndex) => (
        <View key={questionIndex} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.text}</Text>
          {question.choices.map((choice, choiceIndex) => (
            <TouchableOpacity
              key={choiceIndex}
              style={styles.choiceContainer}
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
  header: {
    backgroundColor: '#022150',
    padding: 10,
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    color: 'white',
    fontSize: 13,
  },
  questionContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 3,
  },
  questionText: {
    fontSize: 14,
    color: '#022150',
    fontWeight: '700',
    marginBottom: 10,
  },
  choiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  choiceText: {
    marginLeft: 8,
    color: '#022150',
  },
  buttonContainer: {
    margin: 20,
    backgroundColor: '#022150',
  },
});

export default EasyLevelScreen;
