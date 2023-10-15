import { StyleSheet, Text, Image, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
// import proimg from ''


const Profile = ({navigation}) => {
  const [tab, setTab] = useState(true)
  const meals = useSelector((state) => state.meal);

  return (
    <View style= {styles.container}>
      <View style= {styles.profilepic}>
      {/* <proimg /> */}
      </View>
      <View style={{flexDirection: 'row', gap: 89,marginTop:10}}>
        <Text style ={{color: 'white', fontSize: 22}}>0</Text>
        <Text style ={{color: 'white', fontSize: 22}}>0</Text>
        <Text style ={{color: 'white', fontSize: 22}}>0</Text>
      </View>
      <View style={{flexDirection: 'row', gap: 20,marginTop: 10}}>
        <Text style ={{color: 'white', fontSize: 18}}>กำลังติดตาม</Text>
        <Text style ={{color: 'white', fontSize: 18}}>ผู้ติดตาม</Text>
        <Text style ={{color: 'white', fontSize: 18}}>รายการอาหาร</Text>
      </View>
        <View style={{flexDirection: 'row', marginVertical: 20}}>
          <TouchableOpacity 
            style={{borderColor: tab ? '#CD2A51' : 'white', borderBottomWidth: 5, flex: 1, alignItems: 'center'}}
            onPress={()=>{
            setTab(true)
          }}>
              <Text style={{
                color: tab ? '#CD2A51' : 'white' , 
                fontSize: 18,
                padding: 5
                }}>เมนูของฉัน</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{borderColor: tab ? 'white' : '#CD2A51', borderBottomWidth: 5, flex: 1, alignItems: 'center'}}
            onPress={()=>{
            setTab(false)
          }}>
              <Text style={{
                color: tab ? 'white' : '#CD2A51' , 
                fontSize: 18, 
                padding: 5
                }}>เมนูที่ชอบ</Text>
          </TouchableOpacity>
        </View>

      { tab ? 
      
          <FlatList 
            data={meals}
            renderItem={({item}) => {
              return (<View style={{flexDirection: "row"}}>
              <View style={styles.imageContainer}>
                <Image
                style={styles.image}
                source={{ uri: item.mealImage.imagePath }}
              /><TouchableOpacity style={styles.favoriteIconContainer}>
              <Image
                style={styles.favoriteIcon}
                source={require("../../picture/favoriteIcon.png")}
              />
            </TouchableOpacity><View style={styles.textContainer}>
              <Text style={styles.mealName}>{item.mealName}</Text>
            </View>
              </View></View>
              );
            }}
          />
      :
        <View>
          <FlatList 
            data={meals}
            renderItem={({item}) => {
              return (<View style={{flexDirection: "row"}}>
              <View style={styles.imageContainer}>
                <Image
                style={styles.image}
                source={{ uri: item.mealImage.imagePath }}
                
              /><TouchableOpacity style={styles.favoriteIconContainer}>
              <Image
                style={styles.favoriteIcon}
                source={require("../../picture/favoriteIcon.png")}
              />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.mealName}>{item.mealName}</Text>
            </View>
              </View></View>
              );
            }}
          />
        </View>
      }

    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2F2C2C',
  },
  profilepic:{
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    position: 'relative',
    backgroundColor: 'white',
    width: 110,
    height: 110,
    borderRadius: 600 / 2,
    marginRight: 100,
    marginLeft: 100,
  },
  imageContainer: {
    position: "relative", // This is important for positioning child elements
    flexDirection: "row",
  },
  image: {
    width: 160,
    height: 100,
    marginBottom: 20,
    alignItems: 'flex-start',
    marginRight: 200,
  },
  mealName: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
    position: "absolute",
  },
  textContainer: {
    top: 20,
    left: 170,
    alignItems: 'flex-start',
    position: "absolute", // คำสั่งนี้จะจัดให้อยู่ด้านซ้าย
    flexDirection: 'row',
  },
  favoriteIconContainer: {
    position: "absolute",
    bottom: 10, // Position at the bottom
    left: 160, // Position at the right
    backgroundColor: "transparent",
  },
  favoriteIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
})