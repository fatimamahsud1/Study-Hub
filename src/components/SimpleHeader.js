import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Dimensions, Image, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const SimpleHeader = ({ headerText }) => {
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.userIcon}>
          <Image source={require("../assets/images/avatar.png")} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.title}>{headerText}</Text>
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    backgroundColor: '#022150',
    padding: 10,
    width: windowWidth,
    height: windowHeight*0.15,

  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },
  userIcon: {
    marginRight: 10,
  },
  avatar: {
    width: 50, 
    height: 50,
    borderRadius: 15,
    marginLeft:10,
    marginTop:10,


  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text
    justifyContent:'center',
    marginTop: 20,
    marginLeft: -40,


  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom:20
  },
});

export default SimpleHeader;
