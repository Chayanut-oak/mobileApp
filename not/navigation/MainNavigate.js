import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Name from '../src/screen/Name';
import Authentication from '../src/screen/Authentication';
import { FIREBASE_AUTH } from '../Firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomHeaderButton from '../src/components/CustomHeaderButton';
import { HeaderButtons } from 'react-navigation-header-buttons';
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
                {!user ? <Mainnavigate.Screen name="Authen" component={Authentication} options={{headerStyle:{backgroundColor:"#E27E8A"}}}/> : <Mainnavigate.Screen name="Name" component={Name} options={{
                    headerStyle:{backgroundColor:"#E27E8A"} ,headerRight: () => (
                        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                            <Text onPress={() => FIREBASE_AUTH.signOut()}>
                                Exit
                            </Text>
                        </HeaderButtons>),
                }} />}
            </Mainnavigate.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigate

const styles = StyleSheet.create({})