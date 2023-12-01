// App.js
import React from 'react';
import StackNavigator from './src/Navigations/StackNavigator';
import Mcqs from './src/screens/Mcqs';

const App = () => {
  return  <StackNavigator />;
    // <Mcqs/>

};

export default App;





// import React, { useEffect } from 'react';
// import { View, Text } from 'react-native';
// import axios from 'axios';
// import cheerio from 'cheerio';
// import YourScreen from './src/screens/QuizHome';

// const App = () => {

//   <YourScreen/>
//   // const topic = 'animal cell';

//   // useEffect(() => {
//   //   const scrapeQuestions = async () => {
//   //     try {
//   //       const response = await axios.get(`https://www.biologyonline.com/${topic}`);

//   //       const $ = cheerio.load(response.data);

//   //       const questions = [];

//   //       const questionElements = $('.mlw_qmn_new_question');
        
//   //       questionElements.each((index, questionElement) => {
//   //         const questionText = $(questionElement).text().trim();
//   //         console.log('Question Text:', questionText);
        
//   //         const choices = [];
//   //         const choicesContainer = $(questionElement).closest('.quiz_section').find('.qmn_mc_answer_wrap');
        
//   //         choicesContainer.each((index, choiceElement) => {
//   //           const choiceText = $(choiceElement).find('label').text().trim();
//   //           console.log('Choice Text:', choiceText);
//   //           choices.push(choiceText);
//   //         });
        
//   //         questions.push({ text: questionText, choices });
//   //       });
        
//   //       console.log('Scraped Questions:', questions);
        
        
        
//   //     } catch (error) {
//   //       console.error('Error fetching data:', error.message);
//   //     }
//   //   };

//   //   scrapeQuestions();
//   // }, [topic]);

//   // return (
//   //   <View>
//   //     <Text>Scraping Questions...</Text>
//   //   </View>
//   // );
// };

// export default App;
