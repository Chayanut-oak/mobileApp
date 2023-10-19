import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    FlatList,
    TextInput,
    Button,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { FIRE_STORE } from '../../Firebaseconfig'
import { collection, doc, addDoc, setDoc, getDoc, onSnapshot, query, where, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import YoutubeIframe from "react-native-youtube-iframe";
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from "react-redux";
const Review = ({ route }) => {
    const [text, setText] = useState('');
    const [reviews, setReviews] = useState([])
    const user = useSelector(state => state.user)
    const allUser = useSelector(state => state.allUser)

    useEffect(() => {
        const reviewQuery = query(collection(FIRE_STORE, "comments"), where("mealId", "==", route.params.mealId));
        const unsubscribe = onSnapshot(reviewQuery, (querySnapshot) => {
            const allcomment = querySnapshot.docs.map((doc) => ({ ...doc.data() }))
            const reviewInMeal = allcomment.map((comment) => {
                const matchedUser = allUser.find((user) => comment.userId === user.userId);
                if (matchedUser) {
                    return { ...comment, commentedBy: matchedUser };
                }
            });
            setReviews(reviewInMeal);
        });
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [])
    const addComment = async () => {
        try {
            await addDoc(collection(FIRE_STORE, "comments"), {
                review: text,
                mealId: route.params.mealId,
                userId: user.userId
            });
        } catch (error) {
            console.log(error);
        }
    };
    // if (!reviews) {
    //     return
    // }
    return (
        <View style={styles.container}>
            <ScrollView>
                {reviews.map((review, index) => (
                    <View key={index} style={styles.reviewCard}>
                        <TouchableOpacity>
                            <Image style={styles.userImage} source={{ uri: review.commentedBy.userImage.imagePath }} />
                        </TouchableOpacity>
                        <View style={styles.reviewDetail}>
                            <Text style={styles.userName}>{review.commentedBy.displayName}</Text>
                            <Text>{review.review}</Text>
                        </View>
                    </View>
                ))}

            </ScrollView>
            <View style={styles.input}>
                <TextInput style={styles.left} placeholder="แสดงความคิดเห็น"
                    onChangeText={setText}
                    value={text}
                />
                <TouchableOpacity onPress={() => {
                    addComment()
                    setText("")
                }}>
                    <Image style={styles.imageSend} source={require("../../picture/sendIcon.png")} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Review;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2F2C2C",
        height: "100%",
    },
    reviewCard: {
        padding: 15,
        flexDirection: "row",
        height: 120,
        width: "100%",
        backgroundColor: "#D0D0D0",
        alignItems: "center"
    },
    userImage: {
        marginRight: 20,
        width: 80,
        height: 80,
        borderRadius: 100,

    },
    reviewDetail: {
        flex: 4,

    },
    userName: {
        fontSize: 16,
        fontWeight: "bold"
    },
    left: {
        padding: 15,
        flex: 4,
        backgroundColor: "#fff"
    },
    right: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center"
    },
    but: {
        width: "100%",
        height: "100%",
    },
    input: {
        flexDirection: "row",
        height: 50
    },
    imageSend: {
        height: 50,
        width: 50
    }
});

