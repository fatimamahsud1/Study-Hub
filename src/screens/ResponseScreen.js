import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  StatusBar,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Back} from '../assets/Icons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as Animatable from 'react-native-animatable';


const ResponseScreen = ({route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const topic = route.params?.topic;
  const createPDF = async () => {
    const htmlContent = `
    <h1>${topic}</h1>
    ${route.params?.response
      .split('\n')
      .map(line => {
        const cleanedLine = line.replace(/Paragraph \d+:/g, '').trim();
        if (cleanedLine.startsWith('Heading ')) {
          return `<h2>${cleanedLine.replace('Heading ', '').trim()}</h2>`;
        } else {
          return `<p>${cleanedLine}</p>`;
        }
      })
      .join('')}
  `;

    let options = {
      html: htmlContent,
      fileName: 'Response',
      directory: 'Documents',
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);
      console.log('PDF generated at: ', file.filePath);
      setModalVisible(true);
    } catch (e) {
      console.error(e);
    }
  };

  const renderFormattedText = () => {
    const formattedText = route.params?.response
      .split('\n')
      .map((line, index) => {
        const cleanedLine = line.replace(/Paragraph \d+:/g, '').trim();

        if (cleanedLine.startsWith('Heading ')) {
          return (
            <Text key={index} style={styles.heading}>
              {cleanedLine.replace('Heading ', '').trim()}
            </Text>
          );
        } else {
          return (
            <Text key={index} style={styles.paragraph}>
              {cleanedLine}
            </Text>
          );
        }
      });

    return formattedText;
  };

  return (
    <View style={styles.container}>
    
      {/* <StatusBar backgroundColor="#282534" barStyle="light-content"> <Back
              width={30}
              height={30}
              onPress={() => {
                navigation.goBack();
              }}
            /></StatusBar> */}
     
      {/* <View style={styles.header}>
      
      </View> */}
 
 

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.topic}>Topic : {topic}</Text>
            {renderFormattedText()}
          </View>
          <View style={{marginTop: 30, alignItems: 'center'}}>
            <TouchableOpacity style={styles.signIn} onPress={createPDF}>
              <View style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: 'white',
                    },
                  ]}>
                  Download Notes
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{marginBottom: 80}}></View>
        </ScrollView>
      </Animatable.View>
    
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>PDF Downloaded Successfully</Text>
          <Button
            title="Close"
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
      </View>
    </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#022150',
  },
  header: {
    flex: 0.6,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 1,
    backgroundColor: '#022150',
  },
  signIn: {
    width: '87%',

    height: 50,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'column',
    backgroundColor: '#022150',
  },
  textSign: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  overlayStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent
    zIndex: 3, 
  
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topic: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginTop: 20,
  },
  content: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    color: 'black',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    // marginTop: 10,
    textAlign: 'left',
    color: 'black',
  },
  paragraph: {
    fontSize: 16,
    // marginTop: 10,
    textAlign: 'left',
    color: 'black',
  },
  centeredView: {
    elevation:10, 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 2, 
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight:'bold',
    color:'black',
  },
});

export default ResponseScreen;
