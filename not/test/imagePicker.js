import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
// const ImageViewer = (selectedImage ) => {

//     const imageSource = selectedImage ? { uri: selectedImage } : null;

//     return <Image source={imageSource} style={styles.image} />;
// }




const ImgPicker = () => {
    const axiosInstance = axios.create({ baseURL: "http://localhost:8080" })

    const [selectedImage, setSelectedImage] = useState(null);
    useEffect(() => {
        (async () => {
            if (Constants.platform.ios) {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Permission to access media library is required!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            console.log(result)
            setSelectedImage(result.uri);
            // Send the image to the Spring Boot server using Axios
            sendImageToServer(result.uri);
        }
    };
    const sendImageToServer = async (imageUri) => {
        try {
            const formData = new FormData();
            formData.append('image', {
                uri: imageUri,
                type: 'image/jpeg',
                name: 'image.jpg',
            });

            const response = await axiosInstance.post("/api/images/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Image uploaded successfully', response.data);
        } catch (error) {
            console.error('Error uploading image', error);
        }
    };
    const getMeals = () => {
        axios.get('http://localhost8080/getAllMealsForShow').then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })

    }
    return (
        <View style={styles.container}>
            <Button title={"Upload"} onPress={pickImage} />
            <Button title={"getMeals"} onPress={getMeals} />
            <Image style={styles.image} source={{ uri: selectedImage }} />

        </View>
    );
    // ...rest of the code remains same
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Align content to the top
        backgroundColor: '#2F2C2C',
        padding: 20,
        paddingTop: 100, // Add padding/margin to the top
    },
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
});
export default ImgPicker;