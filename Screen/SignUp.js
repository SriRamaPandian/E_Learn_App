import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { firebase_auth, firebase_db } from '../firebaseConfig';
import CryptoJS from 'crypto-js'; // Import crypto-js
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import { styled } from 'nativewind';
import { setDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


const StyledScrollView = styled(ScrollView);

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rollno, setrollno] = useState('');
  const [year, setyear] = useState('');
  const [sem, setsem] = useState('');
  const [dept,setdept] = useState(null);
  const auth = firebase_auth;


const handleSignUp = async () => {
  try {
    if (!email || !password || !username || !rollno || !year || !sem || !dept) {
      throw new Error('All fields are required');
    }

    // Hash the password using crypto-js (SHA256)
    const hashedPassword = CryptoJS.SHA256(password).toString();

    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, hashedPassword);
    // Store the user information with the hashed password
    await setDoc(doc(firebase_db, 'Profile', userCredential.user.uid), {
      username,
      email,
      password: hashedPassword, // Store the hashed password
      rollno,
      year,
      sem,
      dept,
      createdAt: new Date(),
    });

    // Store user ID in AsyncStorage for persistent login
    await AsyncStorage.setItem('userId', userCredential.user.uid);

    // Notify the user of successful signup
    Alert.alert('Sign up successful!');
    navigation.navigate("SelectFav");

  } catch (error) {
    // Handle and log errors
    Alert.alert(error.message);
    console.error(error.message);
  }
};

  

  return (
    <StyledScrollView className=' bg-sky-100'>
        <View className='justify-center items-center'>
        <View className='flex-1 w-3/4 justify-center items-center my-10 py-10 bg-slate-100 '>
        <TextInput
                className='w-3/4 mb-[30] p-[13] border-2 border-black bg-white rounded-xl text-black'
                placeholder="Username" 
                placeholderTextColor={'#000000'}
                onChangeText={text => setUsername(text)} 
                value={username} />
        <TextInput 
                className='w-3/4 mb-[30] p-[13] border-2 border-black bg-white rounded-xl text-black'
                placeholder="Email" 
                placeholderTextColor={'#000000'}
                onChangeText={text => setEmail(text)} 
                value={email} />
        <TextInput 
                className='w-3/4 mb-[30] p-[13] border-2 border-black bg-white rounded-xl text-black'
                placeholder="Password" 
                placeholderTextColor={'#000000'}
                onChangeText={text => setPassword(text)} 
                value={password} 
                secureTextEntry />
        <TextInput
                className='w-3/4 mb-[30] p-[13] border-2 border-black bg-white rounded-xl text-black'
                placeholder="Rollno"
                placeholderTextColor={'#000000'}
                onChangeText={text => setrollno(text)}
                value={rollno}
                keyboardType="number-pad"
                />
        <TextInput
                className='w-3/4 mb-[30] p-[13] border-2 border-black bg-white rounded-xl text-black'
                placeholder="Year"
                placeholderTextColor={'#000000'}
                onChangeText={text => setyear(text)}
                value={year}
                keyboardType="number-pad"
                />
        <TextInput
                className='w-3/4 mb-[30] p-[13] border-2 border-black bg-white rounded-xl text-black'
                placeholder="Sem"
                placeholderTextColor={'#000000'}
                onChangeText={text => setsem(text)}
                value={sem}
                keyboardType="number-pad"
                />
                <View className='w-3/4 mb-[60] border-2 border-black bg-white rounded-xl text-black'>
                {dept === null ? (
                <Picker
                    selectedValue={dept}
                    onValueChange={(itemValue) => setdept(itemValue)}>
                    <Picker.Item label="Department" value={null} />
                    <Picker.Item label="CSE" value="CSE" />
                    <Picker.Item label="MECH" value="MECH" />
                    <Picker.Item label="ECE" value="ECE" />
                </Picker>) : (
                <Picker
                    selectedValue={dept}
                    onValueChange={(itemValue) => setdept(itemValue)}>
                    <Picker.Item label="CSE" value="CSE" />
                    <Picker.Item label="MECH" value="MECH" />
                    <Picker.Item label="ECE" value="ECE" />
                </Picker>)}
                </View>
        <Button title="Sign Up" onPress={handleSignUp} />
        </View>
        </View>
    </StyledScrollView>
  );
};

export default SignUp;
