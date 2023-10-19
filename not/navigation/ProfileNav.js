import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../src/screen/Profile';
import ViewUser from '../src/screen/ViewUser';
import FollowNav from './FollowNav';
import AnotherFollowNav from './AnotherFollowNav';
const ProfileNavigate = createNativeStackNavigator()
const ProfileNav = ({route}) => {

  return (
    <ProfileNavigate.Navigator >
      <ProfileNavigate.Screen component={Profile} name="UserProfile"  />
      <ProfileNavigate.Screen component={FollowNav} name="Followed" />
      <ProfileNavigate.Screen component={ViewUser} name="ViewUser" />
      <ProfileNavigate.Screen component={AnotherFollowNav} name="AnotherFollowNav"/>
    </ProfileNavigate.Navigator>
  )
}

export default ProfileNav
