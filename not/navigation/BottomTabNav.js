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
const MenuTab = createBottomTabNavigator();
const BottomTabNav = () => {
  const auth = getAuth();
  return (
    <MenuTab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: 'white', // Change the color for active tab
        tabBarInactiveTintColor: 'black', // Change the color for inactive tabs
        tabBarStyle: { backgroundColor: '#E51C7C' }, // Change the background color of the tab bar
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'New') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === auth.currentUser.displayName) {
            iconName = focused ? 'ellipse-outline' : 'ellipse-sharp';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <MenuTab.Screen name="Home" component={Home} options={{
        headerStyle: { backgroundColor: "#E27E8A" }, headerRight: () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Text onPress={() => FIREBASE_AUTH.signOut()}>
              Exit
            </Text>
          </HeaderButtons>)
      }
      } />
      <MenuTab.Screen name="New" component={Home} />
      <MenuTab.Screen name="Notification" component={Home} />
      <MenuTab.Screen name={auth.currentUser.displayName} component={Home} />
    </MenuTab.Navigator>
  )
}

export default BottomTabNav

const styles = StyleSheet.create({})