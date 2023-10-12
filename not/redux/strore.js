import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import mealSlice from './mealSlice'
import ingredientSlice from './ingredientSlice'
import cookingMethodSlice from './cookingMethodSlice'
const store = configureStore({
    reducer: {
        user: userSlice,
        meal: mealSlice,
        ingredient: ingredientSlice,
        cook: cookingMethodSlice
    },
})

export default store