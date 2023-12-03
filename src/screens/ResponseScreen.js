import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';


const ResponseScreen = ({ route }) => {
const topic = route.params?.topic;
const createPDF = async () => {
  const htmlContent = `
    <h1>${topic}</h1>
    ${route.params?.response.split('\n').map(line => {
      const cleanedLine = line.replace(/Paragraph \d+:/g, '').trim();
      if (cleanedLine.startsWith('Heading ')) {
        return `<h2>${cleanedLine.replace('Heading ', '').trim()}</h2>`;
      } else {
        return `<p>${cleanedLine}</p>`;
      }
    }).join('')}
  `;

  let options = {
    html: htmlContent,
    fileName: 'Response',
    directory: 'Documents',
  };

  try {
    const file = await RNHTMLtoPDF.convert(options);
    console.log('PDF generated at: ', file.filePath);
    // Additional code to handle the created file (e.g., sharing, opening)
  } catch (e) {
    console.error(e);
  }
};

  const renderFormattedText = () => {
    const formattedText = route.params?.response.split('\n').map((line, index) => {
        const cleanedLine = line.replace(/Paragraph \d+:/g, '').trim();

        if (cleanedLine.startsWith('Heading ')) {
          return <Text key={index} style={styles.heading}>{cleanedLine.replace('Heading ', '').trim()}</Text>;
        } else {
          return <Text key={index} style={styles.paragraph}>{cleanedLine}</Text>;
        }
    });

    return formattedText;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
      <Text style={styles.topic}>Topic : {topic}</Text> 
        {renderFormattedText()}
      </View>
      <Button title="Download Notes as PDF" onPress={createPDF} />
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topic: {
    alignSelf:'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop:20, 
  },
  content: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 18,
    // marginTop: 10,
    textAlign: 'left',
  },
  paragraph: {
    fontSize: 16,
    // marginTop: 10,
    textAlign: 'left',
  },
});

export default ResponseScreen;
