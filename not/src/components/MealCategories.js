import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';

const MealCategories = ({ navigation, category }) => {
  const mealStore = useSelector(state => state.meal)
  const [mealList, setMealList] = useState([])
  useEffect(() => {
    const filteredData = mealStore.filter(item => {
      return item.tags.some(tag => tag.ingredientId === category);
    });
    setMealList(filteredData)
  }, [mealStore])
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FlatList
          data={mealList}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={index} style={styles.item} onPress={() => {
              navigation.navigate("mealDetail", { mealId: item.mealId })
            }}>
              <Image
                style={styles.image}
                source={{ uri: item.mealImage.imagePath }}
              />
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>{item.mealName}</Text>
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "#DD2572" }}>   {item.createdBy.displayName}</Text>
            </TouchableOpacity>

          )}

        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: "90%"
  },
  row: {
    justifyContent: 'space-around',
  },
  item: {
    marginHorizontal:15
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 5,
    marginBottom: -18,
    resizeMode: 'contain',
  },
  title: {
    color: "#D1D1D1",
  },
});


export default MealCategories
