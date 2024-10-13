import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Theme = () => {

    const [LGcolor, setLGcolor] = useState(['#ffd9b3', '#ACE0F9']);
    const [LGstart, setLGstart] = useState({ x: 0.3, y: 0.3 });
    const [LGend, setLGend] = useState({ x: 0.7, y: 0.7 });
    const [change, setChange] = useState(false);
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

    useEffect(() => {
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
    }, [change]);

    const changetheme = async (newColor, newStart, newEnd) => {
        try {
            await AsyncStorage.setItem('LGcolor', JSON.stringify(newColor));
            await AsyncStorage.setItem('LGstart', JSON.stringify(newStart));
            await AsyncStorage.setItem('LGend', JSON.stringify(newEnd));
            setChange(!change);
        } catch (error) {
            console.log("Error in changing theme", error);
        }
    };

    return (
    <LinearGradient 
        colors={LGcolor} 
        start={LGstart} 
        end={LGend}  // Smooth radial gradient
        className='flex-1' >
        <ScrollView
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <View className=' flex-wrap flex-row justify-center items-center mt-10'>
                {/* First Gradient */}
                <TouchableOpacity onPress={() => changetheme(['#FFFB7D', '#FFC6FF'], { x: 0.1, y: 0.2 }, { x: 0.9, y: 0.8 })}>
                    <View className='p-7'>
                        <LinearGradient
                            colors={['#FFFB7D', '#FFC6FF']}
                            start={{ x: 0.1, y: 0.2 }}
                            end={{ x: 0.9, y: 0.8 }}
                            className=' w-20 h-20 flex justify-center items-center'>
                            <Text className='text-black font-bold'>Theme 1</Text>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>

                {/* Second Gradient */}
                <TouchableOpacity onPress={() => changetheme(['#FFDEE9', '#B5FFFC'], { x: 0.1, y: 0.2 }, { x: 0.9, y: 0.8 })}>
                    <View className='p-7'>
                        <LinearGradient
                            colors={['#FFDEE9', '#B5FFFC']}
                            start={{ x: 0.1, y: 0.2 }}
                            end={{ x: 0.9, y: 0.8 }}
                            className=' w-20 h-20 flex justify-center items-center'>
                            <Text className='text-black font-bold'>Theme 2</Text>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>

                {/* Third Gradient */}
                <TouchableOpacity onPress={() => changetheme(['#FFF1EB', '#ACE0F9'], { x: 0.2, y: 0.4 }, { x: 0.9, y: 0.6 })}>
                    <View className='p-7'>
                        <LinearGradient
                            colors={['#FFF1EB', '#ACE0F9']}
                            start={{ x: 0.2, y: 0.4 }}
                            end={{ x: 0.9, y: 0.6 }}
                            className=' w-20 h-20 flex justify-center items-center'>
                            <Text className='text-black font-bold'>Theme 3</Text>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>

                {/* Fourth Gradient */}
                <TouchableOpacity onPress={() => changetheme(['#A9F1DF', '#FFBBBB'], { x: 0, y: 0 }, { x: 1, y: 0 })}>
                    <View className='p-7'>
                        <LinearGradient
                            colors={['#A9F1DF', '#FFBBBB']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            className=' w-20 h-20 flex justify-center items-center'>
                            <Text className='text-black font-bold'>Theme 4</Text>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>

                {/* Fifth Gradient */}
                <TouchableOpacity onPress={() => changetheme(['#FBC2EB', '#A6C1EE'], { x: 0.2, y: 0 }, { x: 1, y: 1 })}>
                    <View className='p-7'>
                        <LinearGradient
                            colors={['#FBC2EB', '#A6C1EE']}
                            start={{ x: 0.2, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            className=' w-20 h-20 flex justify-center items-center'>
                            <Text className='text-black font-bold'>Theme 5</Text>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>

                {/* Sixth Gradient */}
                <TouchableOpacity onPress={() => changetheme(['#FFFDE4', '#4dacff'], { x: 0.2, y: 0.2 }, { x: 0.8, y: 0.8 })}>
                    <View className='p-7'>
                        <LinearGradient
                            colors={['#FFFDE4', '#4dacff']}
                            start={{ x: 0.2, y: 0.2 }}
                            end={{ x: 0.8, y: 0.8 }}
                            className=' w-20 h-20 flex justify-center items-center'>
                            <Text className='text-black font-bold'>Theme 6</Text>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>

                {/* Seventh Gradient */}
                <TouchableOpacity onPress={() => changetheme(['#E0C3FC', '#8EC5FC'], { x: 0.5, y: 0 }, { x: 0.5, y: 1 })}>
                    <View className='p-7'>
                        <LinearGradient
                            colors={['#E0C3FC', '#8EC5FC']}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            className=' w-20 h-20 flex justify-center items-center'>
                            <Text className='text-black font-bold'>Theme 7</Text>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>

                {/* Eighth Gradient */}
                <TouchableOpacity onPress={() => changetheme(['#FFDEE9', '#B5FFFC'], { x: 0, y: 0.5 }, { x: 1, y: 0.5 })}>
                    <View className='p-7'>
                        <LinearGradient
                            colors={['#FFDEE9', '#B5FFFC']}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            className=' w-20 h-20 flex justify-center items-center'>
                            <Text className='text-black font-bold'>Theme 8</Text>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>

                {/* Ninth Gradient */}
                <TouchableOpacity onPress={() => changetheme(['#dd99ff','#f2e6ff','#ABDCFF'], { x: 0.1, y: 0.1 }, { x: 0.9, y: 0.9 })}>
                    <View className='p-7'>
                        <LinearGradient
                            colors={['#dd99ff','#f2e6ff','#ABDCFF']}
                            start={{ x: 0.1, y: 0.1 }}
                            end={{ x: 0.9, y: 0.9 }}
                            className=' w-20 h-20 flex justify-center items-center'>
                            <Text className='text-black font-bold'>Theme 9</Text>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>

                {/* Tenth Gradient */}
                <TouchableOpacity onPress={() => changetheme(['#ffd9b3', '#ACE0F9'], { x: 0.3, y: 0.3 }, { x: 0.7, y: 0.7 })}>
                    <View className='p-7'>
                        <LinearGradient
                            colors={['#ffd9b3', '#ACE0F9']}
                            start={{ x: 0.3, y: 0.3 }}
                            end={{ x: 0.7, y: 0.7 }}
                            className=' w-20 h-20 flex justify-center items-center'>
                            <Text className='text-black font-bold'>Theme 10</Text>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </LinearGradient>   
    )
}

export default Theme;