import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import axios from 'axios';
import {PP, PDF} from '../assets/Icons';
import Config from 'react-native-config';
import {Searchbar} from 'react-native-paper';
import SimpleHeader from '../components/SimpleHeader';
import RNFS from 'react-native-fs'; // Add this
import FileViewer from 'react-native-file-viewer'; // Add this
import {Buffer} from 'buffer';
const SlidesScreen1 = ({navigation}) => {
  const [response, setResponse] = useState('');
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
  const formatDataForPPT = text => {
    const slides = text.split('\n\n').map(slideText => {
      const content = slideText.split('\n');
      return { content };
    });
  
    return { slides };
  };
  
  

  const sendToFlaskAPI = async content => {
    try {
      const flaskResponse = await axios({
        url: 'http://192.168.18.245:5000/create_ppt',
        method: 'POST',
        data: content,
        responseType: 'arraybuffer',  // Important for receiving binary data
      });
  
      const base64String = Buffer.from(flaskResponse.data, 'binary').toString('base64');
      const path = `${RNFS.DocumentDirectoryPath}/presentation.pptx`;
  
      await RNFS.writeFile(path, base64String, 'base64');
      console.log('File saved to:', path);
  
      // Open the file after saving
      FileViewer.open(path, { 
        showOpenWithDialog: true, 
        showAppsSuggestions: true, 
        mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' 
      })
      .then(() => console.log('File opened successfully'))
      .catch(error => console.error('Error opening file:', error));
  
    } catch (error) {
      console.error('Error in sendToFlaskAPI:', error);
    }
  };
  

  const fetchAIResponse1 = async () => {
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
            Authorization: `Bearer `,
            'Content-Type': 'application/json',
          },
        },
      );
      const formattedData = formatDataForPPT(apiResponse.data.choices[0].text);
      sendToFlaskAPI(formattedData);
      console.log(formattedData);
    } catch (error) {
      console.error('Error:', error);

      setResponse('Error fetching response');
    }
  };
  return (
    <>
     <KeyboardAvoidingView
      style={{ flex: 1 }} // Make KeyboardAvoidingView take up the entire screen
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust the behavior based on the platform
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust the vertical offset if necessary
    >
      {isLoading ? (
        <View style={styles.loadingContainer}>
          {/* Animation or loading indicator here */}
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <>
          <SimpleHeader headerText="Notes & Slides Generator" />
          <View style={styles.container}>
            <Searchbar
              placeholder="Enter Your Topic"
              onChangeText={setUserInput}
              value={userInput}
            />
            <View style={{flexDirection: 'row', marginTop: 20}}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={fetchAIResponse1}>
                <View style={styles.signIn}>
                  <PP width={53} height={53} style={{marginTop: 1}} />
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
                  <PDF width={53} height={53} style={{marginTop: 1}} />
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
          </View>
          {response && (
            <View style={styles.responseContainer}>
              <Text style={styles.responseText}>{response}</Text>
            </View>
          )}
        </>
      )}
      </KeyboardAvoidingView>
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
    fontSize: 14,
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

  responseContainer: {
    padding: 20,
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
});

export default SlidesScreen1;
