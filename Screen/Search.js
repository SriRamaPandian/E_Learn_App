import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { firebase_db } from '../firebaseConfig';
import { Video } from 'expo-av';
import LoadingScreen from './LoadingScreen';


const Search = ({navigation}) => {

  const route = useRoute();
  const { text } = route.params || {};

  const [LGcolor, setLGcolor] = useState(['#ffd9b3', '#ACE0F9']);
  const [LGstart, setLGstart] = useState({ x: 0.3, y: 0.3 });
  const [LGend, setLGend] = useState({ x: 0.7, y: 0.7 });

  const [result, setresult] = useState([]);
  const [isloading, setisloading] = useState(true);
  
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

      const getdata = async () =>{
        const usersQuery = query(collection(firebase_db, 'Videos'), where('key', 'array-contains', text));
        const userDocs = await getDocs(usersQuery);
        const datas = userDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const temp = [];
        if (datas.length > 0) {
          datas.forEach((data, index) => {
            temp.push(
              <View key={`${data.vname}-${index}`}>
                <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate("Result",{DocId: data.id})}>
                  <Video 
                    source={{ uri: data.vresult.uri }} 
                    className='w-72 h-40 mx-4 my-2 border-4 rounded-md border-slate-700' 
                    useNativeControls={false} 
                    isLooping={false} 
                    shouldPlay={false} 
                  />
                </TouchableOpacity>
                <Text className='text-xl px-7 mb-3'>{data.vname}</Text>
              </View>
            );
          });
          setresult(temp);
        }
        else{
          setresult(<Text className='text-3xl p-10'>!!!No Result Found!!!</Text>);
        }
      }

      getdata();
      setisloading(false);
  
      return () => {

      };
    }, [])
  );

  if (isloading) {
    return (
      <LinearGradient colors={LGcolor} start={LGstart} end={LGend} className='flex-1'>
        <LoadingScreen />
      </LinearGradient>
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
        <View className='flex-1 p-7'>
          <Text className='font-bold text-2xl mb-3'>Search Result:</Text>
          <View className='flex-col'>
            {result}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default Search;