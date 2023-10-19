import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createSlice } from "@reduxjs/toolkit";

const followSlice = createSlice({
    name: 'Follow',
    initialState:{
        user: {}
      }, reducers: {
        saveFollow: (state, action) => {
            state.user =  action.payload;
        }
    }
})



export const { saveFollow } = followSlice.actions
export default followSlice.reducer