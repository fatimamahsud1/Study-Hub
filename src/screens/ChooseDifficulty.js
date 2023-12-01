// ChooseDifficulty.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';

const difficultyLevels = ['Easy', 'Medium', 'Hard'];

const ChooseDifficulty = ({ route }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const navigation = useNavigation();

  const handleDifficultySelection = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const navigateToQuizHome = () => {
    navigation.navigate('QuizzHome', {
      selectedSubject: route.params?.selectedSubject || null,
      selectedDifficulty,
    });
  };
  
  

  return (
    <>
      <View style={styles.container}>
        <Header headerText="Choose Difficulty" showBackButton={true} />
        <View style={styles.difficultyContainer}>
          {difficultyLevels.map((difficulty) => (
            <TouchableOpacity
              key={difficulty}
              style={[styles.difficultyItem, selectedDifficulty === difficulty && styles.selectedDifficulty]}
              onPress={() => handleDifficultySelection(difficulty)}
            >
              <Text style={styles.difficultyText}>{difficulty}</Text>
              {selectedDifficulty === difficulty && <Text style={styles.tick}>✔</Text>}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.btn}>
          <Button onPress={navigateToQuizHome} text="Done" bgColor="#022150" textColor="white" />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  difficultyContainer: {
    padding: 20,
  },
  difficultyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black', // Updated to black
  },
  selectedDifficulty: {
    backgroundColor: '#e6e6e6',
  },
  difficultyText: {
    fontSize: 16,
    color: 'black', // Updated to black
  },
  tick: {
    color: 'green',
    fontSize: 18,
  },
  btn: {
    height: '40%',
    alignItems: 'center',
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

export default ChooseDifficulty;
