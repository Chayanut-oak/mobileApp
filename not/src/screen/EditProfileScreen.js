import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { updateProfile } from 'firebase/auth';
import { FIREBASE_AUTH, FIRE_STORE, FIRE_STORAGE } from '../../Firebaseconfig';
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { updateUserImage } from '../../redux/userSlice';
// ตัวแปรที่เก็บอ้างอิงไปยังเอกสารของผู้ใช้ใน Firestore

const auth = FIREBASE_AUTH;

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const userStore = useSelector(state => state.user)
  let imageObj = userStore.userImage
  const [selectedImage, setSelectedImage] = useState(userStore.userImage.imagePath)
  const [user, setUser] = useState({
    displayName: '',
    firstName: '',
    lastName: '',
    email: '',
    userImage: '',
  });

  const fetchUserData = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const { displayName, email, userImage, firstName, lastName } = userStore;
      setUser({
        displayName,
        firstName,
        lastName,
        email,
        userImage: userImage,
      });
    }
  };
  const userDocRef = doc(FIRE_STORE, 'users', auth.currentUser.uid);

  const handleUpdateProfile = async () => {
    try {
      if (userStore.userImage.imagePath != selectedImage) {
        if (userStore.userImage.imageName != null) {
          const reference = ref(FIRE_STORAGE, '/userImages/' + userStore.userImage.imageName);
          await deleteObject(reference);
        }
        await uploadImage()
      }
      await updateProfile(auth.currentUser, { displayName: user.displayName, firstName: user.firstName, lastNameName: user.lastName });
      // อัปเดตข้อมูลใน Firestore ด้วยชื่อเอกสารของผู้ใช้

      await updateDoc(userDocRef, {
        displayName: user.displayName,
        firstName: user.firstName,
        lastName: user.lastName,
        userImage: imageObj
      });
      navigation.pop()
      alert("แก้ไขโปรไฟล์สำเร็จ")
      // ส่งข้อมูลไปบันทึกใน Firebase Realtime Database หรือ Cloud Firestore
      // ตามที่คุณต้องการ
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดตโปรไฟล์: ', error);
    }
  };
  const uploadImage = async () => {
    if (selectedImage != null) {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', selectedImage, true);
        xhr.send(null);
      });
      const filename = selectedImage.substring(selectedImage.lastIndexOf('/') + 1);
      const imageStorageRef = ref(FIRE_STORAGE, 'userImages/' + filename);
      await uploadBytes(imageStorageRef, blob, {
        contentType: 'image/jpeg',
      });
      fetchImage(filename)
    }
  };
  const fetchImage = async (filename) => {
    try {
      const reference = ref(FIRE_STORAGE, `/userImages/${filename}`);
      const imageUrl = await getDownloadURL(reference);
      imageObj = { imageName: filename, imagePath: imageUrl }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image style={styles.image} source={selectedImage ? { uri: selectedImage } : require("../../picture/image.png")} />
      </TouchableOpacity>
      <TextInput

        style={styles.textbox}
        placeholder="Displayname"
        value={user.displayName}
        onChangeText={(text) => setUser({ ...user, displayName: text })}
      />
      <TextInput
        style={styles.textbox}
        placeholder="ชื่อจริง"
        value={user.firstName}
        onChangeText={(text) => setUser({ ...user, firstName: text })}
      />
      <TextInput
        style={styles.textbox}
        placeholder="นามสกุล"
        value={user.lastName}
        onChangeText={(text) => setUser({ ...user, lastName: text })}
      />
      <Button
        color="#DD2572"
        title="บันทึกข้อมูล"
        onPress={handleUpdateProfile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Align content to the top
    backgroundColor: '#2F2C2C',
  },
  textbox: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 100
  },

});

export default EditProfileScreen;
