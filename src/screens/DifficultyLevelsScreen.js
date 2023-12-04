import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SimpleHeader from '../components/SimpleHeader';
import Button from '../components/Button';

const difficultyLevels = ['Easy', 'Medium', 'Hard'];

const DifficultyLevelsScreen = ({ route }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const navigation = useNavigation();

  const handleDifficultySelection = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const navigateToQuizHome = () => {
    if (selectedDifficulty === 'Easy') {

      navigation.navigate('EasyLevelScreen', {
        selectedSubject: route.params?.selectedSubject || null,
        selectedDifficulty,
      });
    } else {

      navigation.navigate('SelectTopics', {
        selectedSubject: route.params?.selectedSubject || null,
        selectedDifficulty,
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <SimpleHeader headerText="Choose Difficulty" showBackButton={true} />
        <View style={styles.difficultyContainer}>
          {difficultyLevels.map((difficulty) => (
            <TouchableOpacity
              key={difficulty}
              style={[
                styles.difficultyItem,
                selectedDifficulty === difficulty && styles.selectedDifficulty,
              ]}
              onPress={() => handleDifficultySelection(difficulty)}
            >
              <Text style={styles.difficultyText}>{difficulty}</Text>
              {selectedDifficulty === difficulty && <Text style={styles.tick}>✔</Text>}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.btn}>
          <Button onPress={navigateToQuizHome} text="Done" style={styles.button} />
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
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedDifficulty: {
    backgroundColor: '#e6e6e6',
  },
  difficultyText: {
    fontSize: 16,
    color: 'black',
  },
  tick: {
    color: 'green',
    fontSize: 18,
  },
  btn: {
    marginTop: 20,
    width:'100%',
    height:'45%',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  button: {
    backgroundColor: '#4CAF50', // Green color as an example
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default DifficultyLevelsScreen;
