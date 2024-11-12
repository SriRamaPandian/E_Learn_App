import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { firebase_auth, firebase_db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import { styled } from 'nativewind';
import { setDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logDeviceInfo from './logDeviceInfo';
import CryptoJS from 'crypto-js';

const StyledScrollView = styled(ScrollView);

const StaffSignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [institutionName, setInstitutionName] = useState('');
  const [position, setPosition] = useState('');
  const [dept, setDept] = useState(null);
  const auth = firebase_auth;

  const handleSignUp = async () => {
    try {
      if (!email || !password || !username || !position || !dept) {
        throw new Error('All fields are required');
      }

      if (affiliation === 'Institution Faculty' && !institutionName) {
        throw new Error('Institution Name is required for Institution Faculty affiliation');
      }

      const hashedPassword = CryptoJS.SHA256(password).toString();

      const userCredential = await createUserWithEmailAndPassword(auth, email, hashedPassword);

      await setDoc(doc(firebase_db, 'StaffProfile', userCredential.user.uid), {
        username,
        email,
        password: hashedPassword,
        institutionName,
        position,
        dept,
        createdAt: new Date(),
      });

      await logDeviceInfo(userCredential.user.uid);

      await AsyncStorage.setItem('userId', userCredential.user.uid);

      Alert.alert('Sign up successful!');
      navigation.navigate("SelectFav");

    } catch (error) {
      Alert.alert('Sign Up Error', error.message);
      console.error(error.message);
    }
  };

  return (
    <StyledScrollView className='bg-sky-100'>
      <View className='justify-center items-center'>
        <View className='flex-1 w-3/4 justify-center items-center my-10 py-10 bg-slate-100 '>
          <TextInput
            className='w-3/4 mb-6 p-4 border-2 border-black bg-white rounded-xl text-black'
            placeholder="Username" 
            placeholderTextColor={'#000000'}
            onChangeText={setUsername} 
            value={username} 
          />
          <TextInput 
            className='w-3/4 mb-6 p-4 border-2 border-black bg-white rounded-xl text-black'
            placeholder="Email" 
            placeholderTextColor={'#000000'}
            onChangeText={setEmail} 
            value={email} 
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput 
            className='w-3/4 mb-6 p-4 border-2 border-black bg-white rounded-xl text-black'
            placeholder="Password" 
            placeholderTextColor={'#000000'}
            onChangeText={setPassword} 
            value={password} 
            secureTextEntry 
            autoCapitalize="none"
          />
          <View className='w-3/4 mb-6 border-2 border-black bg-white rounded-xl text-black'>
            <Picker
              selectedValue={affiliation}
              onValueChange={(itemValue) => setAffiliation(itemValue)}
            >
              <Picker.Item label="Affiliation" value={null} />
              <Picker.Item label="Independent" value="Independent" />
              <Picker.Item label="Institution Faculty" value="Institution Faculty" />
            </Picker>
          </View>
          
          {affiliation === 'Institution Faculty' && (
            <TextInput
              className='w-3/4 mb-6 p-4 border-2 border-black bg-white rounded-xl text-black'
              placeholder="Institution Name"
              placeholderTextColor={'#000000'}
              onChangeText={setInstitutionName}
              value={institutionName}
            />
          )}
          <View className='w-3/4 mb-6 border-2 border-black bg-white rounded-xl text-black'>
            <Picker
              selectedValue={dept}
              onValueChange={(itemValue) => setDept(itemValue)}
            >
              <Picker.Item label="Specialization" value={null} />
              <Picker.Item label="CSE" value="CSE" />
              <Picker.Item label="MECH" value="MECH" />
              <Picker.Item label="ECE" value="ECE" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
          <Button title="Sign Up" onPress={handleSignUp} />
        </View>
      </View>
    </StyledScrollView>
  );
};

export default StaffSignUp;
