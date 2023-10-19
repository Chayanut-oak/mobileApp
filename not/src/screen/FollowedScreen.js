import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useSelector , useDispatch} from 'react-redux';
import { updateFollowed } from '../../redux/userSlice';
import { FIRE_STORE } from '../../Firebaseconfig';
import { updateDoc,doc,arrayRemove } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const FollowedScreen = ({ navigation, route}) => {
    const auth = getAuth()
    const dispatch = useDispatch()
    const allUserMeal = useSelector((state) => state.allUser)
    const userMeal = useSelector((state) => state.user)
    const viewUser = route.params.User
    console.log(viewUser)
    const [user,setUser]= useState(null)
    useEffect (()=>{
        const user = allUserMeal.find((allUser) => allUser.userId === viewUser.userId)
        setUser(user)
        },[viewUser])
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
  


    const FollowedCard = ({ userName, imagePath,uid,index,user }) => {
        return (
            <ImageBackground style={styles.item} source={require("../../picture/followedBackground.png")}>
                <TouchableOpacity onPress={() => auth.currentUser.uid == uid ? navigation.navigate('UserProfile') : navigation.navigate('ViewUser', { User: user })}>
                    <Image style={styles.imageUser} source={imagePath ? { uri: imagePath } : require("../../picture/image.png")} />
                </TouchableOpacity>
                <Text style={styles.title}>{userName}</Text>
                <TouchableOpacity onPress={() => unfollow(uid,index) }>
                    <Image style={styles.button} source={require("../../picture/followedButton.png")} />
                </TouchableOpacity>
            </ImageBackground>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
           {user? <FlatList
                data={user.followed}
                numColumns={2}
                renderItem={({ item ,index}) => (
                    <FollowedCard userName={item.displayName} imagePath={item.userImage.imagePath}  uid={item.userId} index={index} user={item}/>
                )}
                keyExtractor={(item) => item.displayName}
            />:null}
        </SafeAreaView>
    );
};

export default FollowedScreen;

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
