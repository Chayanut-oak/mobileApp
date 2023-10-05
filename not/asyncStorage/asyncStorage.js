import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveuser = async (value) => {
  try {
    await AsyncStorage.setItem('user', value);
  } catch (e) {
    // saving error
    console.log(e)
  }
};