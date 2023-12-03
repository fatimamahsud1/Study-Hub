import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  StatusBar,
  ScrollView,
} from 'react-native';

import {Icon1, Back, Icon2} from '../assets/Icons';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import BackgroundImage from '../components/BackgroundImage';
const COLORS = {primary: '#282534', white: '#fff', blue: '#3E5C89'};

const OTPscreen = ({navigation}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleOtpChange = (index, value) => {
    if (value.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus to the next input
      if (index < otp.length - 1) {
        refs[index + 1].focus();
      }
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    // Replace this with your actual OTP validation logic
    const expectedOtp = '1234'; // Replace with the expected OTP
    if (enteredOtp === expectedOtp) {
      Alert.alert('Success', 'OTP Verified Successfully');
      // Navigate to the next screen or perform other actions
    } else {
      Alert.alert('Error', 'Incorrect OTP. Please try again.');
      // Clear OTP inputs
      setOtp(['', '', '', '']);
      // Focus on the first input
      refs[0].focus();
    }
  };

  const refs = [];

  return (
    <View style={styles.container}>
      <BackgroundImage>
        <StatusBar backgroundColor="#282534" barStyle="light-content" />

        <View style={styles.header}></View>

        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <ScrollView>
            <Back
              width={30}
              height={30}
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text
              style={{
                fontSize: 24,
                color: COLORS.primary,
                fontWeight: '600',
                textAlign: 'center',
                marginTop: 20,
              }}>
              Enter your Passcode
            </Text>

            <Text
              style={{
                color: '#79869F',
                fontSize: 14,
                alignSelf: 'center',
                marginTop: 5,
                marginBottom: 55,
                marginHorizontal: 40,
                textAlign: 'center',
              }}>
              We’ve sent the code to the email on your device
            </Text>
            <Icon2
              width={200}
              height={170}
              style={{marginTop: -10, alignSelf: 'center'}}
            />

            <View style={styles.container1}>
             <View style={{marginTop:30}}></View>
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={styles.otpInput}
                    onChangeText={text => handleOtpChange(index, text)}
                    value={digit}
                    keyboardType="numeric"
                    maxLength={1}
                    ref={ref => (refs[index] = ref)}
                  />
                ))}
              </View>

             

           
            </View>

            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => {
                   
                }}>
                <View
                  style={styles.signIn}>
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: '#fff',
                      },
                    ]}>
                    Verify Code
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.resendButton}>
                <Text style={styles.resendButtonText}>Resend OTP</Text>
              </TouchableOpacity>
          </ScrollView>
        </Animatable.View>
      </BackgroundImage>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282534',
  },
  header: {
    flex: 0.6,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 1,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
  },
  otpInput: {
    width: 60,
    height: 50,
    borderWidth: 1,
    borderColor: '#BFBFBF',
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 5,
    borderRadius:10, 
  },
  verifyButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  resendButton: {
    // marginTop: 20,
    alignSelf:'center'
  },
  resendButtonText: {
    color: 'blue',
    // textDecorationLine: 'underline',
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    elevation: 1,
    backgroundColor:'#022150'
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OTPscreen;
