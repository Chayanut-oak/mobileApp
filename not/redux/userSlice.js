import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice( {
  name:'user',
  initialState: {
    id:"",
    userFullName:"" ,
    email: "",
    displayName:"",
    favoriteMeals:[],
    followed:[],
    follower:[]
},reducers:{
  saveUserData: (state, action) => {
    state.displayName = action.payload.displayName
  }
}
})



export const { saveUserData } = userSlice.actions
export default userSlice.reducer