import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { updateProfile } from 'firebase/auth';
import { FIREBASE_AUTH, FIRE_STORE } from '../../Firebaseconfig';
import { doc, updateDoc } from 'firebase/firestore';

// ตัวแปรที่เก็บอ้างอิงไปยังเอกสารของผู้ใช้ใน Firestore

const auth = FIREBASE_AUTH;

const EditProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    displayName:'',
    firstName: '',
    lastName: '',
    email: '',
    profileImage: '',
  });

  const fetchUserData = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const { displayName, email, photoURL } = currentUser;
      const [firstName, lastName] = displayName.split(' ');
      setUser({
        displayName,
        firstName,
        lastName,
        email,
        profileImage: photoURL,
      });
    }
  };
  const userDocRef = doc(FIRE_STORE, 'users', auth.currentUser.uid);

  const handleUpdateProfile = async () => {
    try {
      const newDisplayName = `${user.displayName}`;
      const newFirstName = `${user.firstNameName}`;
      const newLastName = `${user.lastNameName}`;
      await updateProfile(auth.currentUser, { displayName: newDisplayName });
      await updateProfile(auth.currentUser, { firstName: newFirstName });
      await updateProfile(auth.currentUser, { lastNameName: newLastName });
      
      // อัปเดตข้อมูลใน Firestore ด้วยชื่อเอกสารของผู้ใช้
      await updateDoc(userDocRef, {
        displayName: newDisplayName,
        firstName: user.firstName,
        lastName: user.lastName
      });
  
      // ส่งข้อมูลไปบันทึกใน Firebase Realtime Database หรือ Cloud Firestore
      // ตามที่คุณต้องการ
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดตโปรไฟล์: ', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textbox}
        placeholder="Display name"
        value={user.displayName}
        onChangeText={(text) => setUser({ ...user, displayName: text })}
      />
      <TextInput
        style={styles.textbox}
        placeholder="First Name"
        value={user.firstName}
        onChangeText={(text) => setUser({ ...user, firstName: text })}
      />
      <TextInput
        style={styles.textbox}
        placeholder="Last Name"
        value={user.lastName}
        onChangeText={(text) => setUser({ ...user, lastName: text })}
      />
      <Button
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
});

export default EditProfileScreen;
