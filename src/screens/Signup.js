import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert
} from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase'; // Make sure to import your Firebase auth instance
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Google, Fb} from '../assets/Icons';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import Feather from 'react-native-vector-icons/Feather';
const COLORS = {primary: '#022150', white: '#fff', blue: '#3E5C89'};
const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  GoogleSignin.configure();

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  useEffect(() => {
    // Initialize Google Sign-In configuration
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID',
      offlineAccess: true,
    });
  }, []);
  const handleSignUp = async () => {
    try {
      if (email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
        Alert.alert('Error', 'Please enter all fields');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);

      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('SignIn');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#022150',
        borderWidth:1, 
        borderColor:'#022150',
      },
      headerTitleStyle: {
        color: 'white',
        fontSize: 12,
        alignItems:'center', 
        alignSelf: 'center',
        fontWeight: '400',
      },
      headerTitle: 'Already have account?',
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {navigation.navigate('Signin')}}
          style={{
            backgroundColor: '#5872A6',
            height: 35,
            width: 90,
            borderRadius: 20,
            marginRight:10, 
            fontSize: 13,

          }}>
          <Text
            style={{
              fontSize: 14,
              marginTop:5, 
              fontWeight:'bold',
              alignSelf: 'center',
              fontWeight: '100',
              color: 'white',
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);





  return (
    <View style={styles.container}>
        <StatusBar backgroundColor= '#282534' barStyle="light-content"/>
      
      <View style={styles.header}>
      
      </View>
      
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text
            style={{
              fontSize: 22,
              color: COLORS.primary,
              fontWeight: '600',
              alignSelf: 'center',
              
            }}>
            Get Started Free
          </Text>
          <Text
            style={{
              color: COLORS.blue,
              fontSize: 14,
              alignSelf: 'center',
              marginTop: 5,
              marginBottom: 45,
            }}>
            Let’s introduce yourself for explore more.
          </Text>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
          
                <TextInput
              style={styles.textInput}
              placeholder="Enter Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
      />

            {/* {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null} */}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Password"
              secureTextEntry
              value={password}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
              />

{/* 
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity> */}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
          
             <TextInput
              style={styles.textInput}
              placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />
            {/* <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity> */}
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={handleSignUp}>
              <View
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity>

            <Text style={{marginVertical: 10, color: '#969AA8', fontSize: 12}}>
              Or Sign Up with
            </Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity  onPress={handleGoogleSignIn}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#D8D8D8',
                  width: '45%',
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  marginHorizontal: 5,
                  flexDirection: 'row',
                }}>
                     <GoogleSigninButton
        style={styles.googleButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogleSignIn}
      />
                {/* <Google width={23} height={23} style={{marginTop: 1}} />
                <Text
                  style={{
                    marginHorizontal: 10,
                    color: '#282534',
                    fontSize: 16,
                  }}>
                  Google
                </Text> */}
              </View>
              </TouchableOpacity>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#282534',
                  width: '45%',
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  marginHorizontal: 5,
                  flexDirection: 'row',
                }}>
                <View
                  style={styles.signIn}>
                  <Fb width={25} height={25} style={{marginTop: 1}} />
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#fff',
                      marginHorizontal: 10,
                    }}>
                    Facebook
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#022150',
  },
  googleButton:{
      borderWidth: 1,
      borderColor: '#D8D8D8',
      width: '200%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      flexDirection: 'row',

  },
  header: {
    flex: 0.6,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 1,
    backgroundColor: '#022150',

  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    
  },
  text_header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 16,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    // paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor:'#022150',

  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});