import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import Category from '../components/Category';
import Recommend from '../components/Recommend';
import FoodList from '../components/FoodList';

const Home = ({ navigation }) => {
  const [selected, setSelected] = React.useState([]);
  const data = [
    { key: '1', value: 'Mobiles' },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers' },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Dairy Products' },
    { key: '7', value: 'Drinks' },
  ];
  console.log(selected);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.search}>
          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')} style={{ width: '100%' }}>
            <View style={styles.searchButton}>
           
                <FontAwesome name="search" size={24} color="#D1D1D1" style={{ transform: [{ scaleX: -1 }], marginLeft:5 }} />
           
            
                <Text style={styles.searchText}>ค้นหา</Text>
                <Text>         </Text>

            </View>
          </TouchableOpacity>
        </View>

        <Category navigation={navigation}/>
        <Recommend />
        <FoodList />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to the top
    backgroundColor: '#2F2C2C',
    padding: 20,
    paddingTop: 30, // Add padding/margin to the top
  },
  search: {
    width: '100%',
    alignItems: 'center', // Center align the button horizontally
  },
  searchButton: {
    borderWidth: 1, // Add border
    borderColor: '#ccc', // Border color
    padding: 10, // Add padding around the text
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  searchText: {
    fontSize: 16,
    color: '#707070',
  
  },
});