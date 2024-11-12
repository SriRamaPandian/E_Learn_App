import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useState, useCallback } from 'react';
import { RefreshControl, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function RoleSelectionScreen({ navigation }) {

  const [LGcolor, setLGcolor] = useState(['#ffd9b3', '#ACE0F9']);
  const [LGstart, setLGstart] = useState({ x: 0.3, y: 0.3 });
  const [LGend, setLGend] = useState({ x: 0.7, y: 0.7 });
  
  const [refreshKey, setRefreshKey] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshKey(refreshKey + 1);
    setfeedback('');
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
    }, [])
);
  return (
    <LinearGradient
    colors={LGcolor}
    start={LGstart}
    end={LGend}
    className='flex-1'>
    <StyledView className="flex-1 justify-center items-center">
      <StyledText className="text-2xl font-bold mb-8">Sign Up as</StyledText>
      
      <StyledTouchableOpacity
        className="bg-blue-500 py-4 px-10 rounded-lg mb-4 w-4/5 items-center"
        onPress={() => navigation.navigate('SignUp')}
      >
        <StyledText className="text-white text-lg font-bold">Student</StyledText>
      </StyledTouchableOpacity>

      <StyledTouchableOpacity
        className="bg-blue-500 py-4 px-10 rounded-lg mt-4 w-4/5 items-center"
        onPress={() => navigation.navigate('StaffSignUp')}
      >
        <StyledText className="text-white text-lg font-bold">Teacher</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
    </LinearGradient>
  );
}
