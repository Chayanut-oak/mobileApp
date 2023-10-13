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
const Home = ({ navigation }) => {

  return (
    <ScrollView style={{ backgroundColor: '#2F2C2C', }}>
      <View style={styles.container}>
        <View style={styles.search}>
          <SearchBar navigation={navigation} />
        </View>
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
    justifyContent: 'flex-start', // Align content to the top
    backgroundColor: '#2F2C2C',
    padding: 20,
    paddingTop: 20, // Add padding/margin to the top
  },
  search: {
    width: '100%',
    alignItems: 'center', // Center align the button horizontally
  },

});