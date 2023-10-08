import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
const SearchBar = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')} style={{ width: '100%' }}>
      <View style={styles.searchButton}>
        <FontAwesome name="search" size={24} color="#D1D1D1" style={{ transform: [{ scaleX: -1 }], marginLeft: 5 }} />
        <Text style={styles.searchText}>ค้นหา</Text>
        <Text>         </Text>
      </View>
    </TouchableOpacity>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  searchButton: {
    borderWidth: 1, // Add border
    borderColor: '#ccc', // Border color
    padding: 10, // Add padding around the text
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchText: {
    fontSize: 16,
    color: '#707070',

  },
})