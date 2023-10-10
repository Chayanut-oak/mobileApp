import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createSlice } from "@reduxjs/toolkit";
const mealSlice = createSlice({
    name: 'meal',
    initialState: {
        id: "",
        mealName: "",
        mealCategory: "",
        createBy: "",
        mealImage: "",
        mealImageName: "",
        like: 0,
        mealYoutube: "",
        reviews: [],
        steps: [],
        tags: []
    }, reducers: {
        saveMealData: (state, action) => {
            return action.payload;
        }
    }
})

export const { saveMealData } = mealSlice.actions
export default mealSlice.reducer

const styles = StyleSheet.create({})