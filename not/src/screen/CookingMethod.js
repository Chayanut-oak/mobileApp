import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { FIRE_STORE, FIRE_STORAGE } from '../../Firebaseconfig';
import { collection, onSnapshot } from 'firebase/firestore';
import Modal from "react-native-modal";
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { saveMethodData } from '../../redux/cookingMethodSlice';
const CookingMethod = () => {
  const mealsCollection = collection(FIRE_STORE, "meals")
  const [step, setStep] = useState([])
  const [detail, setDetail] = useState('')
  const [currentDetail, setCurrentDetail] = useState('')
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [Result, setResult] = useState();
  const [link, setLink] = useState('');
  const methodStore = useSelector((state) => state.cook)
  const cookingMethod = useSelector((state) => state.cook.cookingMethod)
  const dispatch = useDispatch()
  console.log(methodStore)
  const handleRemoveItem = (stepDetail) => {

    setStep(step.filter((item, index) => index !== stepDetail));

  };

  useEffect(() => {
    dispatch(saveMethodData(step))
  }, [step]);
  console.log(step)
  console.log(detail)
  const handleSetStep = () => {
    { setStep([...step, { image: selectedImage, stepDetail: detail }]) }
    dispatch(saveMethodData(step))
    setDetail('')
    setSelectedImage(null)

  };

  const handleUpdateStep = (stepIndex) => {
    setStep((prevStep) => {
      const updatedStep = [...prevStep];
      updatedStep[stepIndex].stepDetail = currentDetail;
      return updatedStep;
    });

  };
  const newImage = async (imageIndex) => {

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setResult(result)
    setSelectedImage(result.assets[0].uri);
    console.log(Result)
    setModalVisible(true)
  }


  const handleUpdateImage = async (imageIndex) => {

    try {
      const imageToDelete = step[imageIndex].image;
      const oldImage = imageToDelete.substring(imageToDelete.lastIndexOf('/') + 1);
      const reference = ref(FIRE_STORAGE, 'stepImages/' + oldImage);
      await deleteObject(reference);
      console.log(selectedImage)
      if (!Result.canceled) {
        setStep((prevStep) => {
          const updatedStep = [...prevStep];
          updatedStep[imageIndex].image = Result.assets[0].uri;
          return updatedStep;
        });
      }

    } catch (error) {
      console.log(error);

    }
  };

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
  const handelModal = () => {
    setModalVisible(!isModalVisible);
    setSelectedImage(null)
  }

  const uploadImage = async (imageIndex) => {
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
      const imageStorageRef = ref(FIRE_STORAGE, 'stepImages/' + filename);
      await uploadBytes(imageStorageRef, blob, {
        contentType: 'image/jpeg',
      });
      setSelectedImage(null);
      setModalVisible(false)
    }

  };


  return (

    <View style={styles.container}>
      <Text style={{ color: 'white' }}>ขั้นตอนการทำ</Text>
      <View style={styles.stepCard2}>
        <View style={styles.stepDetail2}>
          <TextInput style={styles.stepText} placeholder='แนบลิ้งที่เกี่ยวข้อง' onChangeText={setLink} >
          </TextInput>
        </View>

      </View>
      <FlatList
        data={cookingMethod}
        renderItem={({ item, index }) => (
          <View key={index} style={{ alignItems: "flex-end", }}>
            {item.image != null ? <TouchableOpacity onPress={() => { newImage(index) }} style={{ alignSelf: 'center' }}>
              <View style={{ width: 300, height: 200 }}>
                <Image style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 20 }} source={{ uri: item.image }}></Image>

              </View>
            </TouchableOpacity> : null}

            <View style={styles.stepCard}>

              <LinearGradient style={styles.stepNo} colors={['#DD2572', '#F02E5D']}>
                <Text>
                  {index + 1}
                </Text>
              </LinearGradient>
              <View style={styles.stepDetail}>
                <TextInput style={styles.stepText} onEndEditing={() => { handleUpdateStep(index) }} onChangeText={setCurrentDetail}>
                  {item.stepDetail}
                </TextInput>
              </View>

              <TouchableOpacity onPress={() => handleRemoveItem(index)}>
                <LinearGradient style={styles.stepNo2} colors={['#DD2572', '#F02E5D']}>
                  <Text>
                    <Entypo name="minus" size={24} color="black" />
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

            </View>

            <Modal isVisible={isModalVisible}>
              <View style={{ width: 200, height: 200, backgroundColor: '#ffff', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                <Button title='YES' onPress={() => { uploadImage(index), handleUpdateImage(index) }} />
                <Button title="Kotowaru" onPress={handelModal} />
              </View>
            </Modal>
          </View>
        )} />



      <View style={styles.stepCard1}>
        <TouchableOpacity onPress={() => { handleSetStep(), uploadImage() }}>
          <LinearGradient style={styles.stepNo1} colors={['#DD2572', '#F02E5D']}>
            <Text>
              <MaterialIcons name="add" size={24} color="black" />
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.stepDetail1}>
          <TextInput style={styles.stepText} placeholder='เพิ่มขั้นตอนการปรุง' value={detail} onChangeText={setDetail} onEndEditing={() => setCurrentDetail(detail)}>
          </TextInput>
        </View>
        <TouchableOpacity onPress={() => pickImage()}>
          <Image
            style={styles.imagemini}
            source={require('../../picture/addimage.png')}

          />
        </TouchableOpacity>
      </View>


    </View>
  )
}

export default CookingMethod

const styles = StyleSheet.create({
  stepsHeader: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 10,
  },
  stepText: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center'
  },
  stepCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15
  },
  stepCard1: {
    display: "flex",
    flexDirection: "row",


    justifyContent: "center",
    marginTop: 15
  },
  stepCard2: {
    display: "flex",
    flexDirection: "row",


    justifyContent: "center",
    marginTop: 15
  },
  stepNo: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 80,

  },
  stepNo1: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 80,

  },
  stepNo2: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 80,

  },
  stepDetail: {
    flex: 4,
    paddingTop: 10,
    padding: 15,
    paddingLeft: 20,
    marginLeft: -20,
    marginRight: -30,
    zIndex: -2,
    borderRadius: 20,
    backgroundColor: "#fff"
  },
  stepDetail1: {
    flex: 4,
    paddingTop: 10,
    padding: 15,
    paddingLeft: 20,
    marginLeft: -20,

    zIndex: -2,
    borderRadius: 20,
    backgroundColor: "#fff"
  }, stepDetail2: {
    width: '100%',
    paddingTop: 10,
    padding: 15,
    paddingLeft: 20,
    borderRadius: 20,
    backgroundColor: "#fff"
  },
  stepImage: {
    marginTop: 10,
    width: "90%",
    height: 150,
    marginRight: 10,
    resizeMode: "stretch",
  }, container: {
    flex: 1,
    justifyContent: 'flex-start', // Align content to the top
    backgroundColor: '#2F2C2C',
    padding: 20,
    paddingTop: 50,
    height: "100%"
  }, imagemini: {
    position: 'absolute',
    top: -20,
    width: 40,
    left: -40,
    height: 40,
  },
})