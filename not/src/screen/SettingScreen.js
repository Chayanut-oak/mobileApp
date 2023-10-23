import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '../../Firebaseconfig'
import { useDispatch } from 'react-redux'
import { resetToinitialState } from '../../redux/userSlice'

const SettingScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => { navigation.navigate('EditProfileScreen')}}>
      <View style={styles.buttoncontainer}>
        <Text style={styles.textstyle}>แก้ไขโปรไฟล์</Text>
      </View></TouchableOpacity>
      <TouchableOpacity onPress={() => { navigation.navigate('ChangePasswordScreen')}}>
      <View style={styles.buttoncontainer}>
      <Text style={styles.textstyle}>เปลี่ยนรหัสผ่าน</Text>
      </View></TouchableOpacity>
      <TouchableOpacity onPress={() => {
              dispatch(resetToinitialState())
              FIREBASE_AUTH.signOut()}}>
      <View style={styles.buttoncontainer}>
      <Text style={styles.textstyle}>ออกจากระบบ</Text>
      </View></TouchableOpacity>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2F2C2C',
  },
  buttoncontainer: {
    backgroundColor: '#E51C7C', // สีพื้นหลังขอบตัวปุ่ม
    padding: 13, // เพิ่มระยะขอบของกรอบ
    width: 340,
    top: 30,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // เพิ่มระยะห่างระหว่างปุ่ม
  },
  textstyle:{
    color: 'white',
    fontSize: 16,
  }
});
