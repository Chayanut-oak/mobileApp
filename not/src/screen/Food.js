import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MealCategories from '../components/MealCategories'
import SearchBar from '../components/SearchBar'
const Food = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <MealCategories navigation={navigation} category={route.params.categoryId} />
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
    marginTop:-10,
    // justifyContent: 'center', // Align content to the top
    backgroundColor: '#edebeb',
    // padding: 10,
    // paddingTop: 0, // Add padding/margin to the top
  },
})