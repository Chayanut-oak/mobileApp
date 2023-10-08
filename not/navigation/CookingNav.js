import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CreateMeal from '../src/screen/CreateMeal'
import CookingMethod from '../src/screen/CookingMethod'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../src/components/CustomHeaderButton';
const CookingNav = ({route , navigation}) => {
    const CookNavigate = createNativeStackNavigator()
  return (
    <CookNavigate.Navigator>
        <CookNavigate.Screen name="CreateMeal" component={CreateMeal} options={{
        headerStyle: { backgroundColor: "#E27E8A" }, headerRight: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Text onPress={() => navigation.navigate('CookingMethod')}>
              Next
            </Text>
          </HeaderButtons>)
      }
      }></CookNavigate.Screen>
        <CookNavigate.Screen name="CookingMethod" component={CookingMethod} ></CookNavigate.Screen>
    </CookNavigate.Navigator>
  )
}

export default CookingNav

const styles = StyleSheet.create({})