import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const MealCategories = ({ navigation, category }) => {
  const mealStore = useSelector(state => state.meal);
  const [mealList, setMealList] = useState([]);

  useEffect(() => {
    const filteredData = mealStore.filter(item => {
      return item.tags.some(tag => tag.ingredientId === category);
    });
    setMealList(filteredData);
  }, [mealStore]);

  return (
    <View style={styles.container}>
      <FlatList
        data={mealList}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} style={styles.item} onPress={() => {
            navigation.navigate("mealDetail", { mealId: item.mealId });
          }}>
            <Image
              style={styles.image}
              source={{ uri: item.mealImage.imagePath }}
            />
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>{item.mealName}</Text>
            <Text style={{ fontSize: 15, fontWeight: "bold", color: "#DD2572" }}>{item.createdBy.displayName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  flatListContainer: {
    justifyContent: 'center',
    // alignItems: 'center',
  },
  item: {
    marginHorizontal: 10,
  },
  image: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
    marginBottom:-12
  },
  title: {
    color: "#D1D1D1",
  },
});

export default MealCategories;
