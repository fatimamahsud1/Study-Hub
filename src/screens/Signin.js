import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Google, Fb, Fb2} from '../assets/Icons';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
const Signin = ({navigation}) => {
  const [isSignIn, setIsSignIn] = useState(true); 
  const [data, setData] = React.useState({
    username: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.switchContainer}>
        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={() => setIsSignIn(false)}
          style={[
            styles.switchButton,
            !isSignIn && styles.inactiveButton,
            {borderTopLeftRadius: 20, borderBottomLeftRadius: 20}, // Rounded corners for the left button
          ]}>
          <Text style={!isSignIn ? styles.activeText1 : styles.inactiveText1}>
            Sign Up
          </Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity
          onPress={() => setIsSignIn(true)}
          style={[
            styles.switchButton,
            isSignIn && styles.activeButton,
            {borderTopRightRadius: 20, borderBottomRightRadius: 20}, // Rounded corners for the right button
          ]}>
          <Text style={isSignIn ? styles.inactiveText : styles.activeText}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 100, marginHorizontal: 30}}>
        <Text style={styles.text_footer}>
          Email
          <Text style={{color: 'red'}}> *</Text>
        </Text>
        <View style={styles.action}>
          <FontAwesome name="envelope" color="#05375a" size={20} />
          <TextInput
            placeholder="Enter Your Email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
          />
        </View>
      </View>
      <View style={{marginTop: 1, marginHorizontal: 30}}>
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
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
      </View>
      <View style={styles.button}>
      <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                navigation.navigate('Bottom');
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
                  Sign In
                </Text>
              </View>
            </TouchableOpacity>
            <Text style={{color: '#969AA8', fontSize: 15, fontWeight:'bold', marginTop:5, alignSelf:'flex-end'}} onPress={()=>{navigation.navigate('ForgotPassword')}}>
            Forgot Password?
            </Text>
            <Text style={{marginVertical: 10, color: '#969AA8', fontSize: 12, fontWeight:'bold', marginTop:30,}}>
              <Text style={{color:'#EFEFEF'}}> ---------------------- </Text>  Or Sign In with   <Text style={{color:'#EFEFEF'}}> ---------------------- </Text>
            </Text>

            <View
                style={{
                  borderWidth: 1,
                  borderColor: '#D8D8D8',
                  width: '100%',
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  marginHorizontal: 5,
                  flexDirection: 'row',
                  marginBottom:10, 
                }}>
                <Google width={23} height={23} style={{marginTop: 1}} />
                <Text
                  style={{
                    marginHorizontal: 10,
                    color: '#79869F',
                    fontSize: 16,
                    fontWeight:'600'
                  }}>
                  Sign In With Google
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#D8D8D8',
                  width: '100%',
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  marginHorizontal: 5,
                  flexDirection: 'row',
                }}>
                <Fb2 width={23} height={23} style={{marginTop: 1}} />
                <Text
                  style={{
                    marginHorizontal: 10,
                    color: '#79869F',
                    fontSize: 16,
                    fontWeight:'600'
                  }}>
                  Sign In With Facebook
                </Text>
              </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text_footer: {
    color: 'black',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 15,
    color: '#05375a',
  },
  switchContainer: {
    marginTop: 40,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#F3F5F9',
    borderRadius: 20,
    alignSelf: 'flex-start', // Center the switch in the parent view
    marginLeft: 30,
  },
  switchButton: {
    paddingVertical: 10, // Reduced padding for smaller buttons
    paddingHorizontal: 25, // Reduced padding for smaller buttons
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: '#022150',
    color: 'white',
    fontSize: 17,
    borderRadius: 20, // Rounded corners for the active button
  },
  inactiveButton: {
    backgroundColor: '#022150',
  },
  activeText: {
    color: 'white',
    fontSize: 17,
  },
  inactiveText: {
    color: '#022150',
    fontSize: 17,
    color: 'white',
  },
  activeText1: {
    color: 'white',
    fontSize: 17,
  },
  inactiveText1: {
    color: '#8E8E8E',
    fontSize: 17,
    // color: 'white',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal:20,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor:'#022150'
    
  },
  textSign: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Signin;
