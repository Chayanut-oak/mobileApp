import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useCallback } from 'react'
import YoutubeIframe from 'react-native-youtube-iframe'

const MealDetail = ({ route }) => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  const meal = {
    "mealImage": 
    "iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAA2BJREFUaEPtmj9o6kAcx3+li0ih4FLq2HZ2bgeduruJFEeplEoLDtXFyamLOBQK6iK0Ih0K3bvo5ODk0kUEoUR0ECwi7eTjd4/kXWKSu1wurSkvk+clv/t+fv9O4m31er1VKBSCQCAAfrw+Pz9hNpvB1nA4XOGHo6Mj2N3d9RXLfD6HwWAAGIgtRVFWwWCQfOEnGBUCNS+Xy78g+/v7QE9semSMWsfj8T8QzCk/wJhpXAPZdBgrR5uCbCqMXbZYgmwaDCvlbUE2BYYFgTqZID8NwwPBDfJTMLwQjkC+G8YJhGOQ74JxCiEE4jWMCIQwiFcwohCuQGTDuIFwDSILxi2EFBC3MDIgpIGIwsiCkAriFEYmhHQQXhjZEJ6AsGC8gPAMxArGKwhPQYwwOPby5QbXz3gUIXqpUcDnvXxD8x+EJ0J0Tfg2tcwK23fFbifYKxjpNcIjlOcentSl75EK4kSgk3t5oKSBiAgTecYKSgqIG0FunpWaWjKEyLDhKiIyBKhedWtLGMTtwma57samEIibBVkdSNS2YxDRhVgA9LzIGo5A6AW2t7fh4uICHh4eNA03Nzdwe3tLxv1+H5LJJLy9vUEqlYL7+3vY2dmx5VksFms2r6+voVKpMG1ygxi9NJlM4Pz8HEqlEkQiEZ1AVVA0GoWzszMiDj/j/XaX0aaZ46xscoGYhRo9XiwWoVqtwt7enk4fzmWzWbi7uyOQr6+v0Gg0mFExs6mu/fX1BYVCwdImE8QqX+3E4RxG6unpiUDS43K5DN1uVzd3dXUFrVYLptOpKTBqaDabJI2fn5/XbOIawn+9YSQymYwWiVgsphNHR8Do6Xw+T57L5XKQSCRIZE9PT0l0rWy+vLyQ+VqtBuFwmNQgnRHCf4aiGEVRtHShx+hxOxCsBQTodDpANwiWzXq9DpeXlyRdR6MRG0Sk/dF1gSlilVpqPaF3Hx8ftSiaNQEzmwjz8fEB7+/vgGmqpq+0AwN0qNHjdNiN9aQKRPEnJydayzbCWNnEwz9YM+12GxAM27oOhDcSdHvFlqqOMXdxH7Frv/RcPB7XauT4+FjXplk20+k0HB4ektTE4yYaiNNDNcbNy7jpmW2I6HHcU/BSN0iMltq1Dg4OdBsiyyY6DQG0QzW/5pjTbzl49gfcxOo1RgS8SgAAAABJRU5ErkJggg=="
    ,    
    "mealYoutube": "dQw4w9WgXcQ",
    "mealName": "MealTest",
    "createdBy": {
      "_id": "1",
      "userName": "createBYGu",
      "userImage": "iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAA2BJREFUaEPtmj9o6kAcx3+li0ih4FLq2HZ2bgeduruJFEeplEoLDtXFyamLOBQK6iK0Ih0K3bvo5ODk0kUEoUR0ECwi7eTjd4/kXWKSu1wurSkvk+clv/t+fv9O4m31er1VKBSCQCAAfrw+Pz9hNpvB1nA4XOGHo6Mj2N3d9RXLfD6HwWAAGIgtRVFWwWCQfOEnGBUCNS+Xy78g+/v7QE9semSMWsfj8T8QzCk/wJhpXAPZdBgrR5uCbCqMXbZYgmwaDCvlbUE2BYYFgTqZID8NwwPBDfJTMLwQjkC+G8YJhGOQ74JxCiEE4jWMCIQwiFcwohCuQGTDuIFwDSILxi2EFBC3MDIgpIGIwsiCkAriFEYmhHQQXhjZEJ6AsGC8gPAMxArGKwhPQYwwOPby5QbXz3gUIXqpUcDnvXxD8x+EJ0J0Tfg2tcwK23fFbifYKxjpNcIjlOcentSl75EK4kSgk3t5oKSBiAgTecYKSgqIG0FunpWaWjKEyLDhKiIyBKhedWtLGMTtwma57samEIibBVkdSNS2YxDRhVgA9LzIGo5A6AW2t7fh4uICHh4eNA03Nzdwe3tLxv1+H5LJJLy9vUEqlYL7+3vY2dmx5VksFms2r6+voVKpMG1ygxi9NJlM4Pz8HEqlEkQiEZ1AVVA0GoWzszMiDj/j/XaX0aaZ46xscoGYhRo9XiwWoVqtwt7enk4fzmWzWbi7uyOQr6+v0Gg0mFExs6mu/fX1BYVCwdImE8QqX+3E4RxG6unpiUDS43K5DN1uVzd3dXUFrVYLptOpKTBqaDabJI2fn5/XbOIawn+9YSQymYwWiVgsphNHR8Do6Xw+T57L5XKQSCRIZE9PT0l0rWy+vLyQ+VqtBuFwmNQgnRHCf4aiGEVRtHShx+hxOxCsBQTodDpANwiWzXq9DpeXlyRdR6MRG0Sk/dF1gSlilVpqPaF3Hx8ftSiaNQEzmwjz8fEB7+/vgGmqpq+0AwN0qNHjdNiN9aQKRPEnJydayzbCWNnEwz9YM+12GxAM27oOhDcSdHvFlqqOMXdxH7Frv/RcPB7XauT4+FjXplk20+k0HB4ektTE4yYaiNNDNcbNy7jpmW2I6HHcU/BSN0iMltq1Dg4OdBsiyyY6DQG0QzW/5pjTbzl49gfcxOo1RgS8SgAAAABJRU5ErkJggg=="
    },
    "like": 23,
    "mealCategory": "Clean",
    "tags": [
      {
        "_id": "6519b019be2ffb1449701923",
        "ingredientCategory": "Test",
        "ingredientName": "MEAT",
      },
      {
        "_id": "6519b398dda6c520a813dcaf",
        "ingredientCategory": "Test2",
        "ingredientName": "PORK",
      }
    ],
    "steps": [
      {
        "image": "image1.png",
        "text": "step1"
      },
      {
        "image": "image2.png",
        "text": "step2"
      }
    ],
    "reviews": [
      {
        "_id": "1",
        "userName": "Nut2",
        "userImage": "image1.png",
        "userReview": "reviews"
      },
      {
        "_id": "2",
        "userName": "Nut0000",
        "userImage": "image1.png",
        "userReview": "re"
      }
    ],
    "timestamp": "03-10-2023"
  }

  const UserCard = () => {
    return (
      <View>
        <Text>
          {meal.createdBy.userName}
        </Text>
        <Text>
          สร้างเมื่อ {meal.timestamp}
        </Text>
        <Image style={styles.image} source={{ uri: `data:image/jpeg;base64,${meal.createdBy.userImage}` }} />
        <TouchableOpacity >
          <Image
            style={styles.imagemini}
            source={require('../../picture/commentIcon.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.image}
          source={{ uri: `data:image/jpeg;base64,${meal.mealImage}` }}
        />
        <Text>
          {meal.mealName}
        </Text>
        <UserCard />
        <View>
          {meal.tags.map((tag, index) => (
            <Text key={index}>
              {tag.ingredientName}
            </Text>
          ))}
        </View>
        <View>
          <TouchableOpacity onPress={togglePlaying}>
            <YoutubeIframe
              height={300}
              play={playing}
              videoId={meal.mealYoutube}
              onChangeState={onStateChange}
            />
          </TouchableOpacity>
          <Text>
            ขั้นตอนการทำ
          </Text>
          {meal.steps.map((step, index) => (
            <Text key={index}>
              {step.text}
            </Text>
          ))}
        </View>

      </ScrollView>
    </View>
  )
}

export default MealDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to the top
    backgroundColor: '#2F2C2C',
    padding: 20,
    paddingTop: 30, // Add padding/margin to the top
  },
  search: {
    width: '100%',
    alignItems: 'center', // Center align the button horizontally
  },
  searchButton: {
    borderWidth: 1, // Add border
    borderColor: '#ccc', // Border color
    padding: 10, // Add padding around the text
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchText: {
    fontSize: 16,
    color: '#707070',

  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 18,
  },
});