import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Home from '../src/screen/Home';
import Authentication from '../src/screen/Authentication';
import { FIREBASE_AUTH } from '../Firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';

const MainNavigate = () => {
    const Mainnavigate = createNativeStackNavigator();
    const [user, setUserToken] = useState(null)

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUserToken(user ? user.stsTokenManager : null)
        })
    }, [])
    return (
        <NavigationContainer>
            <Mainnavigate.Navigator>
                {!user ? <Mainnavigate.Screen name="Authen" component={Authentication} />
                    : <Mainnavigate.Screen name="Home" component={Home} />}
            </Mainnavigate.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigate

const styles = StyleSheet.create({})