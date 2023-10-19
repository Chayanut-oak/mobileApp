
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { addFollowed } from '../../redux/userSlice';
import { FIRE_STORE } from '../../Firebaseconfig';
import { collection, addDoc, arrayUnion } from "firebase/firestore";
import { updateDoc,doc,arrayRemove } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const AnotherUserFollower = ({navigation,route}) => {
    const dispatch = useDispatch()
    const userMeal = useSelector((state) => state.user)
    const [view ,setView] = useState()
    const viewUser = route.params.User
    const allUserMeal = useSelector((state) => state.allUser)
    const User = allUserMeal.find((allUser) => allUser.userId === viewUser.userId)
    const auth = getAuth()
 

    const FollowedCard = ({ userName, imagePath ,uid,user}) => {
        return (
            <ImageBackground style={styles.item} source={require("../../picture/followedBackground.png")}>
                <TouchableOpacity onPress={() => auth.currentUser.uid == uid ? navigation.navigate('UserProfile') :navigation.navigate('ViewUser',{User:user})}>
                    <Image style={styles.imageUser} source={imagePath ? { uri: imagePath } : require("../../picture/image.png")} />
                </TouchableOpacity>
                <Text style={styles.title}>{userName}</Text>
            </ImageBackground>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
           {User? <FlatList
                data={User.follower}
                numColumns={2}
                renderItem={({ item }) => (
                    <FollowedCard userName={item.displayName} imagePath={item.userImage.imagePath}  uid={item.userId} user={item} />
                )}
                keyExtractor={(item) => item.userId}
            />:null}
        </SafeAreaView>
    );
};

export default AnotherUserFollower;

const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: "#2F2C2C",
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
