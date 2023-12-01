import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ onPress, text, bgColor, textColor }) => {
  const buttonStyles = {
    ...styles.button,
    backgroundColor: bgColor || '#FE8C00', // Use provided bgColor or default value
  };

  const buttonTextStyles = {
    ...styles.buttonText,
    color: textColor || 'white', // Use provided textColor or default value
  };

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={buttonTextStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: '20%',
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
