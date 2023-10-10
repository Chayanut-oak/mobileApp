import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState, useCallback } from "react";
import YoutubeIframe from "react-native-youtube-iframe";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
const MealDetail = ({ navigation }) => {
  const meal = {
    mealImage:null,
    mealYoutube: "dQw4w9WgXcQ",
    mealName: "MealTest",
    createdBy: {
      userId: "1",
      userName: "createBYGu",
      userImage:null
    },
    like: 23,
    mealCategory: "Clean",
    tags: [
      {
        _id: "6519b019be2ffb1449701923",
        ingredientId:"in000",
        ingredientCategory: "Test",
        ingredientName: "MEAT",
      },
      {
        _id: "6519b398dda6c520a813dcaf",
        ingredientId:"in001",
        ingredientCategory: "Test2",
        ingredientName: "PORK",
      },
    ],
    steps: [
      {
        image:"null",
        text: "dnlgdlsngls;dnfglsjndfglkjndfg;ll;'dl;nl;nsdvldnfln;sg;ldnfgjlkdsn;rennd;l",
      },
      {
        image: null,
        text: "step2",
      },
    ],
    reviews: [
      {
        userName: "Nut2",
        userImage: "image1.png",
        userReview: "reviews",
      },
      {
        userName: "Nut0000",
        userImage: "image1.png",
        userReview: "re",
      },
    ],
    timestamp: "03-10-2023",
  };
  return (
    <View style={styles.container}>
      <ScrollView >
        {/* รูปข้างบน */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: `data:image/jpeg;base64,${meal.mealImage}` }}
          />
          <TouchableOpacity style={styles.favoriteIconContainer}>
            <Image
              style={styles.favoriteIcon}
              source={require("../../picture/favoriteIcon.png")}
            />
          </TouchableOpacity>
        </View>
        {/* ชื่ออาหาร */}
        <Text style={styles.mealName}>{meal.mealName}</Text>
        {/* รายละเอียด */}
        <LinearGradient style={styles.userCard} colors={['#707070', '#464646']}>
          <View style={styles.userLeft}>
            <Text style={styles.userName}>{meal.createdBy.userName}</Text>
            <Text style={styles.timestamp}>สร้างเมื่อ {meal.timestamp}</Text>
          </View>
          <View style={styles.userRight}>
            <TouchableOpacity>
              <Image
                style={styles.userImage}
                source={{
                  uri: `data:image/jpeg;base64,${meal.createdBy.userImage}`,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{
              navigation.navigate("mealReview")
            }}>
             <MaterialCommunityIcons name="comment-text-multiple-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Tags */}
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
        {/* Step */}
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
                    {step.text}
                  </Text>
                </View>
              </View>
              {step.image ? <Image style={styles.stepImage} source={{ uri: `data:image/jpeg;base64,${step.image}` }} /> : null}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
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
