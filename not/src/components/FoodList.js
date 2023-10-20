import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import MealDetail from '../screen/MealDetail';
const FoodList = ({ navigation }) => {
  const storeMeal = useSelector((state) => state.meal)
  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };
  const splitImagesIntoPairs = (images) => {
    const pairs = [];
    for (let i = 0; i < 4; i += 2) {
      const pair = images.slice(i, i + 2);
      pairs.push(pair);
    }
    return pairs;
  };
  const imagePairs = splitImagesIntoPairs(shuffle([...storeMeal]))

  // const [imagePairs, setImagePairs] = useState([])
  // useEffect(() => {
  //   if (storeMeal.length != 0) {
  //     let array = [...storeMeal]
  //     setImagePairs(splitImagesIntoPairs(shuffle(array)))

  //   }
  // }, [storeMeal])



  return (
    <View style={styles.container}>
      {imagePairs.map((pair, pairIndex) => (
        <View key={pairIndex} style={styles.row}>
          {pair.map((item, itemIndex) => (
            <TouchableOpacity key={itemIndex} style={styles.item} onPress={() => { navigation.navigate("mealDetail", { mealId: item.mealId }) }}>
              <Image
                style={styles.image}
                source={item.mealImage.imagePath ? { uri: item.mealImage.imagePath } : require("../../picture/image.png")}
              />
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>{item.mealName}</Text>
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "#DD2572" }}>   {item.createdBy.displayName}</Text>
              
            </TouchableOpacity>
            
          ))}
        </View>
      ))}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {

  },
  image: {
    width: 150,
    height: 150,
    marginTop: 5,
    marginBottom: -18,
    resizeMode: 'contain',

  },
  title: {
    textAlign: "left",
    color: "#D1D1D1",
  },
});

export default FoodList;