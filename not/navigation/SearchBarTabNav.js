import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchScreen from '../src/screen/SearchScreen';
import SearchUser from '../src/screen/SearchUser';
const TopTab = createMaterialTopTabNavigator()
const SearchBarTabNav = () => {
  return (
    <TopTab.Navigator screenOptions={{
      tabBarStyle: { backgroundColor: "#2F2C2C", height: "auto" },
      tabBarActiveTintColor: '#DD2572',
      tabBarInactiveTintColor:"white",
      tabBarLabelStyle: { fontSize: 15, fontWeight: "bold" },
      tabBarIndicatorStyle: {
        borderBottomColor: '#505050',
        borderBottomWidth: 4,
      },
    }}

    >
      <TopTab.Screen component={SearchScreen} name={"SearchMeal"} options={{ tabBarLabel: 'Search Meal' }} />
      <TopTab.Screen component={SearchUser} name={"SearchUser"} options={{ tabBarLabel: 'Search User' }} />
    </TopTab.Navigator>
  )
}

export default SearchBarTabNav