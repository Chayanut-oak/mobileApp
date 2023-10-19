import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FollowedScreen from '../src/screen/FollowedScreen';
import FollowerScreen from '../src/screen/FollowerScreen';
import ViewUser from '../src/screen/ViewUser';
const TopTab = createMaterialTopTabNavigator()
const FollowNav = () => {
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
      <TopTab.Screen component={FollowedScreen} name={"FollowedScreen"} options={{ tabBarLabel: 'Followed Screen' }} />
      <TopTab.Screen component={FollowerScreen} name={"FollowerScreen"} options={{ tabBarLabel: 'Follower Screen' }} />
    </TopTab.Navigator>
  )
}

export default FollowNav