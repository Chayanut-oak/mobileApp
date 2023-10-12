import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createSlice } from "@reduxjs/toolkit";
const cookingMethodSlice = createSlice( {
    name:'cooking',
    initialState: {
      name:'',
      mainImage:"",
      tag:[],
      cookingMethod: [],
      
  },reducers:{
    saveMethodData: (state, action) => {
        state.cookingMethod = action.payload;
    },
    saveMethodImageData: (state, action) => {
        state.mainImage = action.payload.mainImage,
        state.tag = action.payload.tag
      }
  }
})

export const { saveMethodData } = cookingMethodSlice.actions
export const { saveMethodImageData } = cookingMethodSlice.actions
export default cookingMethodSlice.reducer


