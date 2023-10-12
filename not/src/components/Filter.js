import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from "react-native-modal";
import axios from 'axios';
const Filter = (props) => {
    const [selectedButtons, setSelectedButtons] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [modalName, setModalName] = useState('');
    const [meallName, setMealName] = useState('');
    const [seasoningInput, setSeasoningInput] = useState('');
    const [categoryInput, setCategoryInput] = useState('');
    const [veggieInput, setVeggieInput] = useState('');
    const [mainInput, setMainInput] = useState('');
    const [categoryButton, setCategoryButton] = useState([
        'Clean',
        'Soup',
    ]);
    const [mainIngredientButton, setMainIngredientButton] = useState([
        'Pork Belly',

        'Teen Chicken',
    ]);
    const [veggieButton, setVeggieButton] = useState(['pukchi',

        'tonhom',
    ]);
    const [seasoningButton, setSeasoningButton] = useState([
        'numpra',
        'numprik'

    ]);

    const handleButtonPress = (buttonText) => {
        if (selectedButtons.includes(buttonText)) {
            setSelectedButtons(selectedButtons.filter((text) => text !== buttonText));

        } else {
            setSelectedButtons([...selectedButtons, buttonText]);
        }
        console.log(props.filter)
    };
    const handleButtonUnpress = (buttonText) => {
        setSelectedButtons(selectedButtons.filter((text) => text !== buttonText));

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

    const handleAdd = () => {
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
            ingredientCategory: categoryInput ? 'category' : mainInput ? 'mainIngredient' : veggieInput ? "veggie&Fruit" : seasoningInput ? 'seasoning' : null,
            ingredientName: categoryInput ? categoryInput : mainInput ? mainInput : veggieInput ? veggieInput : seasoningInput ? seasoningInput : null,
        }

        axios
            .post("http://192.168.1.130:8080/addIngredient", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                alert(error.response.data)
            });
    };
    const splitButtonIntoPairs = (button) => {
        const pairs = [];
        for (let i = 0; i < button.length; i += 3) {
            const pair = button.slice(i, i + 3);
            pairs.push(pair);
        }
        return pairs;
    };
    const selectPairs = splitButtonIntoPairs(selectedButtons);
    const categoryPairs = splitButtonIntoPairs(categoryButton);
    const mainIngredientPairs = splitButtonIntoPairs(mainIngredientButton)
    const veggiePairs = splitButtonIntoPairs(veggieButton)
    const seasoningPairs = splitButtonIntoPairs(seasoningButton)
    return (
        <ScrollView style={{ backgroundColor: '#2F2C2C' }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'white', flex: 1, alignSelf: 'center' }}>ชื่อเมนู:</Text>
                    <TextInput
                        style={styles.input2}
                        placeholder="Name"

                        onChangeText={(text) => setMealName(text)}
                    />
                </View>
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
                                            style={[selectedButtons.includes(item) && styles.selectedButton, styles.TouchableOpacity]}>
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
                                            style={[selectedButtons.includes(item) && styles.selectedButton, styles.TouchableOpacity]}>
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
                                            style={[selectedButtons.includes(item) && styles.selectedButton, styles.TouchableOpacity]}>
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
                                            style={[selectedButtons.includes(item) && styles.selectedButton, styles.TouchableOpacity]}>
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
                        <View style={{ width: 200, height: 200, backgroundColor: '#ffff', justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Name"
                                    onChangeText={handleInputChange} // Step 2: Update the seasoningInput state
                                    ref={(input) => { this.textInputRef = input; }}
                                />
                            </View>
                            <Button title={modalName} onPress={() => { handleAdd(), this.textInputRef.clear(); }} />
                            <Button title="Hide modal" onPress={handelModal} />
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
    },
})