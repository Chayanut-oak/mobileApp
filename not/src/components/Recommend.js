import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const Recommend = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ alignItems: 'center', height: 400, width: 400,marginTop:10 }}>
        <Text style={{paddingRight:190,color:'#C5C5C5',marginBottom:10 }}>Recommend</Text>
        <Image
          style={{
            resizeMode: 'contain',
             width: '100%',padding:0
          }}
          source={require('../../picture/taohu.png')}
        />
        <Text style={{ color: 'white',fontSize:25, paddingRight:100,color:'#E27E8A' }}>เต้าหู้ผัดเสฉวน</Text>
      </View>
    </View>
  );
}

export default Recommend;

const styles = StyleSheet.create({});
