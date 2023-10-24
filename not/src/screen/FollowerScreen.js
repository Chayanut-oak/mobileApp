import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addFollowed } from '../../redux/userSlice';
import { FIRE_STORE } from '../../Firebaseconfig';
import { collection, addDoc, arrayUnion } from "firebase/firestore";
import { updateDoc, doc, arrayRemove } from 'firebase/firestore';
import { saveFollow } from '../../redux/followSlice';
import { updateFollowed } from '../../redux/userSlice';
import { getAuth } from 'firebase/auth';
const FollowerScreen = ({ navigation, route }) => {
    const allUserMeal = useSelector((state) => state.allUser)
    const auth = getAuth()
    const userMeal = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const followUser = useSelector((state) => state.follow)
    const updatedUser = allUserMeal.find((allUser) => allUser.userId === followUser.user.userId);
    
    const unfollow = async (uid) =>{
        const newFollwed = userMeal.followed.filter((item) => item.userId !== uid);
        await updateDoc(doc(FIRE_STORE, "users", userMeal.userId), {
            followed: arrayRemove(uid)
          });
          await updateDoc(doc(FIRE_STORE, "users", uid), {
            follower: arrayRemove(userMeal.userId)
          });
        dispatch(updateFollowed(newFollwed))
    }

    const followed = async (uid, user) => {
        if (userMeal.followed.filter((item) => item.userId == uid).length == 0) {
            await updateDoc(doc(FIRE_STORE, "users", userMeal.userId), {
                followed: arrayUnion(...[uid])
            });
            await updateDoc(doc(FIRE_STORE, "users", uid), {
                follower: arrayUnion(...[userMeal.userId])
            });
            console.log('TUM1')
        }
        else {
            console.log('TUM2')
            unfollow(uid)
        }
    }


    // useEffect(() => {
    //   // Listen for changes in route.params.User
    //   const updatedUser = allUserMeal.find((allUser) => allUser.userId === route.params.User.userId);
    //   setUser(updatedUser);
    // }, [route.params.User]);

    const FollowedCard = ({ userName, imagePath, uid, user }) => {
        return (
            <ImageBackground style={styles.item} source={require("../../picture/followedBackground.png")}>
                <TouchableOpacity onPress={() => auth.currentUser.uid == uid ? navigation.navigate('UserProfile') : navigation.navigate('ViewUser', { user: user })}>
                    <Image style={styles.imageUser} source={imagePath ? { uri: imagePath } : require("../../picture/image.png")} />
                </TouchableOpacity>
                <Text style={styles.title}>{userName}</Text>
                {auth.currentUser.uid != uid?<TouchableOpacity onPress={() => followed(uid, user)}>
                    <Image style={styles.button} source={userMeal.followed.filter((item) => item.userId == uid).length !== 0 ? require("../../picture/followedButton.png") : require("../../picture/followBack.png")} />
                </TouchableOpacity>:null}
            </ImageBackground>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {followUser ? <FlatList
                data={updatedUser.follower}
                numColumns={2}
                renderItem={({ item }) => (
                    <FollowedCard userName={item.displayName} imagePath={item.userImage.imagePath} uid={item.userId} user={item} />
                )}
                keyExtractor={(item) => item.displayName}
            /> : null}
        </SafeAreaView>
    );
};

export default FollowerScreen;

const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: "#edebeb",
        paddingVertical: 20,


    },
    flatlist: {
        width: "100%",
        flex: 1
    },
    item: {
        width: "100%",
        height: 200,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 8,
        marginHorizontal: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    imageUser: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    button: {
        width: 120,
        height: 60,
        resizeMode: "contain"
    }
});