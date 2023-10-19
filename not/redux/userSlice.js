import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createSlice } from "@reduxjs/toolkit";
import { action } from '@datorama/akita';
const initialState = {
  userId: "",
  firstName: "",
  lastName: "",
  userImage: {},
  email: "",
  displayName: "",
  favoriteMeals: [],
  followed: [],
  follower: []
}
export const userSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: {
    saveUserData: (state, action) => {
      return action.payload;
    },
    updateUserDisplayName: (state, action) => {
      state.displayName = action.payload
    },
    updateFollowed: (state, action) => {
      state.followed = action.payload
    },
    addFollowed: (state, action) => {
      state.followed = action.payload
    },
    resetToinitialState: (state, action) => {
      return initialState
    }
  }
})



export const { saveUserData, updateUserDisplayName, updateFollowed, addFollowed, resetToinitialState } = userSlice.actions
export default userSlice.reducer