import React, { useState } from 'react';
import { View, Button, TextInput, Text, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { NavigationProp, Route } from '@react-navigation/native';
import { FIREBASE_AUTH } from '../../Firebaseconfig';

const auth = FIREBASE_AUTH


const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, {
        displayName: displayName,
      });
      alert("success")
      navigation.navigate('Register')
    } catch (error) {
      const errorMessage = error.message;
      alert(errorMessage);
    }
};
return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setDisplayName(text)}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Sign in" onPress={() => navigation.navigate("Login")}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default Register;