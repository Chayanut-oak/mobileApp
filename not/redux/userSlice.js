import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createSlice } from "@reduxjs/toolkit";
import { action } from '@datorama/akita';
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: "",
    firstName: "",
    lastName: "",
    userImage: {},
    email: "",
    displayName: "",
    favoriteMeals: [],
    followed: [],
    follower: []
  }, reducers: {
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
    }
  }
})



export const { saveUserData, updateUserDisplayName ,updateFollowed,addFollowed} = userSlice.actions
export default userSlice.reducer