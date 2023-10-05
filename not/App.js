import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MainNavigate from './navigation/MainNavigate';
import ImgPicker from './test/imagePicker';
export default function App() {

  return (
    <ImgPicker />
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
