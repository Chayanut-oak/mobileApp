import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import { useState } from 'react';
import React from 'react'

const Category = () => {
    const [images, setimages] = useState([
        {
            source: require('../../picture/image.png'),
            title: 'First Item',
          },
          {
            source: require('../../picture/image.png'),
            title: 'First Item',
          },{
            source: require('../../picture/image.png'),
            title: 'First Item',
          },{
            source: require('../../picture/image.png'),
            title: 'First Item',
          },
      ]);
    return (
        <View style={{ height: 130, marginTop: 10 }}>
     
                 <FlatList data={images}
             horizontal={true} 
             showsHorizontalScrollIndicator={false} 
                renderItem={({ item }) => {return(<View style={{alignItems: 'center',}}><Image
                           style={{ flex: 1, width: 100, height: 100, margin:5,resizeMode: 'cover' }}
                          source={item.source}
                       /><Text style={{color:"#D1D1D1"}}>{item.title}</Text></View>)}}
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