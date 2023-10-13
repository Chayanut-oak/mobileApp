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
            <TouchableOpacity onPress={() => {
              navigation.navigate("mealDetail", { mealId: item.mealId })
            }}>
              <View key={index} style={styles.item}>
                <Image
                  style={styles.image}
                  source={{ uri: item.mealImage.imagePath }}
                />
                <Text style={styles.title}>{item.mealName}</Text>
              </View>
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
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
    resizeMode: 'contain',
  },
  title: {
    color: "#D1D1D1",
  },
});


export default MealCategories
