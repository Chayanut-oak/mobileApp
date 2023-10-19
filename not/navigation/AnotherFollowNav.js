
import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AnotherUserFollowed from '../src/screen/AnotherUserFollowed';
import AnotherUserFollower from '../src/screen/AnotherUserFollower';
import ViewUser from '../src/screen/ViewUser';
const TopTab = createMaterialTopTabNavigator()
const AnotherFollowNav = ({route}) => {

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
      <TopTab.Screen component={AnotherUserFollowed} name={"AnotherUserFollowed"} options={{ tabBarLabel: 'AnotherUser Followed' }}  initialParams={{ User: route.params.ViewUser }}/>
      <TopTab.Screen component={AnotherUserFollower} name={"AnotherUserFollower"} options={{ tabBarLabel: 'AnotherUser Follower' }} initialParams={{ User: route.params.ViewUser }}/>
    </TopTab.Navigator>
  )
}

export default AnotherFollowNav