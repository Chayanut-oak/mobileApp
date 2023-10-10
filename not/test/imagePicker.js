import * as ImagePicker from 'expo-image-picker';
import { FIRE_STORE, FIRE_STORAGE } from '../Firebaseconfig';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import { async } from '@firebase/util';
import localIP from '../LocalIP'
import { collection, onSnapshot } from 'firebase/firestore';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// const ImageViewer = (selectedImage ) => {

//     const imageSource = selectedImage ? { uri: selectedImage } : null;

//     return <Image source={imageSource} style={styles.image} />;
// }




const ImgPicker = () => {
    const mealsCollection = collection(FIRE_STORE, "meals")
    // const unsub = onSnapshot(mealsCollection, (snapshot) => {
    //     const allMeals = snapshot.docs.map((doc) => ({
    //         key: doc.id,
    //         ...doc.data(),
    //     }));
    //     console.log("allMeals ", JSON.stringify(allMeals));
    // });
    const [image, setImage] = useState(null)
    // useEffect(() => {
    //     (async () => {
    //         if (Constants.platform.ios) {
    //             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //             if (status !== 'granted') {
    //                 alert('Permission to access media library is required!');
    //             }
    //         }
    //     })();
    // }, []);
    useEffect(() => {
        const fetchImage = async () => {
            try {
                const reference = ref(FIRE_STORAGE, '/images/191a079f-32ea-47c0-897b-37caea55242e.jpeg');
                const imageUrl = await getDownloadURL(reference);
                setImage(imageUrl);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [])
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.canceled) {
            const source = { uri: result.assets[0].uri }
            console.log(source)
            setImage(source)
        }
        console.log(image)
        fetchImage();
    };
    const uploadImage = async () => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', image.uri, true);
            xhr.send(null);
        });
        const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
        const imageStorageRef = ref(FIRE_STORAGE, 'images/' + filename);
        await uploadBytes(imageStorageRef, blob, {
            contentType: 'image/jpeg',
        });
        setImage(null);
    };
    // const uploadImage = async () => {
    //     const response = await fetch(image)
    //     const blob = await response.blob()
    //     const storageRef = ref(FIRE_STORAGE, "image")
    //     const uploadTask = uploadImage
    // }
    // const sendImageToServer = async (imageUri) => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('image', {
    //             uri: imageUri,
    //             type: 'image/jpeg',
    //             name: 'image.jpg',
    //         });

    //         const response = await axios.post(`http://${localIP}/images/upload`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });

    //         console.log('Image uploaded successfully', response.data);
    //     } catch (error) {
    //         console.error('Error uploading image', error);
    //     }
    // };
    // const getMeals = async () => {
    //     await axios.get(`http://${localIP}/getAllMealsForShow`).then((res) => {
    //         console.log(res)
    //     }).catch((error) => {
    //         console.error(error);
    //     });
    // }
    // const getImage = async (name) => {
    //     await axios.get(`http://${localIP}/images/get/${name}`).then((response) => {
    //         console.log(response.data);
    //         setSelectedImage(`data:image/jpeg;base64,${response.data}`);
    //         // setSelectedImage();
    //     })
    //         .catch((error) => {
    //             console.error('Error fetching image:', error);
    //         });
    // }

    return (
        <View style={styles.container}>
            <Button title={"Upload"} onPress={pickImage} />
            <Button title={"UploadS"} onPress={uploadImage} />
            {/* <Button title={"getMeals"} onPress={getMeals} />
            <Button title={"getImage"} onPress={() => {
                getImage("image.jpg")
            }} /> */}
            {/* <Image style={styles.image} source={{ uri: `http://${localIP}/image.jpg` }} /> */}
            <Image style={styles.image} source={{ uri: image}} />

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