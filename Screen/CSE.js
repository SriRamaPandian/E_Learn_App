import React, { useState, useCallback } from 'react';
import { View, Text, RefreshControl, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styled } from 'nativewind';

const CSE = () => {
    const coursesData = {
        "CSE-HS6151": { course_name: "Technical English I", dept_name: "CSE", years: "1", sem: "1" },
        "CSE-PH6151": { course_name: "Engineering Physics", dept_name: "CSE", years: "1", sem: "1" },
        "CSE-MA6151": { course_name: "Mathematics I", dept_name: "CSE", years: "1", sem: "1" },
        "CSE-CS6101": { course_name: "Programming with C", dept_name: "CSE", years: "1", sem: "1" },
        "CSE-CS6102": { course_name: "Computational Thinking", dept_name: "CSE", years: "1", sem: "1" },
        "CSE-HS6251": { course_name: "Technical English II", dept_name: "CSE", years: "1", sem: "2" },
        "CSE-CY6251": { course_name: "Engineering Chemistry", dept_name: "CSE", years: "1", sem: "2" },
        "CSE-MA6251": { course_name: "Discrete Mathematics", dept_name: "CSE", years: "1", sem: "2" },
        "CSE-GE6251": { course_name: "Engineering Graphics", dept_name: "CSE", years: "1", sem: "2" },
        "CSE-CS6103": { course_name: "Application Development Practices", dept_name: "CSE", years: "1", sem: "2" },
        "CSE-CS6104": { course_name: "Data Structures and Algorithms", dept_name: "CSE", years: "2", sem: "3" },
        "CSE-CS6105": { course_name: "Digital Fundamentals and Computer Organization", dept_name: "CSE", years: "2", sem: "3" },
        "CSE-MA6351": { course_name: "Probability and Statistics", dept_name: "CSE", years: "2", sem: "3" },
        "CSE-EE6351": { course_name: "Basics of Electrical and Electronics Engineering", dept_name: "CSE", years: "2", sem: "3" },
        "CSE-CS6106": { course_name: "Database Management Systems", dept_name: "CSE", years: "2", sem: "4" },
        "CSE-CS6107": { course_name: "Computer Architecture", dept_name: "CSE", years: "2", sem: "4" },
        "CSE-CS6108": { course_name: "Operating Systems", dept_name: "CSE", years: "2", sem: "4" },
        "CSE-CS6202": { course_name: "Theory of Computation", dept_name: "CSE", years: "2", sem: "4" },
        "CSE-MA6201": { course_name: "Linear Algebra", dept_name: "CSE", years: "2", sem: "4" }
    };

    const coursesArray = Object.entries(coursesData).map(([code, details]) => ({
        course_name: details.course_name,
        code,
    }));

    const StyledContainer = styled(View);
    const StyledText = styled(Text);
    const StyledRow = styled(View);

    const [LGcolor, setLGcolor] = useState(['#ffd9b3', '#ACE0F9']);
    const [LGstart, setLGstart] = useState({ x: 0.3, y: 0.3 });
    const [LGend, setLGend] = useState({ x: 0.7, y: 0.7 });
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
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
            <StyledContainer className='flex-1 p-4'>
                <StyledText className='text-2xl font-bold text-gray-800 mb-4 text-center'>CSE Courses</StyledText>
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
                            <StyledText className="w-1/3 text-gray-700 pr-4 text-right">{item.code}</StyledText>
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

export default CSE;
