import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
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
// import Share from 'react-native-share';
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
    // Split the text by some delimiter or logic to separate slides
    // This is a simple example and may need to be adjusted based on your actual text format
    const slideTexts = text.split('\n\n'); // Example: Split by double newline

    const slides = slideTexts.map((slideText, index) => {
      // Further split or process each slideText to separate title from content
      // This is a placeholder logic
      const title = `Slide ${index + 1}`;
      const content = slideText.split('\n'); // Example: Split by newline

      return {title, content};
    });

    return {slides};
  };
  const saveFileToPublicDirectory = async (flaskResponseData) => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Storage Permission Required",
            message: "This app needs access to your storage to download files",
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Storage permission denied');
          return;
        }
      }
  
      const path = `${RNFS.DownloadDirectoryPath}/presentation.pptx`;
      await RNFS.writeFile(path, flaskResponseData, 'base64');
      console.log('File saved to:', path);
      Alert.alert('File Saved', `The presentation has been saved to your Downloads folder.`);
    } catch (error) {
      console.error('Error saving file:', error);
    }
  };
  

  const sendToFlaskAPI = async content => {
    content.slides.forEach((slide, index) => {
      console.log(`Slide ${index + 1} Title:`, slide.title);
      console.log(`Slide ${index + 1} Content:`, slide.content);
    });

    try {
      const flaskResponse = await axios({
        url: 'http://10.0.2.2:5000/create_ppt',
        method: 'POST',
        data: content,
        responseType: 'arraybuffer',
      });

      console.log(typeof flaskResponse.data, flaskResponse.data);
      console.log('Document directory path:', RNFS.DocumentDirectoryPath);

      const localFile = `${RNFS.DocumentDirectoryPath}/presentation.pptx`;

      console.log('Local file path:', localFile);
      console.log('Response data length:', flaskResponse.data.byteLength);
      console.log('Response headers:', flaskResponse.headers);

      // const base64String = flaskResponse.data.slice(0, 50).toString('base64');
      // console.log('Data sample in Base64:', base64String);

      const entireData = new Uint8Array(flaskResponse.data);
      const entireBase64String = Buffer.from(entireData).toString('base64');

      saveFileToPublicDirectory(entireBase64String);
    
      




      // try {
      //   await RNFS.writeFile(localFile, entireBase64String, 'base64');
      //   console.log('File written to:', localFile);
      //   FileViewer.open(localFile)
      //     .then(() => console.log('File opened successfully'))
      //     .catch(error => console.error('Error opening file:', error));
      // } catch (error) {
      //   console.error('Error writing file:', error);
      // }
    } catch (error) {
      if (error.response) {
        console.log('Response data:', error.response.data);
        console.log('Response status:', error.response.status);
        console.log('Response headers:', error.response.headers);
      } else if (error.request) {
        console.log('Request was made but no response received', error.request);
      } else {
        console.log('Error setting up the request', error.message);
      }
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
