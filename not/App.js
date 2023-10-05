import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import MainNavigate from './navigation/MainNavigate';

import ImgPicker from './test/imagePicker';

import { Provider } from 'react-redux';
import store from './redux/strore';
export default function App() {
  return (
    <Provider store={store}>
      <ImgPicker></ImgPicker>
      <MainNavigate></MainNavigate>
    </Provider>
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
