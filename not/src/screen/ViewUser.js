import { StyleSheet, Text, Image, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
// import proimg from ''
import { collection, addDoc, updateDoc, doc, arrayRemove, increment, arrayUnion } from 'firebase/firestore';
import { FIRE_STORE } from '../../Firebaseconfig';
import { saveFollow } from '../../redux/followSlice';
const ViewUser = ({ navigation, route }) => {
  const [tab, setTab] = useState(true)
  const dispatch = useDispatch()
  const meals = useSelector((state) => state.meal);
  const curUser = useSelector((state) => state.user)
  const user = route.params.user
  const allUser = useSelector((state) => state.allUser)
  const followUser = useSelector((state) => state.follow)
  const viewUser = allUser.find((allUserItem) => allUserItem.userId === user.userId)
  const mapFav = viewUser.favoriteMeals.map(mealId => {
    return meals.find(meal => meal.mealId === mealId)
  })

  const mapOwn = meals.filter(meal => meal.createdBy.userId == viewUser.userId)
  const follow = async () => {
    await updateDoc(doc(FIRE_STORE, "users", curUser.userId), {
      followed: arrayUnion(...[user.userId])
    });
    await updateDoc(doc(FIRE_STORE, "users", user.userId), {
      follower: arrayUnion(...[curUser.userId])
    });
  }
  const unfollow = async (uid) => {
    await updateDoc(doc(FIRE_STORE, "users", curUser.userId), {
      followed: arrayRemove(...[user.userId])
    });
    await updateDoc(doc(FIRE_STORE, "users", user.userId), {
      follower: arrayRemove(...[curUser.userId])
    });
  }
  const addFavorite = (mealId) => {
    const collectUserRef = collection(FIRE_STORE, "users")
    const userRef = doc(collectUserRef, curUser.userId)
    const collectMealRef = collection(FIRE_STORE, "meals")
    const mealRef = doc(collectMealRef, mealId)
    // dispatch(saveUserData({ favoriteMeals: [...curUser.favoriteMeals, mealId] }))
    updateDoc(userRef, {
      "favoriteMeals": arrayUnion(mealId),
    });
    updateDoc(mealRef, {
      "like": increment(1)
    });
  }

  const removeFavorite = (mealId) => {
    const collectUserRef = collection(FIRE_STORE, "users")
    const userRef = doc(collectUserRef, curUser.userId)
    const collectMealRef = collection(FIRE_STORE, "meals")
    const mealRef = doc(collectMealRef, mealId)
    // dispatch(saveUserData({ favoriteMeals: curUser.favoriteMeals.filter((meal => meal.mealId != mealId)) }))
    updateDoc(userRef, {
      "favoriteMeals": arrayRemove(mealId),
    });
    updateDoc(mealRef, {
      "like": increment(-1)
    });
  }
  const savefollow = async () => {
    dispatch(saveFollow(user))
  }
  return (
    <View style={styles.container}>
      {curUser.followed.filter((item) => item.userId == viewUser.userId).length == 0 ? <TouchableOpacity style={styles.rightCornerButton} onPress={() => follow()}>
        <LinearGradient colors={['#DD2572', '#F02E5D']} style={styles.TouchableOpacity}>
          <Text style={styles.centeredText}>ติดตาม</Text>
        </LinearGradient>
      </TouchableOpacity> : null}
      {curUser.followed.filter((item) => item.userId == viewUser.userId).length != 0 ? <TouchableOpacity style={styles.rightCornerButton} onPress={() => unfollow()}>
        <LinearGradient colors={['#DD2572', '#F02E5D']} style={styles.TouchableOpacity}>
          <Text style={styles.centeredText}>ยกเลิกติดตาม</Text>
        </LinearGradient>
      </TouchableOpacity> : null}
      <Image source={{ uri: viewUser.userImage.imagePath }} style={styles.profilepic}>
      </Image>
      <Text style={styles.user}>{user.displayName}</Text>
      <View style={{ flexDirection: 'row', gap: 89, marginTop: 10 }}>
        <Text style={{ color: 'white', fontSize: 22 }}>{viewUser.followed.length}</Text>
        <Text style={{ color: 'white', fontSize: 22 }}>{viewUser.follower.length}</Text>
        <Text style={{ color: 'white', fontSize: 22 }}>{mapOwn.length}</Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
        <TouchableOpacity onPress={() => { navigation.navigate('Followed'), savefollow() }}>
          <Text style={{ color: 'white', fontSize: 18 }}>กำลังติดตาม</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('Followed'), savefollow() }}>
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
            return (<View style={{ flexDirection: "row" }}>
              <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.image} onPress={() => { navigation.navigate("mealDetail", { mealId: item.mealId }) }}>
                  <Image
                    style={styles.image}
                    source={{ uri: item.mealImage.imagePath }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.favoriteIconContainer} onPress={() => {
                  if (curUser.favoriteMeals.includes(item.mealId)) {
                    removeFavorite(item.mealId)
                  } else {
                    addFavorite(item.mealId)
                  }
                }}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={styles.favoriteIcon}
                      source={!curUser.favoriteMeals.includes(item.mealId) ? require("../../picture/favoriteIcon.png") : require("../../picture/favoriteIconToggle.png")}
                    />
                    <Text style={{ marginTop: 15, color: "white", fontSize: 18, fontWeight: "bold" }}>{item.like}</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.textContainer}>
                  <Text style={styles.mealName}>{item.mealName}</Text>
                </View>
              </View></View>
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
                    source={{ uri: item.mealImage.imagePath }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.favoriteIconContainer} onPress={() => {
                  if (curUser.favoriteMeals.includes(item.mealId)) {
                    removeFavorite(item.mealId)
                  } else {
                    addFavorite(item.mealId)
                  }
                }}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={styles.favoriteIcon}
                      source={!curUser.favoriteMeals.includes(item.mealId) ? require("../../picture/favoriteIcon.png") : require("../../picture/favoriteIconToggle.png")}
                    />
                    <Text style={{ marginTop: 15, color: "white", fontSize: 18, fontWeight: "bold" }}>{item.like}</Text>
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

export default ViewUser

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2F2C2C',
  },
  profilepic: {
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
  shareIconContainer: {
    position: "absolute",
    bottom: 30, // Position at the bottom
    left: 320, // Position at the right
    backgroundColor: "transparent",
  },
  shareIcon: {
    width: 30,
    height: 50,
    resizeMode: "contain",
  }, centeredText: {
    textAlign: 'center', // Add this style to center the text horizontally
    color: 'white'
  }, TouchableOpacity: {
    borderColor: 'rgba(0,0,0,0.2)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 'auto',
    marginRight: 5,
  },
  rightCornerButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  }, user: {
    fontSize: 40,
    color: 'white'
  }
})