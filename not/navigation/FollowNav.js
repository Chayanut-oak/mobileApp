import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FollowedScreen from '../src/screen/FollowedScreen';
import FollowerScreen from '../src/screen/FollowerScreen';

const TopTab = createMaterialTopTabNavigator()
const FollowNav = ({ route }) => {

  return (
    <TopTab.Navigator screenOptions={{
      tabBarStyle: { backgroundColor: "#edebeb", height: "auto" },
      tabBarActiveTintColor: '#DD2572',
      tabBarInactiveTintColor: "black",
      tabBarLabelStyle: { fontSize: 15, fontWeight: "bold" },
      tabBarIndicatorStyle: {
        borderBottomColor: '#DD2572',
        borderBottomWidth: 4,
      },
    }}
    >
      <TopTab.Screen component={FollowedScreen} name={"FollowedScreen"} options={{ tabBarLabel: 'กำลังติดตาม' }} />
      <TopTab.Screen component={FollowerScreen} name={"FollowerScreen"} options={{ tabBarLabel: 'ผู้ติดตาม' }} />
    </TopTab.Navigator>
  )
}

export default FollowNav