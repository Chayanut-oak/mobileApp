import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, Text, StyleSheet, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../Firebaseconfig';
import { TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { MaterialCommunityIcons } from '@expo/vector-icons';
const auth = FIREBASE_AUTH;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSignIn = async () => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorCode = error.code;
      alert("Sign in failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <KeyboardAwareScrollView style={{ backgroundColor: "#2F2C2C" }}>
      <View style={styles.container}>
        <Image
    source={require('../../picture/veggie.png')} // เปลี่ยนเส้นทางไปยังรูปภาพพื้นหลังของคุณ
    style={styles.imageBackground} // สร้างรูปแบบสไตล์ของคุณหรือใช้ไปรย่อน
  ></Image>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../picture/logo.png')}
          />

        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          />
          <View style={styles.input}>
            <TextInput
              style={styles.inputField}
              placeholder="Password"
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPassword(text)}
            />
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              style={styles.icon}
              onPress={toggleShowPassword}
            />
          </View>
        </View>

        <TouchableOpacity onPress={handleSignIn}>
          <LinearGradient
            colors={['#F02E5D','#DD2572']}
            style={styles.TouchableOpacity} >
            <Text style={styles.Font}>SIGN IN</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row',marginTop: 5 }}>
          <Text style={{ margin: 10, color: '#ffff', }}>Not a Member ?</Text>
          <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate("Register")}>
            Sign up
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center',
    backgroundColor: '#2F2C2C',
    padding: 20,
    paddingTop: 50,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center', // Center the input fields horizontally
  },
  input: {
    width: '90%',
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 50,
    flexDirection: 'row',
  },
  forgotPasswordText: {
    marginTop: 10,
    color: '#E57373',
    textDecorationLine: 'underline',
  },
  TouchableOpacity: {
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginTop: 20,
  },
  Font: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "white"
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 0,
  },
  image: {
    width: 320,
    height: 170,
    marginTop:150,
    marginBottom: 50,
  }, inputField: {
    flex: 1,
    color: '#3C3C43',
  }, icon: {
    padding: 5,
    marginRight: 5,
  },
  imageBackground: {
    width: 500, // ความกว้างเต็มหน้าจอ
    height: 250, // ความสูงเต็มหน้าจอ
    position: 'absolute', // ตั้งค่ารูปภาพให้เป็นพื้นหลัง
    zIndex: -1,  // ความสูงเต็มหน้าจอ
    bottom: -280,
  },
});

export default Login;
