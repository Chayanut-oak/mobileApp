import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import mealSlice from './mealSlice'
import ingredientSlice from './ingredientSlice'
const store = configureStore({
    reducer: {
        user: userSlice,
        meal: mealSlice,
        ingredient: ingredientSlice
    },
})

export default store