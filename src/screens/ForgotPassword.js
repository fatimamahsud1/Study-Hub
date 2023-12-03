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

import {Icon1, Back} from '../assets/Icons';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import BackgroundImage from '../components/BackgroundImage';
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
              Forgot Password
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
              Remmember & input your email or phone number below.
            </Text>

            <Icon1
              width={200}
              height={170}
              style={{marginTop: -10, alignSelf: 'center'}}
            />

            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
              <FontAwesome
                name="envelope"
                color="#282534"
                size={20}
                style={{Right: -100}}
              />
              <TextInput
                placeholder="Enter Your Email"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={val => textInputChange(val)}
              />

              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="#282534" size={26} />
                </Animatable.View>
              ) : null}
            </View>

            <View style={styles.button}>
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => {
                  navigation.navigate('OPTscreen');
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
                    Reset Password
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animatable.View>
      </BackgroundImage>
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
    marginTop: 30,
    marginBottom: 10,
  },
  action: {
    flexDirection: 'row',
    marginTop: 5,
    borderWidth: 2,
    paddingTop: 15,
    padding: 13,
    paddingBottom: 5,
    borderRadius: 10,
    borderColor: '#282534',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#282534',
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    elevation: 2,
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
