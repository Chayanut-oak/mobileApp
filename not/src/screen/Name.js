import { Button, StyleSheet, Text, View, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { updateProfile } from 'firebase/auth';
import { FIREBASE_AUTH, FIRE_STORE, FIRE_STORAGE } from '../../Firebaseconfig'
import { HeaderButton } from "react-navigation-header-buttons";
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from "react-native";
import { getAuth } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { saveUserData } from '../../redux/userSlice';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
const Name = ({ navigation }) => {

  const dispatch = useDispatch();
  const auth = FIREBASE_AUTH

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageObj, setImageObj] = useState({});
  const [displayName, setDisplayName] = useState('');
  const [userId, setUserId] = useState("")
  useEffect(() => {
    if (Object.keys(imageObj).length != 0) {
      const collectRef = collection(FIRE_STORE, "users")
      const userRef = doc(collectRef, userId)
      updateDoc(userRef, {
        "displayName": displayName,
        "userImage": imageObj,
      });
    }
  }, [imageObj])
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
  const fetchImage = async (filename) => {
    try {
      const reference = ref(FIRE_STORAGE, `/userImages/${filename}`);
      const imageUrl = await getDownloadURL(reference);
      setImageObj({ imageName: filename, imagePath: imageUrl })
    } catch (error) {
      console.error('Error fetching image:', error);
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
  const handleDisplayName = async () => {
    try {
      const auth = getAuth();
      const res = auth.currentUser;
      setUserId(res.uid)

      await updateProfile(res, {
        displayName: displayName,

      });
      const user = {
        displayName: displayName
      }
      // dispatch(saveUserData(user));
      dispatch(saveUserData(user));
      if (displayName != '' && selectedImage != null) {
        await uploadImage()
      } else if (displayName != '') {
        const collectRef = collection(FIRE_STORE, "users")
        const userRef = doc(collectRef, userId)
        updateDoc(userRef, {
          "displayName": displayName,
        });
      }

    } catch (error) {
      const errorMessage = error.message;
      // alert(errorMessage);
    }
  };

  return (
    <View>
      <LinearGradient
        colors={['#CD2A51', '#871b4f']} >
        <View >
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={selectedImage ? { uri: selectedImage } : require('../../picture/image.png')}
            />
            <TouchableOpacity onPress={pickImage}>
              <Image
                style={styles.imagemini}
                source={require('../../picture/addimage.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="ใส่ชื่อที่คุณต้องการแสดง"
                onChangeText={(text) => setDisplayName(text)}
              />
            </View>
            <TouchableOpacity onPress={handleDisplayName}>
              <LinearGradient
                colors={['#DD2572', '#F02E5D']}
                style={styles.TouchableOpacity} >
                <Text style={styles.Font}>CONFIRM</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

      </LinearGradient>
    </View>

  )
}

export default Name

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start', // Align content to the top
    alignItems: 'center',
    backgroundColor: '#2F2C2C',
    paddingTop: 50,
    width: 600,
    height: 600,
    borderRadius: 600 / 2,
    marginRight: 100,
    marginLeft: -100,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 100,
    position: 'relative', // Add this to enable absolute positioning
  },
  image: {
    width: 175,
    height: 175,
    borderRadius: 100
  },
  imagemini: {
    position: 'absolute',
    top: -45,
    width: 60,
    left: 25,
    height: 60,
  },
  inputContainer: {

    width: '50%',
    alignItems: 'center', // Center the input fields horizontally
  },
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#D9D9D9',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 50,
    textAlign: "center",
    fontSize: 20
  },
  TouchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 50,
  }, Font: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "white"
  },
})
