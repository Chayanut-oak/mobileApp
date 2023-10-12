import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import mealSlice from './mealSlice'
import ingredientSlice from './ingredientSlice'
import cookingMethodSlice from './cookingMethodSlice'
import allUserSlice from './allUserSlice'
const store = configureStore({
    reducer: {
        user: userSlice,
        allUser: allUserSlice,
        meal: mealSlice,
        ingredient: ingredientSlice,
        cook: cookingMethodSlice
    },
})

export default store