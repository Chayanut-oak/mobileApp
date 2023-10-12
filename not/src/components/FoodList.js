import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const FoodList = () => {
  const storeMeal = useSelector((state) => state.meal)
  const [imagePairs, setImagePairs] = useState([])
  useEffect(() => {
    if (storeMeal.length != 0) {
      let array = [...storeMeal]
      setImagePairs(splitImagesIntoPairs(shuffle(array)))
    }
  }, [storeMeal])

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };



  const splitImagesIntoPairs = (images) => {
    const pairs = [];
    for (let i = 0; i < 4; i += 2) {
      const pair = images.slice(i, i + 2);
      pairs.push(pair);
    }
    console.log(JSON.stringify(pairs))
    return pairs;
  };


  return (
    <View style={styles.container}>
      {imagePairs.map((pair, pairIndex) => (
        <View key={pairIndex} style={styles.row}>
          {pair.map((item, itemIndex) => (
            <View key={itemIndex} >
              <TouchableOpacity style={styles.item}>
                <Image
                  style={styles.image}
                  source={item.mealImage.imagePath ? { uri: item.mealImage.imagePath } : require("../../picture/image.png")}
                />
                <Text style={styles.title}>{item.mealName}</Text>
              </TouchableOpacity>
            </View>
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

export default FoodList;