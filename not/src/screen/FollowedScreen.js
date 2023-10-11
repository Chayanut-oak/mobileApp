import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ImageBackground, Image, TouchableOpacity } from 'react-native';

const FollowedScreen = () => {
    const followed = [
        { userName: "Nut1", imagePath: null },
        { userName: "Nut2", imagePath: null },
        { userName: "Nut3", imagePath: null },
        { userName: "Nut4", imagePath: null },
        { userName: "Nut5", imagePath: null },
        { userName: "Nut6", imagePath: null }
    ];

    const FollowedCard = ({ userName, imagePath }) => {
        return (


            <ImageBackground style={styles.item} source={require("../../picture/followedBackground.png")}>
                <TouchableOpacity>
                    <Image style={styles.imageUser} source={imagePath ? { uri: imagePath } : require("../../picture/image.png")} />

                </TouchableOpacity>
                <Text style={styles.title}>{userName}</Text>

                <TouchableOpacity>
                    <Image style={styles.button} source={require("../../picture/followedButton.png")} />
                </TouchableOpacity>


            </ImageBackground>


        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={followed}
                numColumns={2}
                renderItem={({ item }) => (
                    <FollowedCard userName={item.userName} reviewText={item.reviewText} />
                )}
                keyExtractor={(item) => item.userName}
            />
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
