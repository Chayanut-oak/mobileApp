import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SearchScreen = () => {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleButtonPress = (buttonText) => {
    // Check if the button is already selected
    if (selectedButtons.includes(buttonText)) {
      // If selected, remove it from the selectedButtons array
      setSelectedButtons(selectedButtons.filter((text) => text !== buttonText));
    } else {
      // If not selected, add it to the selectedButtons array
      setSelectedButtons([...selectedButtons, buttonText]);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Selected Buttons: {selectedButtons.join(', ')}</Text>
      <TouchableOpacity
        style={[
          styles.button,
          selectedButtons.includes('Button 1') && styles.selectedButton,
        ]}
        onPress={() => handleButtonPress('Button 1')}
      >
        <Text>Button 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedButtons.includes('Button 2') && styles.selectedButton,
        ]}
        onPress={() => handleButtonPress('Button 2')}
      >
        <Text>Button 2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selectedButtons.includes('Button 3') && styles.selectedButton,
        ]}
        onPress={() => handleButtonPress('Button 3')}
      >
        <Text>Button 3</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    margin: 5,
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
  },
});

export default SearchScreen;
