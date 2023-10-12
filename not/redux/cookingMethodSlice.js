import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createSlice } from "@reduxjs/toolkit";
const cookingMethodSlice = createSlice({
  name: 'cooking',
  initialState: {
    createdBy: '',
    like: '',
    mealName: '',
    mealYoutube: '',
    mealImage: {},
    reviews: [],
    tags: [],
    steps: [],

  }, reducers: {
    saveMethodData: (state, action) => {
      const updatedStep = [...state.steps, action.payload];
      state.steps = updatedStep;
    },
    delMethodData: (state, action) => {
      state.steps = action.payload;
    },
    saveMethodImageData: (state, action) => {
      const update = { ...state.mealImage, imageName: action.payload.imageName, imagePath: action.payload.mainImage, }
      state.mealImage = update
      state.tags = action.payload.tag
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
    resetData: (state, action) => {
      return action.payload
    },
    resetDataToFalse: (state, action) => {
      state.reset = action.payload
    },
  }
})

export const { saveMethodData } = cookingMethodSlice.actions
export const { delMethodData } = cookingMethodSlice.actions
export const { updateMethodData } = cookingMethodSlice.actions
export const { updateImageData } = cookingMethodSlice.actions
export const { updateImagePathData } = cookingMethodSlice.actions
export const { resetData } = cookingMethodSlice.actions
export const { saveMethodImageData } = cookingMethodSlice.actions
export default cookingMethodSlice.reducer


