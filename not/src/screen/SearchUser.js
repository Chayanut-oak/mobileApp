import React, { useState } from 'react';
import { TextInput, Image, ScrollView, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import DropShadow from "react-native-drop-shadow";
const SearchUser = ({ navigation }) => {
    const allUser = useSelector(state => state.allUser)
    const storeUser = useSelector(state => state.user)

    const [userList, setUserList] = useState([])
    const searchUser = (text) => {
        if (text) {
            let filtered = allUser.filter(user => user.displayName.toLowerCase().includes(text.toLowerCase()));
            setUserList(filtered)
        }
    }


    return (
        <ScrollView style={{ backgroundColor: "white", }}>
            <View style={styles.container}>
            <View style={{ shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5},
    shadowOpacity: 0.3,
    shadowRadius: 2.5, 
    elevation:10}}>
                <View>
                    <TextInput style={styles.textInput} placeholder='ค้นหาผู้ใช้' onChangeText={(text) => {
                        searchUser(text)
                    }} />
                </View>
                </View>
                <View style={{ height: "50%",backgroundColor:'#edebeb' }}>
                    {userList.map(user => (
                        <TouchableOpacity key={user.userId} onPress={() => user.userId == storeUser.userId ? navigation.navigate('Profile') : navigation.navigate('ViewUser', { user: user })}>
                            <View style={styles.user}>
                                <Image style={styles.userImage} source={user.userImage.imagePath ? { uri: user.userImage.imagePath } : require("../../picture/image.png")} />
                                <Text style={styles.displayName}>
                                    {user.displayName}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        // </DropShadow>
                    ))
                    }
                </View>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#edebeb',
        padding: 20,

    },
    textInput: {
        marginBottom: 15,
        textAlign: "center",
        borderRadius: 100,
        padding: 10,
        width: "100%",
        backgroundColor: "#fff"
    },
    user: {
        padding: 10,
        backgroundColor: "#edebeb",
        flexDirection: "row",
        borderRadius: 10,
        margin: 5
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    displayName: {
        marginLeft: 15,
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default SearchUser;
