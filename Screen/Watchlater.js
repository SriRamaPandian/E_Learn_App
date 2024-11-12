import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { firebase_db, firebase_storage } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useCallback } from 'react';
import { Video } from 'expo-av';
import LoadingScreen from './LoadingScreen';


const Watchlater = ({navigation}) => {

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

      const getdata = async () => {
        try {
          const id = await AsyncStorage.getItem('userId');
          const docRef = doc(firebase_db, 'WatchLater', id);
          const DocSnap = await getDoc(docRef);
          
          if (DocSnap.exists()) {
            const info = DocSnap.data();
            const DocIds = info.DocIds;
            const temp = await Promise.all(
              DocIds.map(async (docid) => {
                const videoDocRef = doc(firebase_db, 'Videos', docid);
                const videoDocSnap = await getDoc(videoDocRef);
                const data = videoDocSnap.data();
      
                return (
                  <View key={data.vname}>
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => navigation.navigate("Result", { DocId: docid })}
                    >
                      <Video
                        source={{ uri: data.vresult.uri }}
                        className="w-72 h-40 mx-4 my-2 border-4 rounded-md border-slate-700"
                        useNativeControls={false}
                        isLooping={false}
                        shouldPlay={false}
                      />
                    </TouchableOpacity>
                    <Text className="text-xl px-7 mb-3">{data.vname}</Text>
                  </View>
                );
              })
            );
            setresult(temp);
          } else {
            setresult(<Text className="text-3xl p-10">!!!No Result Found!!!</Text>);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setresult(<Text className="text-3xl p-10">Error loading data</Text>);
        } finally {
          setisloading(false);
        }
      };
      
        

      getdata();
  
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
          <Text className='font-bold text-2xl mb-3'>Result:</Text>
          <View className='flex-col'>
            {result}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default Watchlater;