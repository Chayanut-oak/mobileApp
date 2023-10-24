import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchScreen from '../src/screen/SearchScreen'
import Home from '../src/screen/Home'
import { HeaderButtons } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../src/components/CustomHeaderButton'
import Food from '../src/screen/Food'
import { FIREBASE_AUTH } from '../Firebaseconfig'
import MealDetail from '../src/screen/MealDetail'
import Review from '../src/screen/Review'
import { useDispatch } from 'react-redux'
import { saveUserData, resetToinitialState } from '../redux/userSlice'
import SearchBarTabNav from './SearchBarTabNav'
import ViewUser from '../src/screen/ViewUser'
const HomeNav = ({ navigation }) => {
  const dispatch = useDispatch();
  const HomeNavigate = createNativeStackNavigator()
  return (
    <HomeNavigate.Navigator >
      <HomeNavigate.Screen name="Home" component={Home} options={{
        title: "หน้าหลัก",
        headerTitleStyle: { fontWeight: "bold" },
        headerStyle: { backgroundColor: "white" }, headerRight: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          </HeaderButtons>)
      }
      } />

      <HomeNavigate.Screen name="mealCategories" component={Food} options={
        ({ route }) => ({
          title: route.params.Category, headerStyle: { backgroundColor: "white" },
          headerTitleStyle: { fontWeight: "bold" },
        })} />
      <HomeNavigate.Screen name="mealDetail" component={MealDetail} options={{ title: "", headerStyle: { backgroundColor: "white" } }} />
      <HomeNavigate.Screen name="mealReview" component={Review} options={{
        title: "ความคิดเห็น",
        headerTitleStyle: { fontWeight: "bold" },
        headerStyle: { backgroundColor: "white" }
      }} />
      <HomeNavigate.Screen name="ViewUser" component={ViewUser} options={{ title: "", headerStyle: { backgroundColor: "white" } }} />
    </HomeNavigate.Navigator>
  )
}

export default HomeNav

const styles = StyleSheet.create({})