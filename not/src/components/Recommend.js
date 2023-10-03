import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { useState } from 'react';
const Recommend = ({ navigation }) => {
  const [Recommend, setRecommend] = useState([
    {
      source: require('../../picture/taohu.png'),
      title: 'เต้าหู้ผัดเสฉวน',
      by:'เชฟโอ็ค ทะลุแม่ครัว'
    },
  ]);
  return (
    <View style={{ alignItems: 'center' }}>
      {Recommend.map((item, index) => (
        <View key={index} style={{ alignItems: 'center', width: 300, marginTop: 10 }}>
          <Text style={{ paddingRight: 190, color: '#C5C5C5', marginBottom: 10 }}>Recommend</Text>
          <Image
            style={{
              resizeMode: 'contain',
              padding: 0,
            }}
            source={item.source}
          />
          <Text style={{ color: 'white', fontSize: 25, alignSelf:'flex-start', color: '#E27E8A' }}>{item.title}</Text>
          <Text style={{ color: 'white', fontSize: 16, paddingRight: 50, color: '#FFFF' }}>{item.by}</Text>
        </View>
      ))}
    </View>
  );
}

export default Recommend;

const styles = StyleSheet.create({});
