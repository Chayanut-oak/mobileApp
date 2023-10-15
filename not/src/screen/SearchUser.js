import React, { useState } from 'react';
import { TextInput, Image, ScrollView, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
const SearchUser = ({ navigation }) => {
    const userList = []
    const user = null
    return (
        <ScrollView style={styles.container}>
            <View>
                <TextInput style={styles.textInput} placeholder='ค้นหาผู้ใช้' />
            </View>
            {/* <FlatList /> */}
            <View style={styles.user}>
                <Image style={styles.userImage} source={user ? { uri: user.image } : require("../../picture/image.png")} />
                <Text>
                    NUT
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2F2C2C",
        padding: 20,
    },
    textInput: {
        marginBottom:15,
        textAlign: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 100,
        padding: 10,
        width: "100%",
        backgroundColor: "#fff"
    },
    user:{
        padding:10,
        backgroundColor:"#fff"
    },
    userImage:{
        width:50,
        height:50,
        borderRadius:50
    }
});

export default SearchUser;
