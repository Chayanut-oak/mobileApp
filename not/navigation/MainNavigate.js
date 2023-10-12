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
import { saveAllUserData } from '../redux/allUserSlice';
const MainNavigate = () => {
    const dispatch = useDispatch();
    const displayname = useSelector((state) => state.user.displayName)
    const auth = getAuth();
    const Mainnavigate = createNativeStackNavigator();
    const [user, setUserToken] = useState(null)

    // const [meals, setMeals] = useState([])
    // const [allUser, setAllUser] = useState([])
    // const [curUser, setCurUser] = useState({})
    // const [ingredients, setIngredients] = useState([])

    const storeUser = useSelector((state) => state.user)
    const storeAllUser = useSelector((state) => state.allUser)
    const storeMeal = useSelector((state) => state.meal)
    const storeIngredient = useSelector((state) => state.ingredient)

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            try {
                setUserToken(user ? user.stsTokenManager : null);
                let ingredients
                let allUser
                const allIngredientSnapshot = onSnapshot(collection(FIRE_STORE, 'ingredients'), (collect) => {
                    const allIngredients = collect.docs.map((doc) => ({ ingredientId: doc.id, ...doc.data() }));
                    dispatch(saveIngredientData(allIngredients))
                    ingredients = allIngredients
                }, (error) => {
                    console.log(error);
                });

                const allUserSnapshot = onSnapshot(collection(FIRE_STORE, 'users'), (collect) => {
                    // const curUserDoc = collect.docs.find((doc) => doc.data().userId == user.uid)
                    const allUserDoc = collect.docs.map((doc) => ({ ...doc.data() }));
                    const curUserDoc = allUserDoc.find(item => item.userId == user.uid)
                    dispatch(saveAllUserData(allUserDoc))
                    dispatch(saveUserData(curUserDoc));
                    allUser = allUserDoc
                }, (error) => {
                    console.log(error);
                });

                const allMealSnapshot = onSnapshot(collection(FIRE_STORE, 'meals'), (collect) => {
                    const allMeals = collect.docs.map((doc) => ({ mealId: doc.id, ...doc.data() }));
                    // Link ingredients to meals
                    const linkedMeals = allMeals.map((meal) => {
                        const linkedIngredients = meal.tags.map((ingredientId) => {
                            return ingredients.find((ingredient) => ingredient.ingredientId === ingredientId);
                        });
                        return { ...meal, tags: linkedIngredients };
                    });
                    // Link createdBy to user
                    const linkedMealsWithUsers = linkedMeals.map((meal) => {
                        const createdByUser = allUser.find((user) => user.userId === meal.createdBy);
                        return { ...meal, createdBy: createdByUser };
                    });
                    dispatch(saveMealData(linkedMealsWithUsers));
                }, (error) => {
                    console.log(error);
                });


                // console.log(meals)
                return () => {
                    if (allMealSnapshot) {
                        allMealSnapshot();
                    }
                    if (allUserSnapshot) {
                        allUserSnapshot();
                    }
                    if (allIngredientSnapshot) {
                        allIngredientSnapshot();
                    }
                };

            } catch (e) {
                console.log("From Main Navigate:", e);
            }
            //query database 
        })
    }, [])
    // console.log("storeUser", storeUser)
    // console.log("storeAllUser", storeAllUser)
    // console.log("storeMeal", storeMeal)
    // console.log("storeIngredient", storeIngredient)
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


