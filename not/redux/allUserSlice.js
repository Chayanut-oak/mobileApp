import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createSlice } from "@reduxjs/toolkit";
const allUserSlice = createSlice({
    name: 'allUser',
    initialState: [], reducers: {
        saveAllUserData: (state, action) => {
            return action.payload;
        }
    }
})



export const { saveAllUserData } = allUserSlice.actions
export default allUserSlice.reducer