import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const SettingScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity>
      <View style={styles.buttoncontainer}>
        <Text style={styles.textstyle}>แก้ไขโปรไฟล์</Text>
      </View></TouchableOpacity>
      <TouchableOpacity>
      <View style={styles.buttoncontainer}>
      <Text style={styles.textstyle}>ยืนยันตัวตน</Text>
      </View></TouchableOpacity>
      <TouchableOpacity>
      <View style={styles.buttoncontainer}>
      <Text style={styles.textstyle}>เปลี่ยนรหัสผ่าน</Text>
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
