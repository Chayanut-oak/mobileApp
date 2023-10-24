import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import Category from '../components/Category';
import Recommend from '../components/Recommend';
import FoodList from '../components/FoodList';
import SearchBar from '../components/SearchBar';
import { useSelector } from 'react-redux';
const Home = ({ navigation }) => {

  return (
    <ScrollView style={{ backgroundColor: '#edebeb', }}>
      <View style={styles.container}>
       
        <Category navigation={navigation} />
        <Recommend navigation={navigation} />
        <FoodList navigation={navigation} />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Align content to the top
    backgroundColor: '#edebeb',
    padding: 10,
  },
  search: {
    width: '100%',
    alignItems: 'center', // Center align the button horizontally
  },

});