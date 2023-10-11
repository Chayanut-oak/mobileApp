import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import { useState } from 'react';
import React from 'react'

const Category = ({ navigation }) => {
  const [images, setimages] = useState([
    {
      mealImage: require('../../picture/image.png'),
      mealCategory: 'Second Item',
    },
    {
      mealImage: require('../../picture/image.png'),
      mealCategory: 'First Item',
    }, {
      mealImage: require('../../picture/image.png'),
      mealCategory: 'First Item',
    }, {
      mealImage: require('../../picture/image.png'),
      mealCategory: 'First Item',
    },
  ]);
  return (
    <View style={{ height: 130, marginTop: 10 }}>

      <FlatList data={images}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (<View style={{ alignItems: 'center', }}>
            <TouchableOpacity onPress={() => navigation.navigate('mealCategories', { Category: item.mealCategory })} style={{ alignItems: 'center', }}>
              <Image
                style={{ flex: 1, width: 100, height: 100, margin: 5, resizeMode: 'contain', }}
                source={item.mealImage}
              /><Text style={{ color: "#D1D1D1" }}>{item.mealName}</Text>
            </TouchableOpacity>
          </View>)
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