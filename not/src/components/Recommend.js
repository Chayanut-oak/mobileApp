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
    <View style={{ marginTop: 10, marginBottom: -10, }}>
      <Text style={{ textAlign: "left", color: 'black', fontSize: 25, fontWeight: "bold",marginTop:10,marginLeft:15 }}>Recommend</Text>
      <View style={{ alignItems: "center", width: "100%" }}>
        <TouchableOpacity style={{ marginTop: 10, }} onPress={() => { navigation.navigate("mealDetail", { mealId: recommend.mealId }) }} >
        
        <View style={{ shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5},
    shadowOpacity: 0.3,
    shadowRadius: 2.5, 
    elevation:10}}>
          <Image
            style={{
              width: 300,
              height: 240,
              resizeMode: 'contain',
              padding: 0,
            }}
            source={recommend.mealImage.imagePath ? { uri: recommend.mealImage.imagePath } : require("../../picture/image.png")}
          />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 4 }}>
              <Text style={{ textAlign: "left", fontSize: 22, fontWeight: "bold", color: "black" }}>{recommend.mealName}</Text>
              <Text style={{ textAlign: "left", fontSize: 22, fontWeight: "bold", color: "#DD2572" }}>   {recommend.createdBy?.displayName}</Text>
            </View>
            <View style={{
              flexDirection: "row",
              padding: 0,
              flex: 1,
              marginTop: 10
            }}>
              <Text style={{ color: "black", fontSize: 20, fontWeight: "bold", marginRight: 10 }}>
                {recommend.like}
              </Text>
              <Image style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
              }}
                source={require('../../picture/heartIcon.png')} />

            </View>
          </View>
        </TouchableOpacity>
      </View >
    </View >
  );
}

export default Recommend;

const styles = StyleSheet.create({});
