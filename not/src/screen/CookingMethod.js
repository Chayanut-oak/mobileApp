import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const CookingMethod = () => {

  const [step, setStep] = useState([

  ])
  const [detail, setDetail] = useState('')
  const [currentDetail, setCurrentDetail] = useState('')

  const handleRemoveItem = (stepDetail) => {
    
    setStep(step.filter((item ,index)=> index !== stepDetail));
  
  };const handleUpdateStep = (stepIndex) => {
    setStep((prevStep) => {
      const updatedStep = [...prevStep];
      updatedStep[stepIndex].stepDetail = currentDetail;
      return updatedStep;
    });
    console.log(step)
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: 'white' }}>ขั้นตอนการทำ</Text>
      <FlatList
        data={step}
        renderItem={({ item, index }) => (
          <View key={index} style={{ alignItems: "flex-end", }}>
            <View style={styles.stepCard}>
              <LinearGradient style={styles.stepNo} colors={['#DD2572', '#F02E5D']}>
                <Text>
                  {index + 1}
                </Text>
              </LinearGradient>
              <View style={styles.stepDetail}>
                <TextInput style={styles.stepText}  onEndEditing={()=> {handleUpdateStep(index)}} onChangeText={setCurrentDetail}>
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

          </View>
        )} />

      <View style={styles.stepCard1}>
        <TouchableOpacity onPress={() => {
          setStep([...step, { image: 'ปู', stepDetail: detail }])
        }}>
          <LinearGradient style={styles.stepNo1} colors={['#DD2572', '#F02E5D']}>
            <Text>
              <MaterialIcons name="add" size={24} color="black" />
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.stepDetail1}>
          <TextInput style={styles.stepText} placeholder='เพิ่มขั้นตอนการปรุง' value={detail} onChangeText={setDetail} onEndEditing={()=> setCurrentDetail(detail)}>
          </TextInput>
        </View>
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
  }, stepCard1: {
    display: "flex",
    flexDirection: "row",

    alignItems: "center",
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
  },
})