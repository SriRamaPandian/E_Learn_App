import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl, Modal, TouchableOpacity, Alert } from 'react-native';
import { collection, query, where, getDoc, doc, getDocs } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebase_auth, firebase_db } from '../firebaseConfig';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import LoadingScreen from './LoadingScreen';
import * as Device from 'expo-device';


const Profile = ({ navigation }) => {
  const [first, setfirst] = useState('');
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [dept, setdept] = useState('');
  const [year, setyear] = useState('');
  const [courses, setcourses] = useState([]);
  const [prof, setProf] = useState([]);
  const [model, setmodel] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [LGcolor, setLGcolor] = useState(['#ffd9b3', '#ACE0F9']);
  const [LGstart, setLGstart] = useState({ x: 0.3, y: 0.3 });
  const [LGend, setLGend] = useState({ x: 0.7, y: 0.7 });

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
      return () => {};
    }, [])
  );

  useEffect(() => {
    const getdata = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        const docRef = doc(firebase_db, 'Profile', id);
        const ProSnap = await getDoc(docRef);

        if (ProSnap.exists()) {
          const userProfile = ProSnap.data();
          setname(userProfile.username);
          setemail(userProfile.email);
          setdept(userProfile.dept);
          setyear(userProfile.year);
          setcourses(userProfile.favcourse);
          setfirst(userProfile.username.slice(0, 1));
        }

        
        const currentDeviceId = Device.osInternalBuildId;

        
        const usersQuery = query(collection(firebase_db, 'DeviceUsers'), where('deviceId', '==', currentDeviceId));
        const userDocs = await getDocs(usersQuery);
        const userIds = userDocs.docs.map(doc => doc.data().userId);

        
        const temp = [];
        for (const userId of userIds) {
          if(userId != id){
            const userDocRef = doc(firebase_db, 'Profile', userId);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              const data = userDocSnap.data();
              const infirst = data.username.slice(0, 1);
              const inname = data.username;
              temp.push(
                <View key={userId}>
                  <TouchableOpacity onPress={() => changeUser(userId, data.email,data.password)}>
                    <View className='flex-row justify-start items-center p-3 ml-7 w-5/6 my-3 bg-slate-300'>
                      <View className='w-12 h-12 rounded-full justify-center items-center border'>
                        <Text className='text-2xl font-bold'>{infirst}</Text>
                      </View>
                      <Text className='text-base font-semibold mx-7'>{inname}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }
          }
        }

        setProf(temp);
        setisLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getdata();
  }, [model]); 


  const changeUser = async (id, mail,pass) => {
    try {
      await AsyncStorage.setItem('userId', id);
      await signInWithEmailAndPassword(firebase_auth, mail, pass);
      console.log('Switched user successfully');
      setmodel(false);
      Alert.alert("User changed");
      navigation.replace("Drawer");
    } catch (e) {
      console.error("Authentication error:", e.message);
    }
  };


  if (isLoading) {
    return (
      <LinearGradient colors={LGcolor} start={LGstart} end={LGend} className='flex-1'>
        <LoadingScreen />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={LGcolor} start={LGstart} end={LGend} className='flex-1'>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View className='flex-row items-center'>
          <TouchableOpacity className={'w-[65] h-[65] rounded-full justify-center bg-cyan-200 m-[25] mt-[30] ml-6 items-center'} onPress={() => setmodel(true)}>
            <Text className='text-center text-3xl'>{first}</Text>
          </TouchableOpacity>
          <Text className='text-2xl mt-[10] flex-wrap justify-center items-center'>{name}</Text>
        </View>
        <View>
          <Text className='ml-6 mt-4 text-xl w-4/5 mb-[16] p-[13] border-2 border-black bg-white rounded-3xl text-black text-center'>{email}</Text>
          <Text className='ml-6 text-xl w-4/5 mb-[16] p-[13] border-2 border-black bg-white rounded-3xl text-black text-center'>{dept}</Text>
          <Text className='ml-6 text-xl w-4/5 mb-[16] p-[13] border-2 border-black bg-white rounded-3xl text-black text-center'>{year}nd-Year</Text>
        </View>
        <View>
          <Text className='ml-6 mt-6 text-2xl'>YOUR COURSES :</Text>
          <View className='ml-8 mt-4 flex-col'>
            {courses && courses.map((course, index) => (
              <Text key={index} className='text-lg'>{index + 1}.{course}</Text>
            ))}
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={model}
          onRequestClose={() => setmodel(false)}>
          <View className='justify-center items-center w-full h-full bg-slate-600/70'>
            <View className='w-5/6 m-40 bg-white rounded-xl'>
              <View className='justify-center items-center pt-7'>
                <View className='w-12 h-12 rounded-full justify-center items-center bg-amber-500'>
                  <Text className='justify-center items-center text-3xl font-bold'>{first}</Text>
                </View>
                <Text className='text-xl p-4'>{name}</Text>
              </View>
              <View>{prof}</View>
              <View className='my-7'>
                <View className='flex-row justify-start items-center p-3 ml-7'>
                <AntDesign.Button name="pluscircleo" size={40} color="#000" onPress={() => {setmodel(false);navigation.replace("RoleSelection");}} backgroundColor="transparent"/>
                <Text className='text-lg'>add account</Text>
                </View>
                <View className='items-end mr-12'>
                  <TouchableOpacity className='' onPress={() => {setmodel(false);navigation.replace("SignIn");}}><Text className='text-lg bg-slate-200 p-3'>Logout</Text></TouchableOpacity>   
                </View>
              </View>
            </View>
          </View>
        </Modal>
    </ScrollView>
  </LinearGradient>
  );
};

export default Profile;
