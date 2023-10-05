import React, { useState } from 'react';
import { View, Button, TextInput, Text, StyleSheet,Image } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { NavigationProp, Route } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../Firebaseconfig';
import { TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { saveuser } from '../../asyncStorage/asyncStorage';
const auth = FIREBASE_AUTH


const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.user.uid)
      saveuser(res.user.uid)
      alert("success")

    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
    }
};
return (
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
      
      <TouchableOpacity onPress={handleSignUp}>
        <LinearGradient
          colors={['#DD2572', '#F02E5D']}
          style={styles.TouchableOpacity} >
          <Text style={styles.Font}>SIGN UP</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ margin: 10, color: '#ffff', }}>Alredy has an account ? Try</Text>
        <Text style={styles.forgotPasswordText} onPress={() => navigation.navigate("Login")}>Sign in</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2F2C2C',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  }, inputContainer: {
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
  TouchableOpacity: {
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 50,
  },forgotPasswordText: {
    marginTop: 10,
    color: '#E57373',
    textDecorationLine: 'underline',
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

export default Register;