import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FollowedScreen from '../src/screen/FollowedScreen';
import FollowerScreen from '../src/screen/FollowerScreen';

const TopTab = createMaterialTopTabNavigator()
const FollowNav = ({ route }) => {

  return (
    <TopTab.Navigator screenOptions={{
      tabBarStyle: { backgroundColor: "#2F2C2C", height: "auto" },
      tabBarActiveTintColor: '#DD2572',
      tabBarInactiveTintColor: "white",
      tabBarLabelStyle: { fontSize: 15, fontWeight: "bold" },
      tabBarIndicatorStyle: {
        borderBottomColor: '#505050',
        borderBottomWidth: 4,
      },
    }}
    >
      <TopTab.Screen component={FollowedScreen} name={"FollowedScreen"} options={{ tabBarLabel: 'ผู้ติดตาม' }} />
      <TopTab.Screen component={FollowerScreen} name={"FollowerScreen"} options={{ tabBarLabel: 'กำลังติดตาม' }} />
    </TopTab.Navigator>
  )
}

export default FollowNav