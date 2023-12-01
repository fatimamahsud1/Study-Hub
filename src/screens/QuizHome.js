// QuizHome.js
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Button from '../components/Button';
import { useNavigation, useRoute } from '@react-navigation/native';

const QuizHome = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedSubject = route.params ? route.params.selectedSubject || null : null;
  const selectedDifficulty = route.params ? route.params.selectedDifficulty || null : null;

  const navigateToChooseSubject = () => {
    navigation.navigate('ChooseSubject');
  };
  const navigateToOptionsScreen = () => {
    navigation.navigate('OptionsScreen');
  };

  const navigateToChooseDifficulty = () => {
    navigation.navigate('ChooseDifficulty');
  };

  return (
    <>
      <Header headerText="Assessments" />
      <View style={styles.container}>
        <Text style={styles.text}>Test Yourself</Text>
        <Text style={styles.text1}>
          Test yourself by attempting our assessments prepared by experienced tutors
        </Text>
        <View style={styles.container2}>
          <Button onPress={navigateToChooseSubject} text="Choose Subject " bgColor="#FE8C00" textColor="white" />
          {selectedSubject && <Text style={styles.selectedInfoText}>Subject Chosen: {selectedSubject}</Text>}
          {selectedDifficulty && <Text style={styles.selectedInfoText1}>Difficulty Level Chosen: {selectedDifficulty}</Text>}
          <TouchableOpacity onPress={navigateToChooseDifficulty}>
            <Text style={styles.clickableText}>Select Difficulty Level</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container3}>
      <Button onPress={navigateToOptionsScreen} text="Continue" bgColor="#FE8C00" textColor="white" />

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '45%',
    backgroundColor: '#022150',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    margin: 20,
  },
  container2: {
    width: '100%',
    height: '85%', // Adjusted the height
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
  },
  container3: {
    width: '100%',
    height: '45%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 30,
    marginTop: 30,
  },
  text1: {
    fontSize: 20,
    color: 'white',
    marginTop: 0,
    marginLeft: 30,
    margin: 7,
  },
  clickableText: {
    fontSize: 16,
    color: '#FE8C00', // Set the color as needed
    textDecorationLine: 'underline', // Add underline to indicate it's clickable
  },
  selectedInfoText: {
    color: 'white',
    marginTop: 10,
  },
  selectedInfoText1: {
    color: 'white',
    marginBottom: 10,
  },
});

export default QuizHome;
