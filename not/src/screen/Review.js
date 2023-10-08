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

import React, { useState, useCallback } from "react";
import YoutubeIframe from "react-native-youtube-iframe";
import { LinearGradient } from 'expo-linear-gradient';
const Review = ({ route }) => {
    const [text, setText] = useState('');
    const reviews = [
        {
            userId: "user001",
            userName: "Nut2",
            userImage: "iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAA2BJREFUaEPtmj9o6kAcx3+li0ih4FLq2HZ2bgeduruJFEeplEoLDtXFyamLOBQK6iK0Ih0K3bvo5ODk0kUEoUR0ECwi7eTjd4/kXWKSu1wurSkvk+clv/t+fv9O4m31er1VKBSCQCAAfrw+Pz9hNpvB1nA4XOGHo6Mj2N3d9RXLfD6HwWAAGIgtRVFWwWCQfOEnGBUCNS+Xy78g+/v7QE9semSMWsfj8T8QzCk/wJhpXAPZdBgrR5uCbCqMXbZYgmwaDCvlbUE2BYYFgTqZID8NwwPBDfJTMLwQjkC+G8YJhGOQ74JxCiEE4jWMCIQwiFcwohCuQGTDuIFwDSILxi2EFBC3MDIgpIGIwsiCkAriFEYmhHQQXhjZEJ6AsGC8gPAMxArGKwhPQYwwOPby5QbXz3gUIXqpUcDnvXxD8x+EJ0J0Tfg2tcwK23fFbifYKxjpNcIjlOcentSl75EK4kSgk3t5oKSBiAgTecYKSgqIG0FunpWaWjKEyLDhKiIyBKhedWtLGMTtwma57samEIibBVkdSNS2YxDRhVgA9LzIGo5A6AW2t7fh4uICHh4eNA03Nzdwe3tLxv1+H5LJJLy9vUEqlYL7+3vY2dmx5VksFms2r6+voVKpMG1ygxi9NJlM4Pz8HEqlEkQiEZ1AVVA0GoWzszMiDj/j/XaX0aaZ46xscoGYhRo9XiwWoVqtwt7enk4fzmWzWbi7uyOQr6+v0Gg0mFExs6mu/fX1BYVCwdImE8QqX+3E4RxG6unpiUDS43K5DN1uVzd3dXUFrVYLptOpKTBqaDabJI2fn5/XbOIawn+9YSQymYwWiVgsphNHR8Do6Xw+T57L5XKQSCRIZE9PT0l0rWy+vLyQ+VqtBuFwmNQgnRHCf4aiGEVRtHShx+hxOxCsBQTodDpANwiWzXq9DpeXlyRdR6MRG0Sk/dF1gSlilVpqPaF3Hx8ftSiaNQEzmwjz8fEB7+/vgGmqpq+0AwN0qNHjdNiN9aQKRPEnJydayzbCWNnEwz9YM+12GxAM27oOhDcSdHvFlqqOMXdxH7Frv/RcPB7XauT4+FjXplk20+k0HB4ektTE4yYaiNNDNcbNy7jpmW2I6HHcU/BSN0iMltq1Dg4OdBsiyyY6DQG0QzW/5pjTbzl49gfcxOo1RgS8SgAAAABJRU5ErkJggg==",
            userReview: "reviews",
        },
        {
            userId: "user002",
            userName: "Nut0000",
            userImage: "iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAA2BJREFUaEPtmj9o6kAcx3+li0ih4FLq2HZ2bgeduruJFEeplEoLDtXFyamLOBQK6iK0Ih0K3bvo5ODk0kUEoUR0ECwi7eTjd4/kXWKSu1wurSkvk+clv/t+fv9O4m31er1VKBSCQCAAfrw+Pz9hNpvB1nA4XOGHo6Mj2N3d9RXLfD6HwWAAGIgtRVFWwWCQfOEnGBUCNS+Xy78g+/v7QE9semSMWsfj8T8QzCk/wJhpXAPZdBgrR5uCbCqMXbZYgmwaDCvlbUE2BYYFgTqZID8NwwPBDfJTMLwQjkC+G8YJhGOQ74JxCiEE4jWMCIQwiFcwohCuQGTDuIFwDSILxi2EFBC3MDIgpIGIwsiCkAriFEYmhHQQXhjZEJ6AsGC8gPAMxArGKwhPQYwwOPby5QbXz3gUIXqpUcDnvXxD8x+EJ0J0Tfg2tcwK23fFbifYKxjpNcIjlOcentSl75EK4kSgk3t5oKSBiAgTecYKSgqIG0FunpWaWjKEyLDhKiIyBKhedWtLGMTtwma57samEIibBVkdSNS2YxDRhVgA9LzIGo5A6AW2t7fh4uICHh4eNA03Nzdwe3tLxv1+H5LJJLy9vUEqlYL7+3vY2dmx5VksFms2r6+voVKpMG1ygxi9NJlM4Pz8HEqlEkQiEZ1AVVA0GoWzszMiDj/j/XaX0aaZ46xscoGYhRo9XiwWoVqtwt7enk4fzmWzWbi7uyOQr6+v0Gg0mFExs6mu/fX1BYVCwdImE8QqX+3E4RxG6unpiUDS43K5DN1uVzd3dXUFrVYLptOpKTBqaDabJI2fn5/XbOIawn+9YSQymYwWiVgsphNHR8Do6Xw+T57L5XKQSCRIZE9PT0l0rWy+vLyQ+VqtBuFwmNQgnRHCf4aiGEVRtHShx+hxOxCsBQTodDpANwiWzXq9DpeXlyRdR6MRG0Sk/dF1gSlilVpqPaF3Hx8ftSiaNQEzmwjz8fEB7+/vgGmqpq+0AwN0qNHjdNiN9aQKRPEnJydayzbCWNnEwz9YM+12GxAM27oOhDcSdHvFlqqOMXdxH7Frv/RcPB7XauT4+FjXplk20+k0HB4ektTE4yYaiNNDNcbNy7jpmW2I6HHcU/BSN0iMltq1Dg4OdBsiyyY6DQG0QzW/5pjTbzl49gfcxOo1RgS8SgAAAABJRU5ErkJggg==",
            userReview: "re",
        },
    ]

    return (
        <View style={styles.container}>
            <ScrollView>
                {reviews.map((review, index) => (
                    <View key={index} style={styles.reviewCard}>
                        <TouchableOpacity>
                            <Image style={styles.userImage} source={{ uri: `data:image/jpeg;base64,${review.userImage}` }} />
                        </TouchableOpacity>
                        <View style={styles.reviewDetail}>
                            <Text style={styles.userName}>{review.userName}</Text>
                            <Text>{review.userReview}</Text>
                        </View>
                    </View>
                ))}

            </ScrollView>
            <View style={styles.input}>
                <TextInput style={styles.left} placeholder="แสดงความคิดเห็น"
                    onChangeText={setText}
                    value={text}
                />
                <TouchableOpacity onPress={() => setText("")}>
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
        backgroundColor: "#E6E6E6",
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
        height: 70
    },
    imageSend: {
        height: 70,
        width: 70
    }
});

