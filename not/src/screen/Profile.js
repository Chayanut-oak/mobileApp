// import proimg from ''
import { StyleSheet, Text, Image, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { collection, doc, setDoc, updateDoc, increment, arrayRemove, arrayUnion } from 'firebase/firestore';
import { FIRE_STORE } from '../../Firebaseconfig'
import { Feather } from '@expo/vector-icons';
const Profile = ({ navigation }) => {
  const [tab, setTab] = useState(true)
  const meals = useSelector((state) => state.meal);
  const storeUser = useSelector((state) => state.user)
  const [user, setUser] = useState(null)
  const mapFav = storeUser.favoriteMeals.map(mealId => {
    return meals.find(meal => meal.mealId === mealId)
  })
  const mapOwn = meals.filter(meal => meal.createdBy.userId == storeUser.userId)
  const addFavorite = (mealId) => {
    const collectUserRef = collection(FIRE_STORE, "users")
    const userRef = doc(collectUserRef, storeUser.userId)
    const collectMealRef = collection(FIRE_STORE, "meals")
    const mealRef = doc(collectMealRef, mealId)
    // dispatch(saveUserData({ favoriteMeals: [...storeUser.favoriteMeals, mealId] }))
    updateDoc(userRef, {
      "favoriteMeals": arrayUnion(mealId),
    });
    updateDoc(mealRef, {
      "like": increment(1)
    });
  }
  const removeFavorite = (mealId) => {
    const collectUserRef = collection(FIRE_STORE, "users")
    const userRef = doc(collectUserRef, storeUser.userId)
    const collectMealRef = collection(FIRE_STORE, "meals")
    const mealRef = doc(collectMealRef, mealId)
    // dispatch(saveUserData({ favoriteMeals: storeUser.favoriteMeals.filter((meal => meal.mealId != mealId)) }))
    updateDoc(userRef, {
      "favoriteMeals": arrayRemove(mealId),
    });
    updateDoc(mealRef, {
      "like": increment(-1)
    });
  }
  return (
    <View style={styles.container}>
      <Image source={storeUser.userImage.imagePath ? { uri: storeUser.userImage.imagePath } : require("../../picture/image.png")} style={styles.profilepic} />
      <Text style={styles.user}>{storeUser.displayName}</Text>
      <View style={{ flexDirection: 'row', gap: 89, marginTop: 10 }}>
        <Text style={{ color: 'white', fontSize: 22 }}>{storeUser.followed.length}</Text>
        <Text style={{ color: 'white', fontSize: 22 }}>{storeUser.follower.length}</Text>
        <Text style={{ color: 'white', fontSize: 22 }}>{mapOwn.length}</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
   
          <Text style={{ color: 'white', fontSize: 18 }}>กำลังติดตาม</Text>
   

        <TouchableOpacity onPress={() => navigation.navigate('Followed',{ ViewUser : storeUser })}>
          <Text style={{ color: 'white', fontSize: 18 }}>ผู้ติดตาม</Text>
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 18 }}>รายการอาหาร</Text>
      </View>
      <View style={{ flexDirection: 'row', marginVertical: 20 }}>
        <TouchableOpacity
          style={{ borderColor: tab ? '#CD2A51' : 'white', borderBottomWidth: 5, flex: 1, alignItems: 'center' }}
          onPress={() => {
            setTab(true)
          }}>
          <Text style={{
            color: tab ? '#CD2A51' : 'white',
            fontSize: 18,
            padding: 5
          }}>เมนูของฉัน</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ borderColor: tab ? 'white' : '#CD2A51', borderBottomWidth: 5, flex: 1, alignItems: 'center' }}
          onPress={() => {
            setTab(false)
          }}>
          <Text style={{
            color: tab ? 'white' : '#CD2A51',
            fontSize: 18,
            padding: 5
          }}>เมนูที่ชอบ</Text>
        </TouchableOpacity>
      </View>

      {tab ?

        <FlatList
          data={mapOwn}
          renderItem={({ item }) => {
            return (
              <View style={{ flexDirection: "row" }}>
                <View style={styles.imageContainer}>
                  <TouchableOpacity style={styles.image} onPress={() => { navigation.navigate("mealDetail", { mealId: item.mealId }) }}>
                    <Image
                      style={styles.image}
                      source={item.mealImage.imagePath ? { uri: item.mealImage.imagePath } : require("../../picture/image.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.favoriteIconContainer} onPress={() => {
                    if (storeUser.favoriteMeals.includes(item.mealId)) {
                      removeFavorite(item.mealId)
                    } else {
                      addFavorite(item.mealId)
                    }
                  }}>
                    <Image
                      style={styles.favoriteIcon}
                      source={!storeUser.favoriteMeals.includes(item.mealId) ? require("../../picture/favoriteIcon.png") : require("../../picture/favoriteIconToggle.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.shareIconContainer} onPress={() => { navigation.navigate("mealDetail", { mealId: item.mealId }) }}>
                    <Feather name="edit" size={24} color="black" />
                  </TouchableOpacity><View style={styles.textContainer}>
                    <Text style={styles.mealName}>{item.mealName}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
        :
        <View>
          <FlatList
            data={mapFav}
            renderItem={({ item }) => {
              return (<View style={{ flexDirection: "row" }}>
                <View style={styles.imageContainer}>
                  <TouchableOpacity style={styles.image} onPress={() => { navigation.navigate("mealDetail", { mealId: item.mealId }) }}>
                    <Image
                      style={styles.image}
                      source={item.mealImage.imagePath ? { uri: item.mealImage.imagePath } : require("../../picture/image.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.favoriteIconContainer} onPress={() => {
                    if (storeUser.favoriteMeals.includes(item.mealId)) {
                      removeFavorite(item.mealId)
                    } else {
                      addFavorite(item.mealId)
                    }
                  }}>
                    <Image
                      style={styles.favoriteIcon}
                      source={!storeUser.favoriteMeals.includes(item.mealId) ? require("../../picture/favoriteIcon.png") : require("../../picture/favoriteIconToggle.png")}
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
  profilepic: {
    alignItems: 'center',
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
  shareIconContainer: {
    position: "absolute",
    top: 40,
    left: 320, // Position at the right
    backgroundColor: "transparent",
  },
  shareIcon: {
    width: 30,
    height: 50,
    resizeMode: "contain",
  },
  user: {
    fontSize: 40,
    color: 'white'
  }
})