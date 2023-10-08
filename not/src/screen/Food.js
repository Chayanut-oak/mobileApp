import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MealCategories from '../components/MealCategories'
import SearchBar from '../components/SearchBar'
const Food = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <SearchBar navigation={navigation} />
      </View>
      <MealCategories navigation={navigation}/>
      

    </View>
  )
}

export default Food

const styles = StyleSheet.create({
  search: {
    width: '100%',
    alignItems: 'center', // Center align the button horizontally
  }, container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to the top
    backgroundColor: '#2F2C2C',
    padding: 20,
    paddingTop: 20, // Add padding/margin to the top
  },
})