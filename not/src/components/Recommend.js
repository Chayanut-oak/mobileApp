import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const Recommend = ({ navigation }) => {
  const storeMeal = useSelector((state) => state.meal)
  const [recommend, setRecommend] = useState(null)
  useEffect(() => {
    if (storeMeal.length != 0) {
      setRecommend(findRec(storeMeal))
    }
  }, [storeMeal])


  const findRec = (listMeal) => {
    return listMeal.reduce((accumulator, current) => {
      return accumulator.like > current.like ? accumulator : current;
    });
  }
  if (!recommend) {
    return (
      <Text></Text>
    )
  }

  return (
    <View style={{ marginTop: 10, marginBottom: -10 }}>
      <Text style={{ textAlign: "left", color: '#C5C5C5', fontSize: 16, fontWeight: "bold" }}>Recommend</Text>
      <View style={{ alignItems: "center", width: "100%" }}>
        <TouchableOpacity style={{ marginTop: 10 }} onPress={() => { navigation.navigate("mealDetail", { mealId: recommend.mealId }) }} >
          <Image
            style={{
              width: 300,
              height: 240,
              resizeMode: 'contain',
              padding: 0,
            }}
            source={recommend.mealImage.imagePath ? { uri: recommend.mealImage.imagePath } : require("../../picture/image.png")}
          />
          <Text style={{ textAlign: "left", fontSize: 22, fontWeight: "bold", color: "white" }}>{recommend.mealName}</Text>
          <Text style={{ textAlign: "left", fontSize: 22, fontWeight: "bold", color: "#DD2572" }}>   {recommend.createdBy?.displayName}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Recommend;

const styles = StyleSheet.create({});
