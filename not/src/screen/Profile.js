// import proimg from ''
import { StyleSheet, Text, Image, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { collection, doc, setDoc, updateDoc, increment, arrayRemove, arrayUnion, deleteDoc } from 'firebase/firestore';
import { FIRE_STORE } from '../../Firebaseconfig'
import { Feather } from '@expo/vector-icons';
import { saveFollow } from '../../redux/followSlice';
import { resetData } from '../../redux/cookingMethodSlice';
import { getAuth } from 'firebase/auth';
const Profile = ({ navigation }) => {
  const auth = getAuth()
  const dispatch = useDispatch()
  const [tab, setTab] = useState(true)
  const meals = useSelector((state) => state.meal);
  const storeUser = useSelector((state) => state.user)
  const cookStore = useSelector((state) => state.cook)
  const storeAllUser = useSelector((state) => state.allUser)
  const [user, setUser] = useState(null)
  const mapFav = storeUser.favoriteMeals.map(mealId => {
    return meals.find(meal => meal.mealId === mealId)
  }).filter(meal => meal !== undefined);

  const delFav = async (mealId) => {
    for (let i = 0; i < storeAllUser.length; i++) {
      await updateDoc(doc(FIRE_STORE, "users", storeAllUser[i].userId), {
        favoriteMeals: arrayRemove(mealId)
      });
    }
    await deleteDoc(doc(FIRE_STORE, "meals", mealId));
  }

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
  const savefollow = async () => {
    dispatch(saveFollow(storeUser))
  }
  const setEditMeal = async (mealID) => {
    const getMeal = meals.filter((item, index) => item.mealId == mealID)
    dispatch(resetData({ createdBy: getMeal[0].createdBy.userId, like: getMeal[0].like, mealId: mealID, mealImage: getMeal[0].mealImage, mealName: getMeal[0].mealName, mealYoutube: getMeal[0].mealYoutube, reviews: getMeal[0].reviews, steps: getMeal[0].steps, tags: getMeal[0].tags }))

  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.settingconContainer} onPress={() => { navigation.navigate('SettingScreen') }}>
        <Image style={styles.settingIcon}
          source={require("../../picture/settingIcon.png")}
        />
      </TouchableOpacity>
      <Image source={storeUser.userImage.imagePath ? { uri: storeUser.userImage.imagePath } : require("../../picture/image.png")} style={styles.profilepic} />
      <Text style={styles.user}>{storeUser.displayName}</Text>
      <View style={{ flexDirection: 'row', gap: 89, marginTop: 10 }}>
        <Text style={{ color: 'black', fontSize: 30 }}>{storeUser.followed.length}</Text>
        <Text style={{ color: 'black', fontSize: 30 }}>{storeUser.follower.length}</Text>
        <Text style={{ color: 'black', fontSize: 30 }}>{mapOwn.length}</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
        <TouchableOpacity onPress={() => { navigation.navigate('Followed'), savefollow() }}>
          <Text style={{ color: 'black', fontSize: 18 ,fontWeight: 'bold'}}>กำลังติดตาม</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { navigation.navigate('Followed'), savefollow() }}>
          <Text style={{ color: 'black', fontSize: 18 ,fontWeight: 'bold'}}>ผู้ติดตาม</Text>
        </TouchableOpacity>
        <Text style={{ color: 'black', fontSize: 18 ,fontWeight: 'bold'}}>รายการอาหาร</Text>
      </View>
      <View style={{ flexDirection: 'row', marginVertical: 20 }}>
        <TouchableOpacity
          style={{ borderColor: tab ? '#CD2A51' : 'black', borderBottomWidth: 5, flex: 1, alignItems: 'center' }}
          onPress={() => {
            setTab(true)
          }}>
          <Text style={{
            color: tab ? '#CD2A51' : 'black',
            fontSize: 18,
            padding: 5
          }}>เมนูของฉัน</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ borderColor: tab ? 'black' : '#CD2A51', borderBottomWidth: 5, flex: 1, alignItems: 'center' }}
          onPress={() => {
            setTab(false)
          }}>
          <Text style={{
            color: tab ? 'black' : '#CD2A51',
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
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        style={styles.favoriteIcon}
                        source={!storeUser.favoriteMeals.includes(item.mealId) ? require("../../picture/favoriteIcon.png") : require("../../picture/favoriteIconToggle.png")}
                      />
                      <Text style={{ left: 15,marginTop: 15, color: "black", fontSize: 18, fontWeight: "bold" }}>{item.like}</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.shareIconContainer} onPress={() => { navigation.navigate("New"), setEditMeal(item.mealId) }}>

                    <Feather name="edit" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.delIconContainer} onPress={() => { delFav(item.mealId) }}>
                    <Feather name="trash-2" size={24} color="black" />
                  </TouchableOpacity>
                  <View style={styles.textContainer}>

                    <Text style={styles.mealName}>{item.mealName}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
        :
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
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={styles.favoriteIcon}
                      source={!storeUser.favoriteMeals.includes(item.mealId) ? require("../../picture/favoriteIcon.png") : require("../../picture/favoriteIconToggle.png")}
                    />
                    <Text style={{ left:15 ,marginTop: 15, color: "black", fontSize: 18, fontWeight: "bold" }}>{item.like}</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                  <Text style={styles.mealName}>{item.mealName}</Text>
                </View>
              </View></View>
            );
          }}
        />
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
    backgroundColor: '#edebeb',
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
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 0,
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
    backgroundColor: "#edebeb",
  },
  favoriteIcon: {
    width:30,
    height: 50,
    resizeMode: "contain",
    left:10,
  },
  shareIconContainer: {
    position: "absolute",
    top: 70,
    left: 330, // Position at the right
    backgroundColor: "transparent",
  },
  delIconContainer: {
    position: "absolute",
    top: 40,
    left: 270, // Position at the right
    backgroundColor: "transparent",
  },
  shareIcon: {
    width: 30,
    height: 50,
    resizeMode: "contain",
  },
  settingconContainer: {
    position: "absolute",
    top: 10,
    left: 335,
    backgroundColor: "transparent",
  },
  settingIcon: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    left:16
  },
  user: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold'
  },
})