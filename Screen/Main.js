import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl, TextInput, Alert, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { firebase_auth, firebase_db } from '../firebaseConfig';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useCallback } from 'react';
import { Video } from 'expo-av';
import LoadingScreen from './LoadingScreen';

const Main = ({navigation}) => {

  const [search, setsearch] = useState('');
  const [course1, setcourse1] = useState([[]]);
  const [course2, setcourse2] = useState([[]]);
  const [isloading1, setisloading1] = useState(true);
  const [isloading2, setisloading2] = useState(true);

  const [LGcolor, setLGcolor] = useState(['#ffd9b3', '#ACE0F9']);
  const [LGstart, setLGstart] = useState({ x: 0.3, y: 0.3 });
  const [LGend, setLGend] = useState({ x: 0.7, y: 0.7 });
  
  const [refreshKey, setRefreshKey] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshKey(refreshKey + 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  useFocusEffect(
    useCallback(() => {
      const display = async () => {
        const storedColor = await AsyncStorage.getItem('LGcolor');
        const storedStart = await AsyncStorage.getItem('LGstart');
        const storedEnd = await AsyncStorage.getItem('LGend');
  
        setLGcolor(storedColor ? JSON.parse(storedColor) : ['#ffd9b3', '#ACE0F9']);
        setLGstart(storedStart ? JSON.parse(storedStart) : { x: 0.3, y: 0.3 });
        setLGend(storedEnd ? JSON.parse(storedEnd) : { x: 0.7, y: 0.7 });
      };
      
      display();
      getuser();
      setsearch('');

      return () => {
      };
    }, [])
  );


  const getuser = async () => {
    try{
      const id = await AsyncStorage.getItem('userId');
      const docRef = doc(firebase_db, 'Profile', id);
      const ProSnap = await getDoc(docRef);

      if (ProSnap.exists()) {
        const userProfile = ProSnap.data();
        const courses = userProfile.favcourse;
        const sem = userProfile.sem;
        const dept = userProfile.dept;
        if (courses.length > 0) {
          const array1 = [];
          for (const cour of courses) {
            const temp = [];
            const q = query(collection(firebase_db, 'Videos'), where('subject', '==', cour));
            const CouSnap = await getDocs(q);
            const datas = CouSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
            if (datas) {
              for (const data of datas) {
                temp.push(
                  <View key={`${cour}-${data.vname}`}>
                    <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("Result",{DocId: data.id})}>
                      <Video 
                        source={{ uri: data.vresult.uri }} 
                        className='w-72 h-40 mx-4 my-2 border-4 rounded-md border-slate-700' 
                        useNativeControls={false} 
                        isLooping={false} 
                        shouldPlay={false} 
                      />
                    </TouchableOpacity>
                    <Text className='text-xl px-6'>{data.vname}</Text>
                  </View>
                );
              }
            }
      
            array1.push(
              <View key={`course1-${cour}`} className='m-3'>
                {temp.length === 0 ? '' : <Text className='font-bold text-xl'>{cour}:</Text>}
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View className='flex-row'>{temp}</View>
                </ScrollView>
              </View>
            );
          }
          setcourse1(array1);
          setisloading1(false);


          const q = query(collection(firebase_db, 'Courses'), where('sem', '==', sem), where('dept_name', '==', dept), where('course_name', 'not-in', courses));
          const docSnap = await getDocs(q);
          const courseNames = docSnap.docs.map(doc => doc.data().course_name);
          const array2 = [];
    
          if (courseNames) {
            for (const cour of courseNames) {
              const temp = [];
              const q = query(collection(firebase_db, 'Videos'), where('subject', '==', cour));
              const CouSnap = await getDocs(q);
              const datas = CouSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
              if (datas) {
                for (const data of datas) {
                  temp.push(
                    <View key={`${cour}-${data.vname}`}>
                      <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("Result",{DocId: data.id})}>
                        <Video 
                          source={{ uri: data.vresult.uri }} 
                          className='w-72 h-40 mx-4 my-2 border-4 rounded-md border-slate-700' 
                          useNativeControls={false} 
                          isLooping={false} 
                          shouldPlay={false} 
                        />
                      </TouchableOpacity>
                      <Text className='text-xl px-6'>{data.vname}</Text>
                    </View>
                  );
                }
              }
    
              array2.push(
                <View key={`course2-${cour}`} className='m-3'>
                  {temp.length === 0 ? '' : <Text className='font-bold text-xl'>{cour}:</Text>}
                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View className='flex-row'>{temp}</View>
                  </ScrollView>
                </View>
              );
            }
          }
          setcourse2(array2);
          setisloading2(false);
        }
      }
    }
    catch(e){
      Alert.alert("Error",e.message);
      console.log(e.message);
    }
  }

  if (isloading1 || isloading2) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <LinearGradient 
      colors={LGcolor} 
      start={LGstart} 
      end={LGend}
      className='flex-1' >
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View className='justify-evenly items-center mt-[30]'>
          <View className='flex-row justify-evenly items-center mt-[10] content-center bg-white border-2 border-black rounded-full px-5'>
            <FontAwesome name="search" size={23} color="#000" />
            <TextInput
                className='w-10/12 p-[13] text-black '
                placeholder="Enter subject or video name..."
                placeholderTextColor={'#000000'}
                onChangeText={text => setsearch(text)}
                onSubmitEditing={() => navigation.navigate("Search",{
                  text:search.toLowerCase().trim()})}
                value={search.toLowerCase().trim()}
              />
          </View>
        </View>
        <Text className='font-bold text-3xl pl-3 pt-7'>Your courses:</Text>
        <View className='flex-col'>
          {course1}
        </View>
        <Text className='font-bold text-3xl pl-3 pt-7'>Other courses:</Text>
        <View className='flex-col'>
          {course2}
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default Main;