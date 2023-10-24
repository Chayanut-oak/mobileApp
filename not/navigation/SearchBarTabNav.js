import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchScreen from '../src/screen/SearchScreen';
import SearchUser from '../src/screen/SearchUser';
const TopTab = createMaterialTopTabNavigator()
const SearchBarTabNav = () => {
  return (
    <TopTab.Navigator screenOptions={{
      tabBarStyle: { backgroundColor: "#edebeb", height: "auto" },
      tabBarActiveTintColor: '#DD2572',
      tabBarInactiveTintColor:"black",
      tabBarLabelStyle: { fontSize: 15, fontWeight: "bold" },
      tabBarIndicatorStyle: {
        borderBottomColor: '#DD2572',
        borderBottomWidth: 4,
      },
    }}

    >
      <TopTab.Screen component={SearchScreen} name={"SearchMeal"} options={{ tabBarLabel: 'ค้นหาอาหาร' }} />
      <TopTab.Screen component={SearchUser} name={"SearchUser"} options={{ tabBarLabel: 'ค้นหาผู้ใช้' }} />
    </TopTab.Navigator>
  )
}

export default SearchBarTabNav