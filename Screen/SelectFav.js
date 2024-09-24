import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { firebase_auth, firebase_db } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, query, where, getDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

const SelectCourse = ({ navigation }) => {
  // Proper state initialization
  const [tag,settag] = useState([]);
  const [val,setval] = useState([]);
  const [isPressed,setisPressed] = useState([]);
  const [toggle,settoggle] = useState(true);
  const courseNames = [];
  const coursetag = [];
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        const docRef = doc(firebase_db, 'Profile', id);
        const ProSnap = await getDoc(docRef);

        if (ProSnap.exists()) {
          const userProfile = ProSnap.data();
          const sem = userProfile.sem;  // Ensure sem is a number
          const dept = userProfile.dept;  // Ensure dept is a string

          const q = query(collection(firebase_db, 'Courses'), where('sem', '==', sem), where('dept_name','==', dept));
          const CouSnap = await getDocs(q);

          setisLoading(false);

          
          if(CouSnap){
            var i = 0;
            CouSnap.docs.forEach((doc, i) => {
              
              const data = doc.data();
              const name = data.course_name;
  
              // Initialize pressed state for each course
              setisLoading(false);
  
              // Create the TouchableOpacity buttons
              coursetag.push(
                <TouchableOpacity
                  className={` w-32 h-32 rounded-full justify-center items-center ${isPressed[i+1] ? 'bg-sky-200' : 'bg-slate-400'} m-6`}
                  key={i}
                  onPress={() => {
                    settoggle(!toggle);
                    isPressed[i] = !isPressed[i];
  
                    if(isPressed[i]){
                      //courseNames.push(name);
                      setval(preval => [...preval,name]) // Add course name
                    } else {
                      //courseNames.splice(courseNames.indexOf(name),1);
                      setval(preval => preval.filter(value => value !== name)) // Remove course name
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
  }, [toggle]);

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
    return (<View><Text>
      wait
    </Text>
    </View>
    );
  }

  return (
    <ScrollView>
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
    </ScrollView>
  );
};

export default SelectCourse;
