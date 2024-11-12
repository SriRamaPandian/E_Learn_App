import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { firebase_auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logDeviceInfo from './logDeviceInfo';
import CryptoJS from 'crypto-js';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = firebase_auth;

  const handleSignIn = async () => {
    try {
      const hashedPassword = CryptoJS.SHA256(password).toString();
      const userCredential = await signInWithEmailAndPassword(auth, email, hashedPassword);
      await AsyncStorage.setItem('userId', userCredential.user.uid);

      await logDeviceInfo(userCredential.user.uid);

      Alert.alert('Sign in successful!');
      navigation.navigate("Drawer");
    } catch (error) {
      
      let errorMessage = '';
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address format.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Your account has been disabled.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        default:
          errorMessage = 'An unexpected error occurred. Please try again.';
      }
      Alert.alert('Sign In Error', errorMessage);
      console.error('SignIn Error:', error);
    }
  };

  return (
    <ScrollView className=' bg-sky-100'>
      <View className='justify-center items-center'>
        <View className='flex-1 w-3/4 justify-center items-center my-36 py-10 bg-slate-100'>
          <TextInput
            className='w-4/5 mb-8 mx-[30] p-[13] border-2 border-black bg-white rounded-xl text-black'
            placeholder="Email"
            placeholderTextColor={'#000000'}
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            className='w-4/5 mb-8 mx-[30] p-[13] border-2 border-black bg-white rounded-xl text-black'
            placeholder="Password"
            placeholderTextColor={'#000000'}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          <TouchableOpacity className='justify-center items-center' onPress={handleSignIn}>
            <Text className='bg-sky-500 p-2 rounded-lg text-white text-base border'>Sign In</Text>
          </TouchableOpacity>
          <View className='flex-row mt-3 bg-slate-200'>
            <Text className='p-3 mr-3'>Don't have an account?</Text>
            <TouchableOpacity className='justify-center items-center'>
              <Text className='p-2 rounded-lg text-sky-500 text-base' onPress={() => navigation.navigate("RoleSelection")}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
