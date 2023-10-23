import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createSlice } from "@reduxjs/toolkit";
import { action } from '@datorama/akita';
const cookingMethodSlice = createSlice({
  name: 'cooking',
  initialState: {
    createdBy: '',
    like: 0, 
    mealId:'',
    mealImage: {},
    mealName: '',
    mealYoutube: '',
    reviews: [],
    steps: [],
    tags: [],


  }, reducers: {
    saveMethodData: (state, action) => {
      const updatedStep = [...state.steps, action.payload];
      state.steps = updatedStep;
    },
    delMethodData: (state, action) => {
      state.steps = action.payload;
    },
    saveMethodImageData: (state, action) => {
      if( action.payload.imageName && action.payload.mainImage != null){
        const update = { ...state.mealImage, imageName: action.payload.imageName, imagePath: action.payload.mainImage, }
        state.mealImage = update
      }
    },
    saveMethodTagsData: (state, action) => {
      const update = [...state.tags,action.payload]
      state.tags = update
    },
    delMethodTagsData: (state, action) => {
      
      state.tags = action.payload
    },
    saveMethodMealNameData: (state, action) => {
      state.mealName = action.payload.mealName
    },
    updateMethodData: (state, action) => {
      state.steps[action.payload[1]].stepDetail = action.payload[0];
    },
    updateImageData: (state, action) => {
      state.steps[action.payload[1]].stepImage.stepImageName = action.payload[0]; 
    },
    updateImagePathData: (state, action) => {
      state.steps[action.payload[1]].stepImage.stepImagePath = action.payload[0];
    },
    saveLink:(state, action)=>{
      state.mealYoutube = action.payload
    },
    resetData: (state, action) => {
      return action.payload
    },
    
  }
})

export const { saveMethodData } = cookingMethodSlice.actions
export const { delMethodData } = cookingMethodSlice.actions
export const { updateMethodData } = cookingMethodSlice.actions
export const { updateImageData } = cookingMethodSlice.actions
export const { updateImagePathData } = cookingMethodSlice.actions
export const { saveLink } = cookingMethodSlice.actions
export const { resetData } = cookingMethodSlice.actions
export const { saveMethodImageData,saveMethodTagsData,saveMethodMealNameData,delMethodTagsData } = cookingMethodSlice.actions
export default cookingMethodSlice.reducer


