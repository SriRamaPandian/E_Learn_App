import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { styled } from 'nativewind';

const MECH = () => {
    const coursesData = {
        "MECH-HS5151": {
          course_name: "Technical English",
          dept_name: "MECH",
          years: "1",
          sem: "1"
        },
        "MECH-PH5151": {
          course_name: "Engineering Physics",
          dept_name: "MECH",
          years: "1",
          sem: "1"
        },
        "MECH-MA5158": {
          course_name: "Engineering Mathematics I",
          dept_name: "MECH",
          years: "1",
          sem: "1"
        },
        "MECH-CY5151": {
          course_name: "Engineering Chemistry",
          dept_name: "MECH",
          years: "1",
          sem: "1"
        },
        "MECH-GE5151": {
          course_name: "Engineering Graphics",
          dept_name: "MECH",
          years: "1",
          sem: "1"
        },
        "MECH-MA5252": {
          course_name: "Engineering Mathematics II",
          dept_name: "MECH",
          years: "1",
          sem: "2"
        },
        "MECH-ME5251": {
          course_name: "Manufacturing Processes",
          dept_name: "MECH",
          years: "1",
          sem: "2"
        },
        "MECH-GE5152": {
          course_name: "Engineering Mechanics",
          dept_name: "MECH",
          years: "1",
          sem: "2"
        },
        "MECH-GE5153": {
          course_name: "Problem Solving and Python Programming",
          dept_name: "MECH",
          years: "1",
          sem: "2"
        },
        "MECH-EE5251": {
          course_name: "Basics of Electrical and Electronics Engineering",
          dept_name: "MECH",
          years: "1",
          sem: "2"
        },
        "MECH-CE5251": {
          course_name: "Fluid Mechanics and Machinery",
          dept_name: "MECH",
          years: "1",
          sem: "2"
        },
        "MECH-MA5355": {
          course_name: "Transform Techniques and Partial Differential Equations",
          dept_name: "MECH",
          years: "2",
          sem: "3"
        },
        "MECH-ML5352": {
          course_name: "Mechanics of Materials",
          dept_name: "MECH",
          years: "2",
          sem: "3"
        },
        "MECH-ME5301": {
          course_name: "Engineering Thermodynamics",
          dept_name: "MECH",
          years: "2",
          sem: "3"
        },
        "MECH-ME5351": {
          course_name: "Computer Aided Design",
          dept_name: "MECH",
          years: "2",
          sem: "3"
        },
        "MECH-ML5351": {
          course_name: "Engineering Materials and Metallurgy",
          dept_name: "MECH",
          years: "2",
          sem: "3"
        },
        "MECH-ME5451": {
          course_name: "Hydraulics and Pneumatics",
          dept_name: "MECH",
          years: "2",
          sem: "4"
        },
        "MECH-ME5401": {
          course_name: "Theory of Machines",
          dept_name: "MECH",
          years: "2",
          sem: "4"
        },
        "MECH-ME5402": {
          course_name: "Metal Cutting and Machine Tools",
          dept_name: "MECH",
          years: "2",
          sem: "4"
        },
        "MECH-ME5403": {
          course_name: "Applied Thermodynamics",
          dept_name: "MECH",
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
            <StyledText className='text-2xl font-bold text-gray-800 mb-4 text-center'>MECH Courses</StyledText>
            <StyledRow className="flex-row border-b border-black-300 pb-2 mb-2">
                <StyledText className="w-2/3 text-gray-600 font-semibold pl-2">Course Name</StyledText>
                <StyledText className="w-1/3 text-gray-600 font-semibold pl-2 text-right">Course Code</StyledText>
            </StyledRow>
            <FlatList
                data={coursesArray}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                    <StyledRow className="flex-row py-3 border-b border-gray-400">
                        <StyledText className="w-2/3 text-gray-700 pl-4">{item.course_name}</StyledText>
                        <StyledText className="w-1/3 text-gray-700 pr-3 text-right">{item.code}</StyledText>
                    </StyledRow>
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </StyledContainer>
    </LinearGradient>
);
}

export default MECH;