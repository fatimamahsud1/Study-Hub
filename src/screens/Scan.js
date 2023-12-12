import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const CameraScreen = () => {
  const [imageUri, setImageUri] = useState(null);

  const handleTakePicture = () => {
    const options = {
      noData: true,
    };

    ImagePicker.launchCamera(options, response => {
      if (response.uri) {
        setImageUri(response.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.preview} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Camera Feed</Text>
          </View>
        )}
      </View>
      <View style={styles.buttonPanel}>
        <TouchableOpacity onPress={handleTakePicture} style={styles.button}>
          {/* Replace with your camera icon */}
          <Text>Take Picture</Text>
        </TouchableOpacity>
        {/* Add other buttons as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Replace with the color of your choice
  },
  cameraContainer: {
    width: '90%', // Adjust width as needed
    height: '60%', // Adjust height as needed
    margin: 20,
    borderRadius: 15, // Adjust border radius as needed
    backgroundColor: '#fff', // Replace with the color of your choice
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc', // Replace with the color of your choice
  },
  placeholderText: {
    color: '#fff',
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  buttonPanel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
  button: {
    width: 60, // Adjust as needed
    height: 60, // Adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff', // Replace with the color of your choice
    borderRadius: 30, // Make it half of the width and height to get a circle
  },
});

export default CameraScreen;
