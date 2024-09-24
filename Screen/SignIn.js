import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, TouchableOpacity } from 'react-native';
import { firebase_auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ScrollView } from 'react-native-gesture-handler';
import { styled } from 'nativewind';

const StyledScrollView = styled(ScrollView);

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = firebase_auth;

  const handleSignIn = async () => {
    try {
      // Sign in using Firebase Auth
      await signInWithEmailAndPassword(auth, email, password);
      // If successful, navigate to the main app screen
      Alert.alert('Sign in successful!');
      navigation.navigate("Drawer"); // Replace with your main screen
    } catch (error) {
      // Handle different authentication errors
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Invalid password');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('No user found with this email');
      } else {
        Alert.alert(error.message);
      }
    }
  };

  return (
    <StyledScrollView className=' bg-sky-100'>
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
              <Text className='p-2 rounded-lg text-sky-500 text-base' onPress={() => navigation.navigate("SignUp")}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </StyledScrollView>
  );
};

export default SignIn;
