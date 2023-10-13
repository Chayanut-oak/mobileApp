import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from 'react';

const MealCategories = ({ navigation, route }) => {
  console.log(route)
  const [mealCategories, setmealCategories] = useState([
    {
      mealImage: require('../../picture/crab.jpg'),
      mealName: 'ปู',
    },
    {
      mealImage: require('../../picture/crab.jpg'),
      mealName: 'ปู',
    },
    {
      mealImage: require('../../picture/crab.jpg'),
      mealName: 'ปู',
    },
    {
      mealImage: require('../../picture/crab.jpg'),
      mealName: 'ปู',
    }, {
      mealImage: require('../../picture/crab.jpg'),
      mealName: 'ปู',
    }, {
      mealImage: require('../../picture/crab.jpg'),
      mealName: 'ปู',
    }, {
      mealImage: require('../../picture/crab.jpg'),
      mealName: 'ปู',
    }, {
      mealImage: require('../../picture/crab.jpg'),
      mealName: 'ปู',
    }, {
      mealImage: require('../../picture/crab.jpg'),
      mealName: 'ปู',
    }, {
      mealImage: require('../../picture/crab.jpg'),
      mealName: 'ปู',
    },
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FlatList
          data={mealCategories}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => {
              navigation.navigate("mealDetail", {mealId:""})
            }}>
              <View key={index} style={styles.item}>
                <Image
                  style={styles.image}
                  source={item.mealImage}
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
    height:"90%"
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
