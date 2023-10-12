import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState } from 'react';
const Recommend = ({ navigation }) => {
  const [Recommend, setRecommend] = useState([
    {
      mealImage: require('../../picture/taohu.png'),
      mealName: 'เต้าหู้ผัดเสฉวน',
      createdBy: 'เชฟโอ็ค ทะลุแม่ครัว'
    },
  ]);
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ paddingRight: 190, color: '#C5C5C5', marginBottom: 10 }}>Recommend</Text>
      {Recommend.map((item, index) => (
        <View key={index} style={{ alignItems: 'center', width: 300, marginTop: 10 }}>
          <TouchableOpacity>
            <Image
              style={{
                resizeMode: 'contain',
                padding: 0,
              }}
              source={item.mealImage}
            />
            <Text style={{ color: 'white', fontSize: 25, alignSelf: 'flex-start', color: '#E27E8A' }}>{item.mealName}</Text>
            <Text style={{ color: 'white', fontSize: 16, paddingRight: 50, color: '#FFFF' }}>{item.createdBy}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

export default Recommend;

const styles = StyleSheet.create({});
