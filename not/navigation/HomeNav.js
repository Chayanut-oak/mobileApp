import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SearchScreen from '../src/screen/SearchScreen'
import Home from '../src/screen/Home'
import { HeaderButtons } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../src/components/CustomHeaderButton'
const HomeNav = (navigate) => {
    const HomeNavigate = createNativeStackNavigator()
  return (
    <HomeNavigate.Navigator >
         <HomeNavigate.Screen name="Home" component={Home}options={{
        headerStyle: { backgroundColor: "#E27E8A" }, headerRight: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Text onPress={() => FIREBASE_AUTH.signOut()}>
              Exit
            </Text>
          </HeaderButtons>)
      }
      } ></HomeNavigate.Screen>
        <HomeNavigate.Screen name="SearchScreen" component={SearchScreen}  options={{headerShown : false}}></HomeNavigate.Screen>
    </HomeNavigate.Navigator>
  )
}

export default HomeNav

const styles = StyleSheet.create({})