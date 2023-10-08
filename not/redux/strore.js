import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
const store = configureStore({
    reducer: {
        user: userSlice,
        // ingredient:ingredientSlice
    },
})

export default store