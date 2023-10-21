import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../Firebaseconfig';

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
      <Button
       color="#DD2572"
        title="เปลี่ยนรหัสผ่าน"
        onPress={changePassword}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2F2C2C',
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default ChangePasswordScreen;
