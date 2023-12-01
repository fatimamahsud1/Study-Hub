// ChooseSubject.js
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

const subjects = [' Data Structures', 'Object Oriented Programming', 'Biology', 'Mathematics', 'Algorithms', 'History'];
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChooseSubject = () => {
  const navigation = useNavigation();
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleSubjectSelection = (subject) => {
    setSelectedSubject(subject);
  };

  const navigateToQuizHome = () => {
    navigation.navigate('QuizzHome', { selectedSubject, selectedDifficulty: null });
  };
  

  return (
    <View style={styles.container}>
      <Header headerText="Choose Subject" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {subjects.map((subject) => (
          <TouchableOpacity
            key={subject}
            style={[styles.subjectItem, selectedSubject === subject && styles.selectedSubject]}
            onPress={() => handleSubjectSelection(subject)}
          >
            <Text style={styles.subjectText}>{subject}</Text>
            {selectedSubject === subject && <Text style={styles.tick}>✔</Text>}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.btncon}>
        <Button onPress={navigateToQuizHome} text="Done" bgColor="#022150" textColor="white" />
      </View>
    </View>
  );
};

// ... (Styles and export)



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  subjectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black', // Updated to black
  },
  selectedSubject: {
    backgroundColor: '#e6e6e6',
  },
  subjectText: {
    fontSize: 16,
    color: 'black', // Updated to black
  },
  tick: {
    color: 'green',
    fontSize: 18,
  },

  btncon: {
    width:  windowWidth,
    height: windowHeight*0.35,
    alignItems:'center',
    justifyContent:'space-start',
  },

  button: {
    backgroundColor: '#022150',
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChooseSubject;
