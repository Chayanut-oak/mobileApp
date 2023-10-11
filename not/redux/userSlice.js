import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice( {
  name:'user',
  initialState: {
    userId:"",
    firstName:"" ,
    lastName:"" ,
    userImage:{},
    email: "",
    displayName:"",
    favoriteMeals:[],
    followed:[],
    follower:[]
},reducers:{
  saveUserData: (state, action) => {
    return action.payload;
  }
}
})



export const { saveUserData } = userSlice.actions
export default userSlice.reducer