import React ,{ useState , useEffect}from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigate from './navigation/MainNavigate';
export default function App() {

  return (
    <MainNavigate></MainNavigate>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
