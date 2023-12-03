import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {PP, PDF} from '../assets/Icons';
import Config from 'react-native-config';
import {Searchbar} from 'react-native-paper';
import SimpleHeader from '../components/SimpleHeader';
const SlidesScreen1 = ({navigation}) => {
 
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fetchAIResponse = async () => {
    console.log(`API Key: ${Config.OPENAI_API_KEY}`);
    setIsLoading(true);
    try {
      
      const apiResponse = await axios.post(
        'https://api.openai.com/v1/engines/text-davinci-003/completions',
        {
          prompt: `Please provide the information in a heading and paragraph format more than three headings amd also write Heading:\n\nTopic: ${userInput}`,
          max_tokens: 500,
        },
        {
          headers: {
            Authorization: `Bearer`,
            'Content-Type': 'application/json',
          },
        },
      );
      setIsLoading(false);
      navigation.navigate('ResponseScreen', {
        response: apiResponse.data.choices[0].text,
        topic: userInput,
        tabBarStyle: {display: 'none'},
      });
    } catch (error) {
      console.error('Error:', error);

      setResponse('Error fetching response');
    }
  };

  return (
    <>
    
    {isLoading ? (
      <View style={styles.loadingContainer}>
        {/* Animation or loading indicator here */}
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (      <>
    <SimpleHeader headerText="Notes & Slides Generator" /><View style={styles.container}>
          <Searchbar
            placeholder="Enter Your Topic"
            onChangeText={setUserInput}
            value={userInput} />
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <TouchableOpacity style={styles.signIn} onPress={fetchAIResponse}>
              <View style={styles.signIn}>
                <PP width={53} height={53} style={{ marginTop: 1 }} />
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#022150',
                    },
                  ]}>
                  Generate Slides
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signIn} onPress={fetchAIResponse}>
              <View style={styles.signIn}>
                <PDF width={53} height={53} style={{ marginTop: 1 }} />
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#022150',
                    },
                  ]}>
                  Generate Notes
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View></>



)}
</>
    
  );
};

const styles = StyleSheet.create({
  signIn: {
    width: '47%',
    height: 120,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'column',
    backgroundColor: '#eee8f4',
  },
  textSign: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    // flex: 0.33,
    width: '95%',
    height: '30%',
    backgroundColor: '#022150',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    margin: 10,
    marginTop: 30,
    marginBottom: 20,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SlidesScreen1;
