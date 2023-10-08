import { StyleSheet, Text, View,TextInput} from 'react-native'
import React from 'react'
import Filter from '../components/Filter'
const CreateMeal = ({route,navigation}) => {
  return (

   <Filter New='New'></Filter>
      

  )
}

export default CreateMeal

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#D9D9D9',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 50,
    textAlign: 'center',
    flex:6
},  container: {

        justifyContent: 'flex-start', // Align content to the top
        backgroundColor: '#2F2C2C',
   
        height: "100%"
    }})