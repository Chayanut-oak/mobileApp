import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button, TextInput, ScrollView, Image } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from "react-native-modal";
import axios from 'axios';
import { FIRE_STORE } from '../../Firebaseconfig';
import { collection, addDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { saveMethodData } from '../../redux/cookingMethodSlice';
import { saveMethodImageData, resetDataToFalse, saveMethodTagsData, saveMethodMealNameData, delMethodTagsData } from '../../redux/cookingMethodSlice';
const Filter = (props, { route }) => {
    const dispatch = useDispatch();
    const cookStore = useSelector((state) => state.cook)
    const storeIngredient = useSelector((state) => state.ingredient);
    const [selectedButtons, setSelectedButtons] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalName, setModalName] = useState('');
    const [meallName, setMealName] = useState('');
    const [seasoningInput, setSeasoningInput] = useState('');
    const [categoryInput, setCategoryInput] = useState('');
    const [veggieInput, setVeggieInput] = useState('');
    const [mainInput, setMainInput] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (storeIngredient.length != 0) {
            const arra = storeIngredient.filter((item) => item.ingredientCategory == "วัถุดิบหลัก");
            setMainIngredientButton(arra.map(item => item.ingredientName));
            const arra2 = storeIngredient.filter((item) => item.ingredientCategory == "ผักและผลไม้");
            setVeggieButton(arra2.map(item => item.ingredientName));
            const arra3 = storeIngredient.filter((item) => item.ingredientCategory == "หมวดหมู่");
            setCategoryButton(arra3.map(item => item.ingredientName));
            const arra4 = storeIngredient.filter((item) => item.ingredientCategory == "เครื่องปรุง");
            setSeasoningButton(arra4.map(item => item.ingredientName));
        }
    }, [storeIngredient]);


    const [categoryButton, setCategoryButton] = useState([]);
    const [mainIngredientButton, setMainIngredientButton] = useState([]);
    const [veggieButton, setVeggieButton] = useState([]);
    const [seasoningButton, setSeasoningButton] = useState([]);

    const handleButtonPress = (buttonText) => {
        if (cookStore.tags.includes(buttonText)) {
            // setSelectedButtons(selectedButtons.filter((text) => text !== buttonText));
            const newTags = cookStore.tags.filter((text) => text !== buttonText)
            console.log(newTags)
            dispatch(delMethodTagsData(newTags))
        } else {
            // setSelectedButtons([...selectedButtons, buttonText]);
            dispatch(saveMethodTagsData(buttonText))
        }
    };

    const handleButtonUnpress = (buttonText) => {
        const newTags = cookStore.tags.filter((text) => text !== buttonText)

        dispatch(delMethodTagsData(newTags))
    };

    const handelModal = () => {
        setModalVisible(!isModalVisible);
        setModalName('');

    }

    const handleInputChange = (text) => {
        if (modalName == 'Add Seasoning') {
            setSeasoningInput(text);
        }
        if (modalName == 'Add Main Ingredient') {
            setMainInput(text)
        }
        if (modalName == 'New Category') {
            setCategoryInput(text);
        }
        if (modalName == 'Add Vegetable or Fruit') {
            setVeggieInput(text);
        }
    };

    const handleAdd = async () => {
        if (seasoningInput.trim() !== '') {
            setSeasoningButton([...seasoningButton, seasoningInput]);
            setSeasoningInput('');
        } if (mainInput.trim() !== '') {
            setMainIngredientButton([...mainIngredientButton, mainInput]);
            setMainInput('');
        } if (veggieInput.trim() !== '') {
            setVeggieButton([...veggieButton, veggieInput]);
            setVeggieInput('');
        } if (categoryInput.trim() !== '') {
            setCategoryButton([...categoryButton, categoryInput]);
            setCategoryInput('');
        }
        const data = {
            ingredientId: null,
            ingredientCategory: categoryInput ? 'หมวดหมู่' : mainInput ? 'วัถุดิบหลัก' : veggieInput ? "ผักและผลไม้" : seasoningInput ? 'เครื่องปรุง' : null,
            ingredientName: categoryInput ? categoryInput : mainInput ? mainInput : veggieInput ? veggieInput : seasoningInput ? seasoningInput : null,
        }
        if (data.ingredientName != null) {
            await addDoc(collection(FIRE_STORE, "ingredients"), {
                ingredientCategory: data.ingredientCategory,
                ingredientName: data.ingredientName,

            });
        }
    };
    const splitButtonIntoPairs = (button) => {
        const pairs = [];
        if (Array.isArray(button) && button.length > 0) {
            for (let i = 0; i < button.length; i += 3) {
                const pair = button.slice(i, i + 3);
                pairs.push(pair);
            }
        }
        return pairs;
    };
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        if (!result.canceled) {

            var filename = result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf('/') + 1);

            dispatch(saveMethodImageData({ mainImage: result.assets[0].uri, imageName: filename }))
            setSelectedImage(null)
        }
    };
    const newMealName = async (text) => {
        dispatch(saveMethodMealNameData({ mealName: text }))
    };

    const navigation = useNavigation();
    const navigateToTargetScreen = () => {
        navigation.navigate('TargetScreen', { selectedImage });
    };
    const selectPairs = splitButtonIntoPairs(cookStore.tags);
    const categoryPairs = splitButtonIntoPairs(categoryButton);
    const mainIngredientPairs = splitButtonIntoPairs(mainIngredientButton)
    const veggiePairs = splitButtonIntoPairs(veggieButton)
    const seasoningPairs = splitButtonIntoPairs(seasoningButton)
    console.log(cookStore)
    return (
        <ScrollView style={{ backgroundColor: '#2F2C2C' }}>
            <View style={styles.container}>

                {props.New == 'New' ? <TouchableOpacity onPress={() => pickImage()}>
                    <View style={{ width: 300, height: 200, backgroundColor: '#888888', alignSelf: 'center', marginBottom: 15 }}>
                        <Image style={{ width: '100%', height: '100%', resizeMode: 'contain', borderRadius: 20 }} source={{ uri: cookStore.mealImage.imagePath }} ></Image>
                    </View>
                </TouchableOpacity> : null}

                {props.New == 'New' ? <View style={{ flexDirection: 'row' }}>

                    <Text style={{ color: 'white', flex: 1, alignSelf: 'center' }}>ชื่อเมนู:</Text>
                    <TextInput
                        style={styles.input2}
                        placeholder="Name"

                        onChangeText={(text) => newMealName(text)}
                    />

                </View> : null}
                {selectPairs.map((pair, pairIndex) => (
                    <View key={pairIndex} style={styles.row} >
                        {pair.map((item, itemIndex) => (
                            <View style={styles.item}
                                key={itemIndex}>
                                <TouchableOpacity

                                    onPress={() => handleButtonUnpress(item)}>
                                    <LinearGradient
                                        colors={['#DD2572', '#F02E5D']}
                                        style={[styles.TouchableOpacity]}>
                                        <Text style={styles.centeredText}>{item}</Text>
                                    </LinearGradient>

                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                ))}
                <View style={{
                    height: 1,
                    backgroundColor: '#D1D1D1',

                    width: "auto"
                }} />
                <View style={styles.buttonContainer}>

                    <Text style={{ color: '#F3F3F3', margin: 5 }}>Category</Text>
                    {categoryPairs.map((pair, pairIndex) => (
                        <View key={pairIndex} style={styles.row} >
                            {pair.map((item, itemIndex) => (
                                <View style={styles.item}
                                    key={itemIndex}>
                                    <TouchableOpacity
                                        onPress={() => handleButtonPress(item)}>
                                        <LinearGradient
                                            colors={['#DD2572', '#F02E5D']}
                                            style={[cookStore.tags.includes(item) && styles.selectedButton, styles.TouchableOpacity]}>
                                            <Text style={{ color: '#F3F3F3' }}>{item}</Text>
                                        </LinearGradient>

                                    </TouchableOpacity>
                                </View>

                            ))}
                        </View>
                    ))}
                    {props.New == 'New' ? <TouchableOpacity onPress={() => { handelModal(), setModalName('New Category') }}>
                        <LinearGradient
                            colors={['#DD2572', '#F02E5D']}
                            style={[styles.TouchableOpacity]}>
                            <Text style={{ color: '#F3F3F3' }}>+</Text>
                        </LinearGradient>
                    </TouchableOpacity> : null}

                    <Text style={{ color: '#F3F3F3', margin: 5 }}>Main Ingredient</Text>
                    {mainIngredientPairs.map((pair, pairIndex) => (
                        <View key={pairIndex} style={styles.row} >
                            {pair.map((item, itemIndex) => (
                                <View style={styles.item}
                                    key={itemIndex}>
                                    <TouchableOpacity

                                        onPress={() => handleButtonPress(item)}>
                                        <LinearGradient
                                            colors={['#DD2572', '#F02E5D']}
                                            style={[cookStore.tags.includes(item) && styles.selectedButton, styles.TouchableOpacity]}>
                                            <Text style={{ color: '#F3F3F3' }}>{item}</Text>
                                        </LinearGradient>

                                    </TouchableOpacity>
                                </View>

                            ))}
                        </View>
                    ))}
                    {props.New == 'New' ? <TouchableOpacity onPress={() => { handelModal(), setModalName('Add Main Ingredient') }}>
                        <LinearGradient
                            colors={['#DD2572', '#F02E5D']}
                            style={[styles.TouchableOpacity]}>
                            <Text style={{ color: '#F3F3F3' }}>+</Text>
                        </LinearGradient>
                    </TouchableOpacity> : null}
                    <Text style={{ color: '#F3F3F3', margin: 5 }}>Vegetable and Fruit</Text>
                    {veggiePairs.map((pair, pairIndex) => (
                        <View key={pairIndex} style={styles.row} >
                            {pair.map((item, itemIndex) => (
                                <View style={styles.item}
                                    key={itemIndex}>
                                    <TouchableOpacity

                                        onPress={() => handleButtonPress(item)}>
                                        <LinearGradient
                                            colors={['#DD2572', '#F02E5D']}
                                            style={[cookStore.tags.includes(item) && styles.selectedButton, styles.TouchableOpacity]}>
                                            <Text style={{ color: '#F3F3F3' }}>{item}</Text>
                                        </LinearGradient>

                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    ))}
                    {props.New == 'New' ? <TouchableOpacity onPress={() => { handelModal(), setModalName('Add Vegetable or Fruit') }}>
                        <LinearGradient
                            colors={['#DD2572', '#F02E5D']}
                            style={[styles.TouchableOpacity]}>
                            <Text style={{ color: '#F3F3F3' }}>+</Text>
                        </LinearGradient>
                    </TouchableOpacity> : null}
                    <Text style={{ color: '#F3F3F3', margin: 5 }}>Seasoning</Text>
                    {seasoningPairs.map((pair, pairIndex) => (
                        <View key={pairIndex} style={styles.row} >
                            {pair.map((item, itemIndex) => (
                                <View style={styles.item}
                                    key={itemIndex}>
                                    <TouchableOpacity

                                        onPress={() => handleButtonPress(item)}>
                                        <LinearGradient
                                            colors={['#DD2572', '#F02E5D']}
                                            style={[cookStore.tags.includes(item) && styles.selectedButton, styles.TouchableOpacity]}>
                                            <Text style={{ color: '#F3F3F3' }}>{item}</Text>
                                        </LinearGradient>

                                    </TouchableOpacity>
                                </View>

                            ))}
                        </View>
                    ))}
                    {props.New == 'New' ? <TouchableOpacity onPress={() => { handelModal(), setModalName('Add Seasoning') }}>
                        <LinearGradient
                            colors={['#DD2572', '#F02E5D']}
                            style={[styles.TouchableOpacity]}>
                            <Text style={{ color: '#F3F3F3' }}>+</Text>
                        </LinearGradient>
                    </TouchableOpacity> : null}
                    <Modal isVisible={isModalVisible}>
                        <View style={{ width: 200, height: 200, backgroundColor: '#2F2C2C', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Name"
                                    onChangeText={handleInputChange} // Step 2: Update the seasoningInput state
                                    ref={(input) => { this.textInputRef = input; }}
                                />
                            </View>
                            <View style={styles.buttonModal}>
                                <Button color="#DD2572" title={modalName} onPress={() => { handleAdd(), this.textInputRef.clear(); }} />
                            </View>
                            <View style={styles.buttonModal}>
                                <Button color="#DD2572" title="Cancel" onPress={handelModal} />
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </ScrollView>
    );
}

export default Filter

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Align content to the top
        height: "100%",
        backgroundColor: '#2F2C2C',
        padding: 20,
        paddingTop: 50,
    },
    buttonContainer: {
        alignItems: 'flex-start',
    },
    button: {
        backgroundColor: '#E0E0E0',
        padding: 10,
        margin: 5,
    },
    selectedButton: {
        opacity: 0.2
    }, item: {
        alignItems: 'center',
        marginBottom: 5
    }, centeredText: {
        textAlign: 'center', // Add this style to center the text horizontally
        color: 'white'
    }, TouchableOpacity: {
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10, // Adjust padding
        paddingHorizontal: 20, // Adjust padding
        backgroundColor: '#fff',
        borderRadius: 50,
        width: 'auto', // Allow the width to adjust based on content
        marginRight: 5
    }, inputContainer: {
        width: '100%',
        alignItems: 'center', // Center the input fields horizontally
        padding: 10
    },
    input2: {
        width: '100%',
        flex: 6,
        height: 40,
        backgroundColor: '#D9D9D9',
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        borderRadius: 50,
        textAlign: 'center'
    }, row: {
        flexDirection: 'row',

    }, input: {
        width: '100%',

        height: 40,
        backgroundColor: '#D9D9D9',
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        borderRadius: 50,
        textAlign: 'center'
    }, buttonModal: {
        width: "80%",
        marginTop: 10
    }
})