import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Name from '../src/screen/Name';
import Authentication from '../src/screen/Authentication';
import { FIREBASE_AUTH, FIRE_STORE } from '../Firebaseconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomHeaderButton from '../src/components/CustomHeaderButton';
import { HeaderButtons } from 'react-navigation-header-buttons';
import Home from '../src/screen/Home';
import { getAuth } from "firebase/auth";
import BottomTabNav from './BottomTabNav';
import { useDispatch, useSelector } from 'react-redux';
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { saveMealData } from '../redux/mealSlice';
import { saveUserData } from '../redux/userSlice';
import { saveIngredientData } from '../redux/ingredientSlice';
const MainNavigate = () => {
    const dispatch = useDispatch();
    const displayname = useSelector((state) => state.user.displayName)
    const auth = getAuth();
    const Mainnavigate = createNativeStackNavigator();
    const [user, setUserToken] = useState(null)
    const storeUser = useSelector((state) => state.user)
    const storeMeal = useSelector((state) => state.meal)
    const storeIngredient = useSelector((state) => state.ingredient)
    const [meals, setMeals] = useState(null)
    const [users, setUsers] = useState(null)
    const [ingredients, setIngredients] = useState(null)
    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            try {
                setUserToken(user ? user.stsTokenManager : null);

                const allMealSnapshot = onSnapshot(collection(FIRE_STORE, 'meals'), (collect) => {
                    const allMeals = collect.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                    // Link ingredients to meals
                    const linkedMeals = allMeals.map((meal) => {
                        const linkedIngredients = meal.tags.map((ingredientId) => {
                            return ingredients.find((ingredient) => ingredient.id === ingredientId);
                        });
                        return { ...meal, ingredients: linkedIngredients };
                    });

                    // Link createdBy to user
                    const linkedMealsWithUsers = linkedMeals.map((meal) => {
                        const createdByUser = users.find((user) => user.id === meal.createdBy);
                        return { ...meal, createdBy: createdByUser };
                    });

                    setMeals(linkedMealsWithUsers);
                }, (error) => {
                    console.log(error);
                });

                const allIngredientSnapshot = onSnapshot(collection(FIRE_STORE, 'ingredients'), (collect) => {
                    const allIngredients = collect.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    setIngredients(allIngredients);
                }, (error) => {
                    console.log(error);
                });

                const allUserSnapshot = onSnapshot(collection(FIRE_STORE, 'users'), (collect) => {
                    const allUsers = collect.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    setUsers(allUsers);
                }, (error) => {
                    console.log(error);
                });
            } catch (e) {
                console.log(e);
            }
            //query database 

        })
    }, [displayname])
    console.log(meals)
    console.log(users)
    console.log(ingredients)
    return (

        <NavigationContainer>
            <Mainnavigate.Navigator>
                {!user ? <Mainnavigate.Screen name="Authen" component={Authentication} options={{ headerStyle: { backgroundColor: "#E27E8A" } }} /> : displayname == "" && !auth.currentUser.displayName
                    ? <Mainnavigate.Screen name="Name" component={Name} options={{ headerStyle: { backgroundColor: "#E27E8A" } }} />
                    : <Mainnavigate.Screen name="homeWithBottom" component={BottomTabNav} options={{ headerShown: false }} />}

            </Mainnavigate.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigate

const styles = StyleSheet.create({})


