import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Config from 'react-native-config';
const apiKey = Config.OPENAI_API_KEY;
import SimpleHeader from '../components/SimpleHeader';
const SlidesScreen1 = ({navigation}) => {
  const [userInput, setUserInput] = useState('');

  const fetchAIResponse = async () => {
    console.log(`API Key: ${Config.OPENAI_API_KEY}`);
    try {
      const apiResponse = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt: `Please provide the information in a heading and paragraph format more than three headings amd also write Heading:\n\nTopic: ${userInput}`,
          max_tokens: 500,
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            'Content-Type': 'application/json',
          },
        },
      );

      navigation.navigate('ResponseScreen', {
        response: apiResponse.data.choices[0].text,
        topic: userInput,
      });
    } catch (error) {
      console.error('Error:', error);

      setResponse('Error fetching response');
    }
  };

  return (
   <>
   <SimpleHeader headerText="Notes & Slides Generator" />

   <View style={styles.container}>
    

    </View>
      <TextInput
        style={styles.input}
        placeholder="Enter your topic"
        value={userInput}
        onChangeText={setUserInput}
      />

      <Button title="Send" onPress={fetchAIResponse} />
   </>
       
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    height: '50%',
    backgroundColor: '#022150',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    margin: 10,
    marginTop:30,
    marginBottom:20,
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  response: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default SlidesScreen1;
