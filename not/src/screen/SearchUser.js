import React, { useState } from 'react';
import { TextInput, Image, ScrollView, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
const SearchUser = ({ navigation }) => {
    const allUser = useSelector(state => state.allUser)
    const [userList, setUserList] = useState([])
    const searchUser = (text) => {
        if (text) {
            let filtered = allUser.filter(user => user.displayName.toLowerCase().includes(text.toLowerCase()));
            setUserList(filtered)
        }
    }


    return (
        <ScrollView style={{ backgroundColor: "#2F2C2C", }}>
            <View style={styles.container}>
                <View>
                    <TextInput style={styles.textInput} placeholder='ค้นหาผู้ใช้' onChangeText={(text) => {
                        searchUser(text)
                    }} />
                </View>
                <View style={{ height: "50%" }}>
                    {userList.map(user => (
                        <TouchableOpacity key={user.userId} onPress={() => { navigation.navigate('ViewUser', { User: user }) }}>
                            <View style={styles.user}>
                                <Image style={styles.userImage} source={user.userImage.imagePath ? { uri: user.userImage.imagePath } : require("../../picture/image.png")} />
                                <Text style={styles.displayName}>
                                    {user.displayName}
                                </Text>
                            </View>
                        </TouchableOpacity>
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
        backgroundColor: "#2F2C2C",
        padding: 20,

    },
    textInput: {
        marginBottom: 15,
        textAlign: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 100,
        padding: 10,
        width: "100%",
        backgroundColor: "#fff"
    },
    user: {
        padding: 10,
        backgroundColor: "#fff",
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
