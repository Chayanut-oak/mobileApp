import React ,{ useState , useEffect}from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './Firebaseconfig';
import Home from './src/screen/Home';
import Authentication from './src/screen/Authentication';
export default function App() {
 const Stack = createNativeStackNavigator();
 const [user, setUserToken] = useState(null)
  
  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUserToken(user ? user.stsTokenManager : null)
    })
  }, [])
  return (
    <NavigationContainer>
        <Stack.Navigator>
         {!user ? <Stack.Screen name="Authen" component={Authentication}/>
         :<Stack.Screen name="Home" component={Home} />}
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
