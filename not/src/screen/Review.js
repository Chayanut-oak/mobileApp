import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from "react-native";
import React, { useState, useCallback } from "react";
import YoutubeIframe from "react-native-youtube-iframe";
import { LinearGradient } from 'expo-linear-gradient';
const Review = ({ route }) => {
    const meal = {
        mealId: "meal000",
        reviews: [
            {
                userId: "user001",
                userName: "Nut2",
                userImage: "image1.png",
                userReview: "reviews",
            },
            {
                userId: "user002",
                userName: "Nut0000",
                userImage: "image1.png",
                userReview: "re",
            },
        ],

    };
    return (
        <View style={styles.container}>
            <ScrollView >

                
            </ScrollView>
        </View>
    );
};

export default Review;
const styles = StyleSheet.create({

});

