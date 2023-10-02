import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { ScrollView } from 'react-native'
import Category from '../components/Category'
import Recommend from '../components/Recommend'
const Home = ({navigation}) => {
  const [selected, setSelected] = React.useState([]);
  const data = [
    { key: '1', value: 'Mobiles' },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers' },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
  ]
  console.log(selected)
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.search}>
          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
            <MultipleSelectList
              setSelected={(val) => setSelected(val)}
              data={data}
              save="value"
              label="Categories"
              boxStyles={{ borderColor: '#D1D1D1' }}
              dropdownStyles={{ borderColor: '#D1D1D1' }}
              inputStyles={{ color: '#FFFFFF' }} // Change the font color to white
              dropdownTextStyles={{ color: '#FFFFFF' }} // Change the font color to white
              labelStyles={{ color: '#FFFFFF' }} // Change the font color to white
              searchicon={<FontAwesome name="search" size={12} color={'#FFFFFF'} />} // Change the icon color to white
              arrowicon={<FontAwesome name="chevron-down" size={12} color={'#FFFFFF'} />} // Change the icon color to white
              placeholder='Search through here'
            />
          </TouchableOpacity>
        </View>
        <View>
        </View>
        <Category></Category>
        <Recommend></Recommend>
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to the top
    backgroundColor: '#2F2C2C',
    padding: 20,
    paddingTop: 30, // Add padding/margin to the top
  }, search: {
    width: '100%'
  }
})