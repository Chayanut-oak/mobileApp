import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createSlice } from "@reduxjs/toolkit";
const ingredientSlice = createSlice( {
  name:'ingredient',
  initialState: {
    id:"",
    ingredientId:"" ,
    ingredientCategory: "",
    ingredientName:"",
},reducers:{
  saveUserData: (state, action) => {
    state.ingredientId = action.payload.ingredientId
  }
}
})

export default ingredientSlice

const styles = StyleSheet.create({})