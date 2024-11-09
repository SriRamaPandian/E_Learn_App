import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { styled } from 'nativewind';

const ECE = () => {
  const coursesData = {
    "ECE-HS5151": {
      course_name: "Technical English",
      dept_name: "ECE",
      years: "1",
      sem: "1"
    },
    "ECE-PH5151": {
      course_name: "Engineering Physics",
      dept_name: "ECE",
      years: "1",
      sem: "1"
    },
    "ECE-MA5158": {
      course_name: "Engineering Mathematics I",
      dept_name: "ECE",
      years: "1",
      sem: "1"
    },
    "ECE-CY5151": {
      course_name: "Engineering Chemistry",
      dept_name: "ECE",
      years: "1",
      sem: "1"
    },
    "ECE-GE5153": {
      course_name: "Problem Solving and Python Programming",
      dept_name: "ECE",
      years: "1",
      sem: "1"
    },
    "ECE-MA5252": {
      course_name: "Engineering Mathematics II",
      dept_name: "ECE",
      years: "1",
      sem: "2"
    },
    "ECE-EE5201": {
      course_name: "Basics of Electrical and Measurement Engineering",
      dept_name: "ECE",
      years: "1",
      sem: "2"
    },
    "ECE-GE5152": {
      course_name: "Engineering Mechanics",
      dept_name: "ECE",
      years: "1",
      sem: "2"
    },
    "ECE-EC5251": {
      course_name: "Circuit Theory",
      dept_name: "ECE",
      years: "1",
      sem: "2"
    },
    "ECE-PH5202": {
      course_name: "Semiconductor Physics and Devices",
      dept_name: "ECE",
      years: "1",
      sem: "2"
    },
    "ECE-MA5356": {
      course_name: "Linear Algebra and Numerical Methods",
      dept_name: "ECE",
      years: "2",
      sem: "3"
    },
    "ECE-EC5301": {
      course_name: "Electronic Circuits I",
      dept_name: "ECE",
      years: "2",
      sem: "3"
    },
    "ECE-EC5302": {
      course_name: "Electromagnetic Fields and Waves",
      dept_name: "ECE",
      years: "2",
      sem: "3"
    },
    "ECE-EC5303": {
      course_name: "Digital System Design",
      dept_name: "ECE",
      years: "2",
      sem: "3"
    },
    "ECE-EC5304": {
      course_name: "Signals and Systems",
      dept_name: "ECE",
      years: "2",
      sem: "3"
    },
    "ECE-EC5401": {
      course_name: "Transmission Lines and Wave Guides",
      dept_name: "ECE",
      years: "2",
      sem: "4"
    },
    "ECE-EC5402": {
      course_name: "Communication Theory",
      dept_name: "ECE",
      years: "2",
      sem: "4"
    },
    "ECE-EC5403": {
      course_name: "Electronics Circuits II",
      dept_name: "ECE",
      years: "2",
      sem: "4"
    },
    "ECE-EC5404": {
      course_name: "Digital Signal Processing",
      dept_name: "ECE",
      years: "2",
      sem: "4"
    },
    "ECE-EC5405": {
      course_name: "Linear Integrated Circuits",
      dept_name: "ECE",
      years: "2",
      sem: "4"
    }
  };
  

      const coursesArray = Object.entries(coursesData).map(([code,details])=>({

        course_name:details.course_name,
        code
      }));

      const StyledContainer = styled(View);
      const StyledText = styled(Text);
      const StyledRow = styled(View);

  const [LGcolor, setLGcolor] = useState(['#ffd9b3', '#ACE0F9']);
  const [LGstart, setLGstart] = useState({ x: 0.3, y: 0.3 });
  const [LGend, setLGend] = useState({ x: 0.7, y: 0.7 });
  
<<<<<<< HEAD
  const [refreshKey, setRefreshKey] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshKey(refreshKey + 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };
=======
>>>>>>> 86b0fd8 (going_to_finish)

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
  
      return () => {
      };
    }, [])
  );

  return (
    <LinearGradient
        colors={LGcolor}
        start={LGstart}
        end={LGend}
        className='flex-1'>
        <StyledContainer className='flex-1 p-4'>
            <StyledText className='text-2xl font-bold text-gray-800 mb-4 text-center'>ECE Courses</StyledText>
            <StyledRow className="flex-row border-b border-black-300 pb-2 mb-2">
<<<<<<< HEAD
                <StyledText className="w-2/3 text-gray-600 font-semibold pl-2">Course Name</StyledText>
                <StyledText className="w-1/3 text-gray-600 font-semibold pl-2 text-right">Course Code</StyledText>
=======
                <StyledText className="w-2/3 text-gray-600 font-semibold pl-2 text-lg">Course Name</StyledText>
                <StyledText className="w-1/3 text-gray-600 font-semibold pl-2 text-right text-lg">Course Code</StyledText>
>>>>>>> 86b0fd8 (going_to_finish)
            </StyledRow>
            <FlatList
                data={coursesArray}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                    <StyledRow className="flex-row py-3 border-b border-gray-400">
<<<<<<< HEAD
                        <StyledText className="w-2/3 text-gray-700 pl-4">{item.course_name}</StyledText>
                        <StyledText className="w-1/3 text-gray-700 pr-4 text-right">{item.code}</StyledText>
                    </StyledRow>
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
=======
                        <StyledText className="w-2/3 text-gray-700 pl-4 text-base">{item.course_name}</StyledText>
                        <StyledText className="w-1/3 text-gray-700 pr-4 text-right text-base">{item.code}</StyledText>
                    </StyledRow>
                )}
                showsVerticalScrollIndicator={false}
>>>>>>> 86b0fd8 (going_to_finish)
            />
        </StyledContainer>
    </LinearGradient>
);
}

export default ECE;