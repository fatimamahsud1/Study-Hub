import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Camera, Gallery, Icon } from '../assets/Icons';

const CameraScreen = () => {
  const [imageUri, setImageUri] = useState(null);

  const handleTakePicture = () => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
        return;
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.assets[0].uri;
        setImageUri(source);
      }
    });
  
  };
  const handleSelectFromGallery = () => {
    const options = {
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response.assets[0].uri;
        setImageUri(source);
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
      <Gallery style={{marginTop:5,}} onPress={handleSelectFromGallery}/>
        <TouchableOpacity onPress={handleTakePicture} >
        
         <Camera/>
        </TouchableOpacity>
        <Icon style={{marginTop:5,}}/>
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
    height: '70%', // Adjust height as needed
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
