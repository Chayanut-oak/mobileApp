import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from '../src/screen/Home';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../src/components/CustomHeaderButton';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from "firebase/auth";
import { FIREBASE_AUTH } from '../Firebaseconfig';
import HomeNav from './HomeNav';
import Profile from '../src/screen/Profile'
import CreateMeal from '../src/screen/CreateMeal';
import Notification from '../src/screen/Notification'
import CookingNav from './CookingNav';
const MenuTab = createBottomTabNavigator();
const BottomTabNav = ({route , navigation}) => {
  const auth = getAuth();
  return (
    <MenuTab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'white', // Change the color for active tab
        tabBarInactiveTintColor: 'black', // Change the color for inactive tabs
        tabBarStyle: { backgroundColor: '#E51C7C' }, // Change the background color of the tab bar
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'MainHome') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'New') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === "Profile") {
            iconName = focused ? 'person-sharp' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <MenuTab.Screen name="MainHome" component={HomeNav} options={{ headerShown: false }} />
      <MenuTab.Screen name="New" component={CookingNav} initialParams={{ customProp: 'Another custom prop' }} options={{
        headerStyle: { backgroundColor: "#E27E8A" },  headerShown: false 
      }} />
      <MenuTab.Screen name="Notification"  component={Notification} options={{
        headerStyle: { backgroundColor: "#E27E8A" }
      }} />
      <MenuTab.Screen name={"Profile"} component={Profile} options={{
        headerStyle: { backgroundColor: "#E27E8A" }
      }} />


    </MenuTab.Navigator>


  )
}

export default BottomTabNav

const styles = StyleSheet.create({})