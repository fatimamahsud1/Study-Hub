import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Google, Fb} from '../assets/Icons';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
const COLORS = {primary: '#282534', white: '#fff', blue: '#3E5C89'};
const Signup = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#282534',
        borderWidth:1, 
        borderColor:'#282534',
      },
      headerTitleStyle: {
        color: 'grey',
        fontSize: 15,
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
          }}>
          <Text
            style={{
              fontSize: 17,
              marginTop:5, 
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

  const textInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = val => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
        <StatusBar backgroundColor= '#282534' barStyle="light-content"/>
      
      <View style={styles.header}>
      
      </View>
      
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text
            style={{
              fontSize: 24,
              color: COLORS.primary,
              fontWeight: '600',
              alignSelf: 'center',
              marginTop: 20,
            }}>
            Get Started Free
          </Text>
          <Text
            style={{
              color: COLORS.blue,
              fontSize: 14,
              alignSelf: 'center',
              marginTop: 5,
              marginBottom: 55,
            }}>
            Let’s introduce yourself for explore more.
          </Text>
          <Text style={styles.text_footer}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
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
              placeholder="Confirm Your Password"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                navigation.navigate('Signin');
              }}>
              <LinearGradient
                colors={['#5872A6', '#282534']}
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
              </LinearGradient>
            </TouchableOpacity>

            <Text style={{marginVertical: 10, color: '#969AA8', fontSize: 12}}>
              Or Sign Up with
            </Text>
            <View style={{flexDirection: 'row'}}>
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
                <Google width={23} height={23} style={{marginTop: 1}} />
                <Text
                  style={{
                    marginHorizontal: 10,
                    color: '#282534',
                    fontSize: 16,
                  }}>
                  Google
                </Text>
              </View>
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
                <LinearGradient
                  colors={['#5872A6', '#282534']}
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
                </LinearGradient>
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
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
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
