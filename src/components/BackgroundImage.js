import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

const BackgroundImage = ({ children }) => {
  return (
    <ImageBackground 
      source={require('../Assets/Images/image4.jpg')} // replace with your image path
      style={styles.backgroundImage}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  }
});

export default BackgroundImage;
