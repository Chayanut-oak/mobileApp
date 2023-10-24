import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet,TouchableOpacity } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../Firebaseconfig';
import { LinearGradient } from 'expo-linear-gradient';

const auth = FIREBASE_AUTH;

const ChangePasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const changePassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("อีเมลยืนยันสำหรับการเปลี่ยนรหัสผ่านถูกส่งไปที่อีเมลของคุณ");
    } catch (error) {
      Alert.alert('ส่งอีเมลยืนยันเพื่อเปลี่ยนรหัสผ่านผิดพลาด:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="อีเมล"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TouchableOpacity onPress={changePassword}>
          <LinearGradient
            colors={['#F02E5D','#DD2572']}
            style={styles.TouchableOpacity} >
            <Text style={styles.Font}>เปลี่ยนรหัสผ่าน</Text>
          </LinearGradient>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edebeb',
  },
  input: {
    width: 340,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    fontSize: 16
  },
  TouchableOpacity: {
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
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
});

export default ChangePasswordScreen;
