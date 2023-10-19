import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button, TextInput, ScrollView, Image } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from "react-native-modal";
import axios from 'axios';
import { FIRE_STORE, FIRE_STORAGE } from '../../Firebaseconfig';
import { collection, addDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { saveMethodData } from '../../redux/cookingMethodSlice';
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { saveMethodImageData, resetDataToFalse, saveMethodTagsData, saveMethodMealNameData, delMethodTagsData } from '../../redux/cookingMethodSlice';
const Filter = (props, { route }) => {
    const dispatch = useDispatch();
    const cookStore = useSelector((state) => state.cook)
    const mealStore = useSelector((state) => state.meal)
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
    const [textSeacrh, setTexSeacrh] = useState("")
    const [mealFiltered, setMealFiltered] = useState([])

    useEffect(() => {
        if (storeIngredient.length != 0) {
            const arra = storeIngredient.filter((item) => item.ingredientCategory == "วัถุดิบหลัก");
            setMainIngredientButton(arra);
            const arra2 = storeIngredient.filter((item) => item.ingredientCategory == "ผักและผลไม้");
            setVeggieButton(arra2);
            const arra3 = storeIngredient.filter((item) => item.ingredientCategory == "หมวดหมู่");
            setCategoryButton(arra3);
            const arra4 = storeIngredient.filter((item) => item.ingredientCategory == "เครื่องปรุง");
            setSeasoningButton(arra4);
        }

    }, [storeIngredient]);
    useEffect(() => {
        const searchMenu = () => {
            let filtered = mealStore.filter(meal => {
                console.log("Meals tags", meal);
                console.log("Selected tags", cookStore.tags);
                // Check if any of the selected tags are in meal.tags
                const commonTags = meal.tags.filter(tag => cookStore.tags.includes(tag));

                // Check if the meal name contains the search text (case-insensitive)
                const nameMatchesSearch = meal.mealName.toLowerCase().includes(textSeacrh.toLowerCase());

                if (cookStore.tags.length > 0 && textSeacrh === "") {
                    return commonTags.length > 0; // Filter by tags only.
                } else if (cookStore.tags.length === 0 && textSeacrh !== "") {
                    return nameMatchesSearch; // Filter by name only.
                } else {
                    return commonTags.length > 0 && nameMatchesSearch; // Filter by both tags and name.
                }
            });
            setMealFiltered(filtered)
            console.log(filtered.length, textSeacrh)

        }
        searchMenu()
    }, [textSeacrh, cookStore])

    const [categoryButton, setCategoryButton] = useState([]);
    const [mainIngredientButton, setMainIngredientButton] = useState([]);
    const [veggieButton, setVeggieButton] = useState([]);
    const [seasoningButton, setSeasoningButton] = useState([]);

    const handleButtonPress = (buttonText) => {
        if (cookStore.tags.includes(buttonText)) {
            // setSelectedButtons(selectedButtons.filter((text) => text !== buttonText));
            const newTags = cookStore.tags.filter((text) => text !== buttonText)
            // console.log(newTags)
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
        if (modalName == 'เพิ่มเครื่องปรุง') {
            setSeasoningInput(text);
        }
        if (modalName == 'เพิ่มวัถุดิบหลัก') {
            setMainInput(text)
        }
        if (modalName == 'เพิ่มหมวดหมู่') {
            setCategoryInput(text);
        }
        if (modalName == 'เพิ่มผักและผลไม้') {
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

        if (cookStore.mealImage.imagePath) {
            const imageToDelete = cookStore.mealImage.imageName;
            const reference = ref(FIRE_STORAGE, '/mealsImages/' + imageToDelete);

            await deleteObject(reference);
            dispatch(saveMethodImageData({ mainImage: null, imageName: null }))

        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.canceled) {
            uploadImage(result.assets[0].uri)
            // var filename = result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf('/') + 1);

            // dispatch(saveMethodImageData({ mainImage: result.assets[0].uri, imageName: filename }))
            // setSelectedImage(null)
        }

    };

    const setImageData = async (File) => {
        var filename = File.substring(File.lastIndexOf('/') + 1);
        var reference = ref(FIRE_STORAGE, '/mealsImages/' + filename)
        const imageUrl = await getDownloadURL(reference);
        dispatch(saveMethodImageData({ mainImage: imageUrl, imageName: filename }))
        setSelectedImage(null)
    }
    const uploadImage = async (Image) => {

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', Image, true);
            xhr.send(null);
        });
        const filename = Image.substring(Image.lastIndexOf('/') + 1);
        const imageStorageRef = ref(FIRE_STORAGE, '/mealsImages/' + filename);
        await uploadBytes(imageStorageRef, blob, {
            contentType: 'image/jpeg',
        });

        setImageData(Image)

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

    const FoodCard = (meal) => {
        return (
            <TouchableOpacity key={meal.mealId} style={styles.foodCard} onPress={() => navigation.navigate("mealDetail", { mealId: meal.mealId })}>
                <Image style={styles.foodImage} source={meal.mealImage ? { uri: meal.mealImage.imagePath } : require("../../picture/image.png")} />
                <View style={styles.foodText}>
                    <Text style={{ fontWeight: "bold" }}>ชื่อเมนู: {meal.mealName}</Text>
                    <Text style={{ fontWeight: "bold" }}>Tags:{meal.tags.map(tag => " " + tag.ingredientName) + " "}</Text>
                    <Text style={{ fontWeight: "bold" }}>ขาดTags:{meal.tags.filter(mealTag => {
                        return !cookStore.tags.some(tag => mealTag.ingredientId === tag.ingredientId)
                    }).map(tag => " " + tag.ingredientName) + " "}</Text>
                    <Text style={{ fontWeight: "bold" }}>โดย: {meal.createdBy.displayName}</Text>
                </View>
            </TouchableOpacity>

        )
    }


    return (
        <ScrollView style={{ backgroundColor: '#2F2C2C' }}>
            <View style={styles.container}>
                {props.filter == 'filter' ? <View>
                    <TextInput style={styles.textInput} placeholder='ค้นหาเมนูอาหาร' onChangeText={(text) => {
                        setTexSeacrh(text)
                    }} />
                </View> : null}


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
                        value={cookStore.mealName}
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
                                        <Text style={styles.centeredText}>{item.ingredientName}</Text>
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

                    <Text style={{ color: '#F3F3F3', margin: 5 }}>หมวดหมู่</Text>
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
                                            <Text style={{ color: '#F3F3F3' }}>{item.ingredientName}</Text>
                                        </LinearGradient>

                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    ))}
                    {props.New == 'New' ? <TouchableOpacity onPress={() => { handelModal(), setModalName('เพิ่มหมวดหมู่') }}>
                        <LinearGradient
                            colors={['#DD2572', '#F02E5D']}
                            style={[styles.TouchableOpacity]}>
                            <Text style={{ color: '#F3F3F3' }}>+</Text>
                        </LinearGradient>
                    </TouchableOpacity> : null}

                    <Text style={{ color: '#F3F3F3', margin: 5 }}>วัถุดิบหลัก</Text>
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
                                            <Text style={{ color: '#F3F3F3' }}>{item.ingredientName}</Text>
                                        </LinearGradient>

                                    </TouchableOpacity>
                                </View>

                            ))}
                        </View>
                    ))}
                    {props.New == 'New' ? <TouchableOpacity onPress={() => { handelModal(), setModalName('เพิ่มวัถุดิบหลัก') }}>
                        <LinearGradient
                            colors={['#DD2572', '#F02E5D']}
                            style={[styles.TouchableOpacity]}>
                            <Text style={{ color: '#F3F3F3' }}>+</Text>
                        </LinearGradient>
                    </TouchableOpacity> : null}
                    <Text style={{ color: '#F3F3F3', margin: 5 }}>ผักและผลไม้</Text>
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
                                            <Text style={{ color: '#F3F3F3' }}>{item.ingredientName}</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    ))}
                    {props.New == 'New' ? <TouchableOpacity onPress={() => { handelModal(), setModalName('เพิ่มผักและผลไม้') }}>
                        <LinearGradient
                            colors={['#DD2572', '#F02E5D']}
                            style={[styles.TouchableOpacity]}>
                            <Text style={{ color: '#F3F3F3' }}>+</Text>
                        </LinearGradient>
                    </TouchableOpacity> : null}
                    <Text style={{ color: '#F3F3F3', margin: 5 }}>เครื่องปรุง</Text>
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
                                            <Text style={{ color: '#F3F3F3' }}>{item.ingredientName}</Text>
                                        </LinearGradient>

                                    </TouchableOpacity>
                                </View>

                            ))}
                        </View>
                    ))}
                    {props.New == 'New' ? <TouchableOpacity onPress={() => { handelModal(), setModalName('เพิ่มเครื่องปรุง') }}>
                        <LinearGradient
                            colors={['#DD2572', '#F02E5D']}
                            style={[styles.TouchableOpacity]}>
                            <Text style={{ color: '#F3F3F3' }}>+</Text>
                        </LinearGradient>
                    </TouchableOpacity> : null}


                    {props.filter = "filter" ?
                        mealFiltered.map(meal => FoodCard(meal)) : null
                    }
                    <Modal isVisible={isModalVisible}>
                        <View style={{ width: 200, height: 200, backgroundColor: '#2F2C2C', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="ชื่อ"
                                    onChangeText={handleInputChange} // Step 2: Update the seasoningInput state
                                    ref={(input) => { this.textInputRef = input; }}
                                />
                            </View>
                            <View style={styles.buttonModal}>
                                <Button color="#DD2572" title={modalName} onPress={() => { handleAdd(), this.textInputRef.clear(); }} />
                            </View>
                            <View style={styles.buttonModal}>
                                <Button color="#DD2572" title="ปิด" onPress={handelModal} />
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
    foodCard: {
        width: "100%",
        flexDirection: "row",
        flex: 1,
        padding: 10,
        marginTop: 10,
        backgroundColor: "#fff",
        borderRadius: 20,
    },
    foodImage: {
        flex: 1
    },
    foodText: {
        flex: 2,
        marginLeft: 10
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Align content to the top
        height: "100%",
        backgroundColor: '#2F2C2C',
        padding: 20,
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
    }, textInput: {
        marginBottom: 15,
        textAlign: "center",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 100,
        padding: 10,
        width: "100%",
        backgroundColor: "#fff"
    },
})