import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { firebase_auth, firebase_db } from '../firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import LoadingScreen from './LoadingScreen';
import { collection, query, where, getDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

const SelectCourse = ({ navigation }) => {

  const [tag,settag] = useState([]);
  const [val,setval] = useState([]);
  const [isPressed,setisPressed] = useState([]);
  const [toggle,settoggle] = useState(true);
  const courseNames = [];
  const coursetag = [];
  const [isLoading, setisLoading] = useState(true);

  
  useFocusEffect(
      useCallback(() => {
      const fetchData = async () => {
        try {
          const id = await AsyncStorage.getItem('userId');
          const docRef = doc(firebase_db, 'Profile', id);
          const ProSnap = await getDoc(docRef);

          if (ProSnap.exists()) {
            const userProfile = ProSnap.data();
            const sem = userProfile.sem; 
            const dept = userProfile.dept;  

            const q = query(collection(firebase_db, 'Courses'), where('sem', '==', sem), where('dept_name','==', dept));
            const CouSnap = await getDocs(q);

            setisLoading(false);

            
            if(CouSnap){
              var i = 0;
              CouSnap.docs.forEach((doc, i) => {
                
                const data = doc.data();
                const name = data.course_name;
    
                setisLoading(false);
    
                coursetag.push(
                  <TouchableOpacity
                    className={` w-32 h-32 rounded-full justify-center items-center ${isPressed[i+1] ? 'bg-sky-200' : 'bg-slate-400'} m-6`}
                    key={i}
                    onPress={() => {
                      settoggle(!toggle);
                      isPressed[i] = !isPressed[i];
    
                      if(isPressed[i]){
                        setval(preval => [...preval,name]) 
                      } else {
                        setval(preval => preval.filter(value => value !== name))
                      }
                    }}
                  >
                    <Text className='text-base text-center font-bold'>{name}</Text>
                  </TouchableOpacity>
                );
                i += 1;
              });
              settag(coursetag);
            }
            

          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchData();
      return () => {};
      }, [toggle||isLoading]))

  const submit = async () => {
    try{
      if(val.length >= 3){
        const id = await AsyncStorage.getItem('userId');
        const docRef = doc(firebase_db, 'Profile', id);
        await updateDoc(docRef, {
          favcourse: val
        });
        console.log('Array field added successfully!');
        navigation.navigate("Drawer");
      }
      else{
        Alert.alert("Select atleast 3 Courses");
      }
    }
    catch (error) {
      Alert.alert(error.message);
      console.log(error.message);
    }
  }
 

  if (isLoading) {
    return (
       <LoadingScreen />
    );
  }

  return (
  <ScrollView className=' bg-sky-100'>
    <View className='justify-center items-center'>
      <View className='justify-center items-center p-[20]'>
        <Text className='text-3xl text-center font-bold'>Select the Courses that you need the most</Text>
      </View>
      <View className='justify-center items-center m-4 flex-wrap flex-row mb-[25]'>
        {tag.length ? tag : <Text>not found</Text>}
      </View>
      <View className='justify-center items-center'>
        <Text className='text-center text-2xl'>!!!  Select atleast 3 courses  !!!</Text>
      </View>
      <View className='justify-center items-center'>
      <TouchableOpacity
          className='w-1/2 p-[10] border rounded-xl text-black justify-center items-center bg-cyan-400 m-10'
          onPress={submit}>  
        <Text>Next</Text>
      </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
  );
};

export default SelectCourse;
