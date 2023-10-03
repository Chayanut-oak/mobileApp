import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MealDetail = ({ route }) => {
  const meal = {
    "mealImage": "image1.png",
    "mealName": "MealTest",
    "createdBy": {
      "_id": "1",
      "userName": "Nut2",
      "userImage": "image1.png"
    },
    "like": 23,
    "mealCategory": "Clean",
    "tags": [
      {
        "_id": "6519b019be2ffb1449701923",
        "ingredientCategory": "Test",
        "ingredientName": "Nut",
        "_class": "com.example.backend.Pojo.Ingredient"
      },
      {
        "_id": "6519b398dda6c520a813dcaf",
        "ingredientCategory": "Test2",
        "ingredientName": "Nut2",
        "_class": "com.example.backend.Pojo.Ingredient"
      }
    ],
    "steps": [
      {
        "image": "image1.png",
        "text": "step1"
      },
      {
        "image": "image2.png",
        "text": "step2"
      }
    ],
    "reviews": [
      {
        "_id": "1",
        "userName": "Nut2",
        "userImage": "image1.png",
        "userReview": "reviews"
      },
      {
        "_id": "2",
        "userName": "Nut0000",
        "userImage": "image1.png",
        "userReview": "re"
      }
    ],
    "timestamp": "03-10-2023"
  }


  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.image}
          source={item.source || require('../../picture/crab.jpg')}
        />
      </ScrollView>
    </View>
  )
}

export default MealDetail

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
    justifyContent: 'space-between'
  },
  searchText: {
    fontSize: 16,
    color: '#707070',

  },
});