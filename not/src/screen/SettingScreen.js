import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '../../Firebaseconfig'
import { useDispatch } from 'react-redux'
import { resetToinitialState } from '../../redux/userSlice'
import { LinearGradient } from 'expo-linear-gradient';

const SettingScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={{ shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5},
    shadowOpacity: 0.3,
    shadowRadius: 2.5, 
    elevation:10}}>
        <TouchableOpacity onPress={() => { navigation.navigate('EditProfileScreen')}}>
        <LinearGradient
            colors={['#F02E5D','#DD2572']}
            style={styles.TouchableOpacity} >
        <Text style={styles.textstyle}>แก้ไขโปรไฟล์</Text>
        </LinearGradient></TouchableOpacity></View>
      <View style={{ shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5},
    shadowOpacity: 0.3,
    shadowRadius: 2.5, 
    elevation:10}}>
      <TouchableOpacity onPress={() => { navigation.navigate('ChangePasswordScreen')}}>
      <LinearGradient
            colors={['#F02E5D','#DD2572']}
            style={styles.TouchableOpacity} >
      <Text style={styles.textstyle}>เปลี่ยนรหัสผ่าน</Text>
      </LinearGradient></TouchableOpacity></View>
      <TouchableOpacity onPress={() => {
              dispatch(resetToinitialState())
              FIREBASE_AUTH.signOut()}}>
      <LinearGradient
            colors={['#F02E5D','#DD2572']}
            style={styles.TouchableOpacity} >
      <Text style={styles.textstyle}>ออกจากระบบ</Text>
      </LinearGradient></TouchableOpacity>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#edebeb',
  },
  TouchableOpacity: {
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 350,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginTop: 20,
  },
  Font: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "white"
  },
  textstyle:{
    color: 'white',
    fontSize: 16,
  }
});
