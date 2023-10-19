import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'
import { useSelector } from 'react-redux';

const Category = ({ navigation }) => {
  const storeMeal = useSelector((state) => state.meal)
  // const [category, setCategory] = useState([])
  const filtered = [...storeMeal].map((val) => {
    tags = val.tags.filter((tag) => tag.ingredientCategory == "หมวดหมู่")
    return { image: val.mealImage, tags: tags }
  })
  const uniqueIngredients = {};
  filtered.forEach(item => {
    item.tags.forEach(tag => {
      const ingredientId = tag.ingredientId;
      const ingredientName = tag.ingredientName;
      if (!uniqueIngredients[ingredientName]) {
        uniqueIngredients[ingredientName] = { ingredientId, image: item.image };
      }
    });
  });
  const result = Object.entries(uniqueIngredients).map(([ingredientName, data]) => ({
    ingredientId: data.ingredientId,
    ingredientName,
    image: data.image
  }));




  return (
    <View style={{ height: 130, marginTop: 10 }}>
      <FlatList data={result}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={{ alignItems: 'center', }}>
              <TouchableOpacity onPress={() => navigation.navigate('mealCategories', { Category: item.ingredientName, categoryId: item.ingredientId })} style={{ alignItems: 'center', }}>
                <Image
                  style={{ flex: 1, width: 100, height: 100, margin: 5, borderRadius: 100, resizeMode: 'contain', }}
                  source={{ uri: item.image.imagePath }}
                /><Text style={{ fontSize: 15, fontWeight: "bold", color: "#D1D1D1" }}>{item.ingredientName}</Text>
              </TouchableOpacity>
            </View>
          )
        }}
      />
    </View>

    // <View style={{ height: 130, width: 130 }}>
    //     <View style={{ flex: 2, padding: 10 }}>
    //         <Image
    //             style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }}
    //             source={require('../../picture/image.png')}
    //         />
    //     </View>

    // </View>
  )
}

export default Category

const styles = StyleSheet.create({})