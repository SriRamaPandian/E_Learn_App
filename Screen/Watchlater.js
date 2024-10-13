import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';

const Watchlater = () => {

  const [LGcolor, setLGcolor] = useState(['#ffd9b3', '#ACE0F9']);
  const [LGstart, setLGstart] = useState({ x: 0.3, y: 0.3 });
  const [LGend, setLGend] = useState({ x: 0.7, y: 0.7 });
  
  const [refreshKey, setRefreshKey] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshKey(refreshKey + 1);
    // Perform your data fetching or other refreshing tasks here
    setTimeout(() => {
      setRefreshing(false);
    }, 3000); // Simulate a network request
  };

  useFocusEffect(
    useCallback(() => {
      const display = async () => {
        const storedColor = await AsyncStorage.getItem('LGcolor');
        const storedStart = await AsyncStorage.getItem('LGstart');
        const storedEnd = await AsyncStorage.getItem('LGend');
  
        // Parse data if needed
        setLGcolor(storedColor ? JSON.parse(storedColor) : ['#ffd9b3', '#ACE0F9']);
        setLGstart(storedStart ? JSON.parse(storedStart) : { x: 0.3, y: 0.3 });
        setLGend(storedEnd ? JSON.parse(storedEnd) : { x: 0.7, y: 0.7 });
      };
      
      display();
  
      // Optionally, return a cleanup function if needed
      return () => {
        // Clean up here if necessary
      };
    }, [])
  );

  return (
    <LinearGradient 
      colors={LGcolor} 
      start={LGstart} 
      end={LGend}
      className='flex-1' >
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View><Text>Watchlater</Text></View>
      </ScrollView>
    </LinearGradient>
  )
}

export default Watchlater;