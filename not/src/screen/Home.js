import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../Firebaseconfig'

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Button onPress={()=> FIREBASE_AUTH.signOut()} title="8;p"></Button>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})