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
const MealDetail = ({ route }) => {
  const meal = {
    mealImage:
      "iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAA2BJREFUaEPtmj9o6kAcx3+li0ih4FLq2HZ2bgeduruJFEeplEoLDtXFyamLOBQK6iK0Ih0K3bvo5ODk0kUEoUR0ECwi7eTjd4/kXWKSu1wurSkvk+clv/t+fv9O4m31er1VKBSCQCAAfrw+Pz9hNpvB1nA4XOGHo6Mj2N3d9RXLfD6HwWAAGIgtRVFWwWCQfOEnGBUCNS+Xy78g+/v7QE9semSMWsfj8T8QzCk/wJhpXAPZdBgrR5uCbCqMXbZYgmwaDCvlbUE2BYYFgTqZID8NwwPBDfJTMLwQjkC+G8YJhGOQ74JxCiEE4jWMCIQwiFcwohCuQGTDuIFwDSILxi2EFBC3MDIgpIGIwsiCkAriFEYmhHQQXhjZEJ6AsGC8gPAMxArGKwhPQYwwOPby5QbXz3gUIXqpUcDnvXxD8x+EJ0J0Tfg2tcwK23fFbifYKxjpNcIjlOcentSl75EK4kSgk3t5oKSBiAgTecYKSgqIG0FunpWaWjKEyLDhKiIyBKhedWtLGMTtwma57samEIibBVkdSNS2YxDRhVgA9LzIGo5A6AW2t7fh4uICHh4eNA03Nzdwe3tLxv1+H5LJJLy9vUEqlYL7+3vY2dmx5VksFms2r6+voVKpMG1ygxi9NJlM4Pz8HEqlEkQiEZ1AVVA0GoWzszMiDj/j/XaX0aaZ46xscoGYhRo9XiwWoVqtwt7enk4fzmWzWbi7uyOQr6+v0Gg0mFExs6mu/fX1BYVCwdImE8QqX+3E4RxG6unpiUDS43K5DN1uVzd3dXUFrVYLptOpKTBqaDabJI2fn5/XbOIawn+9YSQymYwWiVgsphNHR8Do6Xw+T57L5XKQSCRIZE9PT0l0rWy+vLyQ+VqtBuFwmNQgnRHCf4aiGEVRtHShx+hxOxCsBQTodDpANwiWzXq9DpeXlyRdR6MRG0Sk/dF1gSlilVpqPaF3Hx8ftSiaNQEzmwjz8fEB7+/vgGmqpq+0AwN0qNHjdNiN9aQKRPEnJydayzbCWNnEwz9YM+12GxAM27oOhDcSdHvFlqqOMXdxH7Frv/RcPB7XauT4+FjXplk20+k0HB4ektTE4yYaiNNDNcbNy7jpmW2I6HHcU/BSN0iMltq1Dg4OdBsiyyY6DQG0QzW/5pjTbzl49gfcxOo1RgS8SgAAAABJRU5ErkJggg==",
    mealYoutube: "dQw4w9WgXcQ",
    mealName: "MealTest",
    createdBy: {
      _id: "1",
      userName: "createBYGu",
      userImage:
        "iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAA2BJREFUaEPtmj9o6kAcx3+li0ih4FLq2HZ2bgeduruJFEeplEoLDtXFyamLOBQK6iK0Ih0K3bvo5ODk0kUEoUR0ECwi7eTjd4/kXWKSu1wurSkvk+clv/t+fv9O4m31er1VKBSCQCAAfrw+Pz9hNpvB1nA4XOGHo6Mj2N3d9RXLfD6HwWAAGIgtRVFWwWCQfOEnGBUCNS+Xy78g+/v7QE9semSMWsfj8T8QzCk/wJhpXAPZdBgrR5uCbCqMXbZYgmwaDCvlbUE2BYYFgTqZID8NwwPBDfJTMLwQjkC+G8YJhGOQ74JxCiEE4jWMCIQwiFcwohCuQGTDuIFwDSILxi2EFBC3MDIgpIGIwsiCkAriFEYmhHQQXhjZEJ6AsGC8gPAMxArGKwhPQYwwOPby5QbXz3gUIXqpUcDnvXxD8x+EJ0J0Tfg2tcwK23fFbifYKxjpNcIjlOcentSl75EK4kSgk3t5oKSBiAgTecYKSgqIG0FunpWaWjKEyLDhKiIyBKhedWtLGMTtwma57samEIibBVkdSNS2YxDRhVgA9LzIGo5A6AW2t7fh4uICHh4eNA03Nzdwe3tLxv1+H5LJJLy9vUEqlYL7+3vY2dmx5VksFms2r6+voVKpMG1ygxi9NJlM4Pz8HEqlEkQiEZ1AVVA0GoWzszMiDj/j/XaX0aaZ46xscoGYhRo9XiwWoVqtwt7enk4fzmWzWbi7uyOQr6+v0Gg0mFExs6mu/fX1BYVCwdImE8QqX+3E4RxG6unpiUDS43K5DN1uVzd3dXUFrVYLptOpKTBqaDabJI2fn5/XbOIawn+9YSQymYwWiVgsphNHR8Do6Xw+T57L5XKQSCRIZE9PT0l0rWy+vLyQ+VqtBuFwmNQgnRHCf4aiGEVRtHShx+hxOxCsBQTodDpANwiWzXq9DpeXlyRdR6MRG0Sk/dF1gSlilVpqPaF3Hx8ftSiaNQEzmwjz8fEB7+/vgGmqpq+0AwN0qNHjdNiN9aQKRPEnJydayzbCWNnEwz9YM+12GxAM27oOhDcSdHvFlqqOMXdxH7Frv/RcPB7XauT4+FjXplk20+k0HB4ektTE4yYaiNNDNcbNy7jpmW2I6HHcU/BSN0iMltq1Dg4OdBsiyyY6DQG0QzW/5pjTbzl49gfcxOo1RgS8SgAAAABJRU5ErkJggg==",
    },
    like: 23,
    mealCategory: "Clean",
    tags: [
      {
        _id: "6519b019be2ffb1449701923",
        ingredientCategory: "Test",
        ingredientName: "MEAT",
      },
      {
        _id: "6519b398dda6c520a813dcaf",
        ingredientCategory: "Test2",
        ingredientName: "PORK",
      },
    ],
    steps: [
      {
        image: "image1.png",
        text: "dnlgdlsngls;dnfglsjndfglkjndfg;ll;'dl;nl;nsdvldnfln;sg;ldnfgjlkdsn;rennd;l",
      },
      {
        image: "image2.png",
        text: "step2",
      },
    ],
    reviews: [
      {
        _id: "1",
        userName: "Nut2",
        userImage: "image1.png",
        userReview: "reviews",
      },
      {
        _id: "2",
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
            <TouchableOpacity>
              <Image
                style={styles.commentIcon}
                source={require("../../picture/commentIcon.png")}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Tags */}
        <View style={styles.tags}>
          {meal.tags.map((tag, index) => (
            <LinearGradient style={styles.tag}
              colors={['#DD2572', '#F02E5D']}>
              <Text key={index} style={{ color: "#fff" }}>
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
            <View style={styles.stepCard}>
              <LinearGradient style={styles.stepNo} colors={['#DD2572', '#F02E5D']}>
                <Text>
                  {index}
                </Text>
              </LinearGradient>
              <View style={styles.stepDetail}>
                <Text key={index} style={styles.stepText}>
                  {step.text}
                </Text>
              </View>

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
    paddingTop: 50,
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
    marginTop:15
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
    paddingTop:10,
    padding: 15,
    paddingLeft:20,
    marginLeft:-10,
    zIndex:-2,
    borderRadius: 20,
    backgroundColor: "#fff"
  }
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start', // Align content to the top
//     backgroundColor: '#2F2C2C',
//     padding: 20,
//     paddingTop: 100, // Add padding/margin to the top
//   },
//   search: {
//     width: '100%',
//     alignItems: 'center', // Center align the button horizontally
//   },
//   searchButton: {
//     borderWidth: 1, // Add border
//     borderColor: '#ccc', // Border color
//     padding: 10, // Add padding around the text
//     borderRadius: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between'
//   },
//   searchText: {
//     fontSize: 16,
//     color: '#707070',

//   },
//   image: {
//     width: 'full',
//     height: 100,
//     borderRadius: 18,

//   },
//   icon:{
//     width: 50,
//     height:50,
//     // borderRadius:20
//   }
// });
