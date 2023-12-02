// NumberSelectionScreen.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SimpleHeader from '../components/SimpleHeader';
import { useNavigation } from '@react-navigation/native';

const NumberSelectionScreen = ({ onSelectNumber }) => {
  const numbers = [10, 20, 30, 40, 50];
  const [selectedNumber, setSelectedNumber] = useState(numbers[0]);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <SimpleHeader headerText="Select Number of Questions" showBackButton={true} />
      <View style={styles.buttonContainer}>
        {numbers.map((number) => (
       <Button onPress= {navigation.navigate('SelectTopics')} text="Done" style={styles.button} />

        ))}
      </View>
      <ConfirmButton onPress={() => onSelectNumber(selectedNumber)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default NumberSelectionScreen;
