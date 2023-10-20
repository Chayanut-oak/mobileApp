import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from '../src/screen/Profile';
import ViewUser from '../src/screen/ViewUser';
import FollowNav from './FollowNav';
import AnotherFollowNav from './AnotherFollowNav';
import SettingScreenNav from '../src/screen/SettingScreen';
import EditProfileScreen from '../src/screen/EditProfileScreen';
import ChangePasswordScreen from '../src/screen/ChangePasswordScreen';
const ProfileNavigate = createNativeStackNavigator()
const ProfileNav = ({ route }) => {

  return (
    <ProfileNavigate.Navigator >
      <ProfileNavigate.Screen component={Profile} name="UserProfile" options={{ headerShown: false }} />
      <ProfileNavigate.Screen component={FollowNav} name="Followed" options={{ headerShown: false }} />
      <ProfileNavigate.Screen component={FollowNav} name="Followed2" options={{ headerShown: false }} />
      <ProfileNavigate.Screen component={AnotherFollowNav} name="AnotherFollowNav" options={{ headerShown: false }} />
      <ProfileNavigate.Screen component={SettingScreenNav} name="SettingScreen" options={{ headerShown: false }} />
      <ProfileNavigate.Screen component={EditProfileScreen} name="EditProfileScreen" options={{ headerShown: false }} />
      <ProfileNavigate.Screen component={ChangePasswordScreen} name="ChangePasswordScreen" options={{ headerShown: false }} />
    </ProfileNavigate.Navigator>
  )
}

export default ProfileNav
