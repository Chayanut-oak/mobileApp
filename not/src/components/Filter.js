import { StyleSheet, Text, View, TouchableOpacity, FlatList ,Button, TextInput} from 'react-native'
import React from 'react'
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Modal from "react-native-modal";
const Filter = (props) => {
    const [selectedButtons, setSelectedButtons] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [categoryButton, setCategoryButton] = useState([{
        mealCategory: 'Clean',
    }, {
        mealCategory: 'Soup',
    },]);
    const [mainIngredientButton, setMainIngredientButton] = useState([{
        mainIngredient: 'Pork Belly',
    }, {
        mainIngredient: 'Teen Chicken',
    },]);
    const [veggieButton, setVeggieButton] = useState([{
        veggieAndFruit: 'pukchi',
    }, {
        veggieAndFruit: 'tonhom',
    },]);
    const [seasoningButton, setSeasoningButton] = useState([
        {
            seasoning: 'numpra',
        }, {
            seasoning: 'numprik',
        },
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
        setModalVisible(!isModalVisible)
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={selectedButtons}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View key={index} style={styles.item}>
                        <TouchableOpacity

                            onPress={() => handleButtonUnpress(item)}>
                            <LinearGradient
                                colors={['#DD2572', '#F02E5D']}
                                style={[styles.TouchableOpacity]}>
                                <Text style={styles.centeredText}>{item}</Text>
                            </LinearGradient>

                        </TouchableOpacity>
                    </View>
                )}
            />

            <View style={styles.buttonContainer}>
                <Text>Category</Text>
                <FlatList
                    data={categoryButton}
                    numColumns={3}

                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View key={index} style={styles.item}>
                            <TouchableOpacity

                                onPress={() => handleButtonPress(item.mealCategory)}>
                                <LinearGradient
                                    colors={['#DD2572', '#F02E5D']}
                                    style={[selectedButtons.includes(item.mealCategory) && styles.selectedButton, styles.TouchableOpacity]}>
                                    <Text>{item.mealCategory}</Text>
                                </LinearGradient>

                            </TouchableOpacity>
                        </View>
                    )}
                />

                {props.New == 'New' ? <TouchableOpacity>
                    <LinearGradient
                        colors={['#DD2572', '#F02E5D']}
                        style={[styles.TouchableOpacity]}>
                        <Text>+</Text>
                    </LinearGradient>
                </TouchableOpacity> : null}


                <Text>Main Ingredient</Text>
                <FlatList
                    data={mainIngredientButton}
                    numColumns={3}

                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View key={index} style={styles.item}>
                            <TouchableOpacity onPress={() => handleButtonPress(item.mainIngredient)}>
                                <LinearGradient
                                    colors={['#DD2572', '#F02E5D']}
                                    style={[selectedButtons.includes(item.mainIngredient) && styles.selectedButton, styles.TouchableOpacity]}>
                                    <Text>{item.mainIngredient}</Text>
                                </LinearGradient>

                            </TouchableOpacity>
                        </View>
                    )}
                />
                {props.New == 'New' ? <TouchableOpacity>
                    <LinearGradient
                        colors={['#DD2572', '#F02E5D']}
                        style={[styles.TouchableOpacity]}>
                        <Text>+</Text>
                    </LinearGradient>
                </TouchableOpacity> : null}
                <Text>Vegetable and Fruit</Text>
                <FlatList
                    data={veggieButton}
                    numColumns={3}

                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View key={index} style={styles.item}>
                            <TouchableOpacity

                                onPress={() => handleButtonPress(item.veggieAndFruit)}>
                                <LinearGradient
                                    colors={['#DD2572', '#F02E5D']}
                                    style={[selectedButtons.includes(item.veggieAndFruit) && styles.selectedButton, styles.TouchableOpacity]}>
                                    <Text>{item.veggieAndFruit}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    )}
                />
                {props.New == 'New' ? <TouchableOpacity>
                    <LinearGradient
                        colors={['#DD2572', '#F02E5D']}
                        style={[styles.TouchableOpacity]}>
                        <Text>+</Text>
                    </LinearGradient>
                </TouchableOpacity> : null}
                <Text>Seasoning</Text>
                <FlatList
                    data={seasoningButton}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View key={index} style={styles.item}>
                            <TouchableOpacity onPress={() => handleButtonPress(item.seasoning)}>
                                <LinearGradient
                                    colors={['#DD2572', '#F02E5D']}
                                    style={[selectedButtons.includes(item.seasoning) && styles.selectedButton, styles.TouchableOpacity]}>
                                    <Text>{item.seasoning}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    )}
                />
                {props.New == 'New' ? <TouchableOpacity onPress={handelModal}>
                    <LinearGradient
                        colors={['#DD2572', '#F02E5D']}
                        style={[styles.TouchableOpacity]}>
                        <Text>+</Text>
                    </LinearGradient>
                </TouchableOpacity> : null}
                <Modal isVisible={isModalVisible} style={{}}>
                    <View style={{width:200 , height: 200 , backgroundColor:'#ffff',justifyContent:'center',alignSelf:'center' ,alignItems:'center'}}>
                        <TextInput></TextInput>
                        <Button title="Hide modal" onPress={handelModal} />
                    </View>
                </Modal>
            </View>
        </View>
    );
}

export default Filter

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        marginLeft: 20
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
    },
})