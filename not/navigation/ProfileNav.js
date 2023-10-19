import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../src/screen/Profile';
import ViewUser from '../src/screen/ViewUser';
import FollowNav from './FollowNav';
import AnotherFollowNav from './AnotherFollowNav';
const ProfileNavigate = createNativeStackNavigator()
const ProfileNav = ({ route }) => {

  return (
    <ProfileNavigate.Navigator >
      <ProfileNavigate.Screen component={Profile} name="UserProfile" options={{ headerShown: false }} />
      <ProfileNavigate.Screen component={FollowNav} name="Followed" options={{ headerShown: false }} />
      <ProfileNavigate.Screen component={AnotherFollowNav} name="AnotherFollowNav" options={{ headerShown: false }} />
    </ProfileNavigate.Navigator>
  )
}

export default ProfileNav
