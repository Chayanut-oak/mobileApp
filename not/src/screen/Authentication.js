import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from '../components/Login';
import Register from '../components/Register';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const InsideStack = createNativeStackNavigator();
const Authentication = () => {
    return(
      <InsideStack.Navigator>
        <InsideStack.Screen name='Login' component={Login} options={{headerShown:false}}/>
        <InsideStack.Screen name='Register' component={Register} options={{headerShown:false}}/>
      </InsideStack.Navigator>
    )
}

export default Authentication

const styles = StyleSheet.create({})