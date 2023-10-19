import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import YoutubeIframe from "react-native-youtube-iframe";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { saveUserData } from "../../redux/userSlice";
import { collection, doc, setDoc, updateDoc, increment, arrayRemove, arrayUnion } from 'firebase/firestore';
import { FIRE_STORE } from '../../Firebaseconfig'
const MealDetail = ({ navigation, route }) => {
  const mealId = route.params.mealId
  const storeMeal = useSelector((state) => state.meal)
  const storeAllUser = useSelector((state) => state.allUser)
  const storeIngredient = useSelector((state) => state.ingredient)
  const storeUser = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const [meal, setMeal] = useState(null)
  useEffect(() => {
    const selectedMeal = storeMeal.find(item => item.mealId === mealId);

    setMeal(selectedMeal)
  }, [storeMeal, mealId])

  const addFavorite = () => {
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

  const removeFavorite = () => {
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
  if (!meal) {
    return (
      <Text></Text>
    )
  }

  return (
    <ScrollView style={{ backgroundColor: '#2F2C2C' }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={meal.mealImage.imagePath ? { uri: meal.mealImage.imagePath } : require("../../picture/image.png")}
          />
          <TouchableOpacity style={styles.favoriteIconContainer} onPress={() => {
            if (storeUser.favoriteMeals.includes(mealId)) {
              removeFavorite()
            } else {
              addFavorite()
            }
          }}>
            <Image
              style={styles.favoriteIcon}
              source={!storeUser.favoriteMeals.includes(mealId) ? require("../../picture/favoriteIcon.png") : require("../../picture/favoriteIconToggle.png")}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.mealName}>{meal.mealName}</Text>
        <LinearGradient style={styles.userCard} colors={['#707070', '#464646']}>
          <View style={styles.userLeft}>
            <Text style={styles.userName}>{meal.createdBy.displayName}</Text>
          </View>
          <View style={styles.userRight}>
            <TouchableOpacity onPress={() => { navigation.navigate('ViewUser', { User: meal.createdBy }) }}>
              <Image
                style={styles.userImage}
                source={meal.createdBy.userImage.imagePath ? { uri: meal.createdBy.userImage.imagePath } : require("../../picture/image.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigation.navigate("mealReview", { mealId: mealId })
            }}>
              <MaterialCommunityIcons name="comment-text-multiple-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.tags}>
          {meal.tags.map((tag, index) => (
            <LinearGradient key={index} style={styles.tag}
              colors={['#DD2572', '#F02E5D']}>
              <Text style={{ color: "#fff" }}>
                {tag.ingredientName}
              </Text>
            </LinearGradient>
          ))}
        </View>
        <View style={styles.youtubeContainer}>
          <Text style={styles.stepsHeader}>ขั้นตอนการทำ</Text>
          {meal.mealYoutube ? (
            <YoutubeIframe height={200} videoId={meal.mealYoutube} />
          ) : null}
          {meal.steps.map((step, index) => (
            <View key={index} style={{ alignItems: "flex-end", }}>
              <View style={styles.stepCard}>
                <LinearGradient style={styles.stepNo} colors={['#DD2572', '#F02E5D']}>
                  <Text>
                    {index + 1}
                  </Text>
                </LinearGradient>
                <View style={styles.stepDetail}>
                  <Text style={styles.stepText}>
                    {step.stepDetail}
                  </Text>
                </View>
              </View>
              {step.stepImage ? <Image style={styles.stepImage} source={{ uri: step.stepImage.imagePath }} /> : null}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>

  );
};

export default MealDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2F2C2C",
    padding: 20,

  },
  imageContainer: {
    position: "relative", // This is important for positioning child elements
  },
  image: {
    width: "100%",
    height: 240,
    marginRight: 10,
    resizeMode: "stretch",
  },
  favoriteIconContainer: {
    position: "absolute",
    bottom: 10, // Position at the bottom
    right: 10, // Position at the right
    backgroundColor: "transparent", // Make sure this container is transparent
  },
  favoriteIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  mealName: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center"
  },
  userCard: {
    padding: 15,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,

  },
  userLeft: {
    flex: 3
  },
  userRight: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  userName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  timestamp: {
    color: "#909090",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    resizeMode: "contain",
  },
  commentIcon: {
    marginTop: 12,
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  tags: {
    flexDirection: "row",
    marginTop: 10,
  },
  tag: {

    padding: 5,
    marginRight: 5,
    borderRadius: 5,
  },
  youtubeContainer: {
    marginTop: 20,
  },
  stepsHeader: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
  },
  stepText: {
    fontSize: 16,
    marginTop: 5,
  },
  stepCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15
  },
  stepNo: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 80,

  },
  stepDetail: {
    flex: 4,
    paddingTop: 10,
    padding: 15,
    paddingLeft: 20,
    marginLeft: -10,
    zIndex: -2,
    borderRadius: 20,
    backgroundColor: "#fff"
  },
  stepImage: {
    marginTop: 10,
    width: "90%",
    height: 150,
    marginRight: 10,
    resizeMode: "stretch",
  }
});
