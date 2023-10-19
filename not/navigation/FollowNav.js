import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FollowedScreen from '../src/screen/FollowedScreen';
import FollowerScreen from '../src/screen/FollowerScreen';

const TopTab = createMaterialTopTabNavigator()
const FollowNav = ({route}) => {
  return (
    <TopTab.Navigator screenOptions={{
      tabBarStyle: { backgroundColor: "#707070", height: "auto", paddingTop: 10 },
      tabBarLabelStyle: { fontSize: 15, fontWeight: "bold", color: "black" },
      tabBarIndicatorStyle: {
        borderBottomColor: '#505050',
        borderBottomWidth: 4,
      },
    }}

    >
      <TopTab.Screen component={FollowedScreen} name={"FollowedScreen"} options={{ tabBarLabel: 'ผู้ติดตาม' }} initialParams={{ User: route.params.ViewUser }} />
      <TopTab.Screen component={FollowerScreen} name={"FollowerScreen"} options={{ tabBarLabel: 'กำลังติดตาม' }} initialParams={{ User: route.params.ViewUser }} />
    </TopTab.Navigator>
  )
}

export default FollowNav