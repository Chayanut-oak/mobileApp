import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, Text, StyleSheet, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../Firebaseconfig';
import { TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const auth = FIREBASE_AUTH;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(()=>{
    axios.get("http://localhost:8082/getMealById").then(res => console.log(res.data))
  },[])


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

  return (
<KeyboardAwareScrollView >
  <View style={styles.container}>
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
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity onPress={handleSignIn}>
        <LinearGradient
          colors={['#DD2572', '#F02E5D']}
          style={styles.TouchableOpacity} >
          <Text style={styles.Font}>SIGN IN</Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row' }}>
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
    height:660
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center', // Center the input fields horizontally
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#D9D9D9',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 50,
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
    width: 250,
    height: 250,
  },
});

export default Login;
