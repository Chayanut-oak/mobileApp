import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CreateMeal from '../src/screen/CreateMeal'
import CookingMethod from '../src/screen/CookingMethod'
import { FIRE_STORE } from '../Firebaseconfig'
import { resetData } from '../redux/cookingMethodSlice'
import { collection, addDoc } from "firebase/firestore";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../src/components/CustomHeaderButton';
import { useSelector, useDispatch } from 'react-redux'
import { getAuth } from "firebase/auth";
const CookingNav = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const methodStore = useSelector((state) => state.cook)
  const auth = getAuth();
  const CookNavigate = createNativeStackNavigator()
  const upMethod = async () => {
    await addDoc(collection(FIRE_STORE, "meals"), {
      createdBy: auth.currentUser.uid,
      like: methodStore.like,
      mealImage: methodStore.mealImage,
      mealName: methodStore.mealName,
      mealYoutube: methodStore.mealYoutube,
      reviews: methodStore.reviews,
      steps: methodStore.steps,
      tags: methodStore.tags.map((tag) => tag.ingredientId)
    });
    dispatch(resetData({
      createdBy: '',
      like: 0,
      mealName: '',
      mealYoutube: '',
      mealImage: {},
      reviews: [],
      tags: [],
      steps: [],
    }))
  }
  return (
    <CookNavigate.Navigator>
      <CookNavigate.Screen name="CreateMeal" component={CreateMeal} options={{
        title:"เพิ่มเมนู",
        headerTitleStyle:{fontWeight:"bold"},
        headerStyle: { backgroundColor: "#E27E8A" }, headerRight: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Text onPress={() => navigation.navigate('CookingMethod')}>
              Next
            </Text>
          </HeaderButtons>)
      }
      }></CookNavigate.Screen>
      <CookNavigate.Screen name="CookingMethod" component={CookingMethod} options={{
        title:"ขั้นตอน",
        headerTitleStyle:{fontWeight:"bold"},
        headerStyle: { backgroundColor: "#E27E8A" }, headerRight: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Text onPress={() => { navigation.navigate('CreateMeal'), upMethod() }}>
              เสร็จสิ้น
            </Text>
          </HeaderButtons>)
      }
      }></CookNavigate.Screen>
    </CookNavigate.Navigator>
  )
}

export default CookingNav

const styles = StyleSheet.create({})