import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createSlice } from "@reduxjs/toolkit";
const ingredientSlice = createSlice( {
  name:'ingredient',
  initialState: {
    id:"",
    ingredientCategory: "",
    ingredientName:"",
},reducers:{
  saveIngredientData: (state, action) => {
    return action.payload;
  }
}
})

export const { saveIngredientData } = ingredientSlice.actions
export default ingredientSlice.reducer

const styles = StyleSheet.create({})