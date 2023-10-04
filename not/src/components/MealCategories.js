import { StyleSheet, Text, View,FlatList,Image } from 'react-native'
import React from 'react'
import { useState } from 'react';

const MealCategories = () => {
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
        },{
          mealImage: require('../../picture/crab.jpg'),
          mealName: 'ปู',
        },{
          mealImage: require('../../picture/crab.jpg'),
          mealName: 'ปู',
        },{
          mealImage: require('../../picture/crab.jpg'),
          mealName: 'ปู',
        },{
          mealImage: require('../../picture/crab.jpg'),
          mealName: 'ปู',
        },{
          mealImage: require('../../picture/crab.jpg'),
          mealName: 'ปู',
        },{
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
                <View key={index} style={styles.item}>
                  <Image
                    style={styles.image}
                    source={item.mealImage}
                  />
                  <Text style={styles.title}>{item.mealName}</Text>
                </View>
              )}
            
            />
          </View>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        marginTop: 10,
        justifyContent:'center',
        alignItems:'center',
       
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
