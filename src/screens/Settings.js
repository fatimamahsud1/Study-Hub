import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SimpleHeader from '../components/SimpleHeader'
import { Account, Other } from '../assets/Icons'
import { NavigationContainer } from '@react-navigation/native'
const Settings = ({navigation}) => {
  return (
  <>
  
  <SimpleHeader headerText="Configurations" />
  <View style={{flexDirection:'row', paddingTop:15, marginTop:15,paddingHorizontal:15, paddingBottom:5,}}>
    <Account/>
    <Text style={styles.text1}>
        Account Management
    </Text>
    
  </View>
  <View style={{
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 1,
 
    marginBottom: 10, 
    width:'90%' , 
    alignSelf:'center'
  }} />
  <View style={{ paddingHorizontal:10, marginBottom:10, }}>
   
    <Text style={styles.text2} onPress={()=>{navigation.navigate('Profile')}}>
        Edit Profile
    </Text>
    <Text style={styles.text2}>
        Change Password
    </Text>
    <Text style={styles.text2}>
        Privacy Settings
    </Text>
    <Text style={styles.text2}>
        Help Request
    </Text>
    
  </View>
  <View style={{flexDirection:'row', paddingTop:15, marginTop:15,paddingHorizontal:15, paddingBottom:5,}}>
    <Other/>
    <Text style={styles.text1}>
        Other
    </Text>
    
  </View>
  <View style={{
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 1,
    marginBottom: 10, 
    width:'90%' , 
    alignSelf:'center'
  }} />
  </>
  )
}

export default Settings

const styles = StyleSheet.create({
    text1:{
        fontSize:18, 
        marginTop:5, 
        color:'#022150',
        marginHorizontal:10, 
    },
    text2:{
        fontSize:16, 
        marginTop:5, 
        color:'#454545',
        marginHorizontal:10, 
        fontWeight:'600'
    }
})