import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl, Image, TextInput, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { Video } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import pdf from '../assets/pdf-icon.png';
import ppt from '../assets/ppt-icon.png';
import doc from '../assets/doc-icon.png';
import unknown from '../assets/unknown-icon.png';

const Youractivity = () => {

  const [LGcolor, setLGcolor] = useState(['#ffd9b3', '#ACE0F9']);
  const [LGstart, setLGstart] = useState({ x: 0.3, y: 0.3 });
  const [LGend, setLGend] = useState({ x: 0.7, y: 0.7 });

  const [vname, setvname] = useState('');
  const [description, setdescription] = useState('');
  const [image, setimage] = useState('');
  const [video, setvideo] = useState('');
  const [cname, setcname] = useState('');
  const [vresult, setvresult] = useState();
  const [dresult, setdresult] = useState();


  const [ispressed, setispressed] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshKey(refreshKey + 1);
    setimage('');
    setvideo('');
    setcname('');
    setvname('');
    setdescription('');
    
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
        setispressed(false);
      };
      
      display();
  
      
      return () => {
       
      };
    }, [])
  );

  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*', 
        copyToCacheDirectory: false,
      });
  
      if (result.type === 'success') {
        setvresult(result);
        console.log('File URI:', result.uri);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/*',
    });
  
    if (result.type === 'success') {
      setdresult(result)
      const { name, uri, mimeType } = result;
      
      let fileType = mimeType || name.split('.').pop();
      console.log('File Type:', fileType);
      
      displayDocumentIcon(fileType);
    }
  };

  const displayDocumentIcon = (fileType) => {
    const iconMap = {
      'application/pdf': pdf,
      'application/vnd.ms-powerpoint': ppt,
      'application/msword': doc,
      
    };
  
    return iconMap[fileType] || unknown; 
  };
  

  return (
    <LinearGradient 
      colors={LGcolor} 
      start={LGstart} 
      end={LGend}
      className='flex-1' >
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
         <View className='flex-row items-center mt-[30] p-[10]'>
          <Text className='text-2xl font-bold pr-[120]'>
                Uploaded Videos:
          </Text>
          <AntDesign.Button name="pluscircleo" size={40} color="#000" onPress={() => setispressed(!ispressed)} backgroundColor="transparent"/>
        </View>
        <View className='flex-col mb-[30]'>
          <Text>Uploaded</Text>
        </View>
        {ispressed?
        <View className='items-start mt-[60] p-[10]'>
          <Text className='text-2xl font-bold'>Upload New Videos:</Text>
          <View>
            <Text className='text-xl font-bold pt-[30]'>Enter video name:</Text>
            <TextInput
              className='w-full my-[10] pr-[100] border-b-2 border-black text-black'
              placeholder=""
              placeholderTextColor={'#000000'}
              onChangeText={text => setvname(text)}
              value={vname}
            />
          </View>
          <View>
            <Text className='text-xl font-bold pt-[30]'>Enter description:</Text>
            <TextInput
              className='w-full my-[10] pr-[100] border-b-2 border-black text-black'
              placeholder=""
              placeholderTextColor={'#000000'}
              onChangeText={text => setdescription(text)}
              value={description}
            />
          </View>
          <View>
            <Text className='text-xl font-bold pt-[30]'>Enter Course-id:</Text>
            <Text className='text-xs pt-[10]'>LIKE:"CSE-HS6151,ECE-HS5151,MECH-HS5151"</Text>
            <TextInput
              className='w-full my-[10] pr-[100] border-b-2 border-black text-black'
              placeholder=""
              placeholderTextColor={'#000000'}
              onChangeText={text => setcname(text)}
              value={cname}
            />
          </View>
          <View>
            <Text className='text-xl font-bold pt-[30]'>Insert attachment:</Text>
            <TouchableOpacity
              className='p-[10] m-[10] border text-black justify-center items-center bg-white'
              onPress={() => pickVideo()}>
            <Text>Insert</Text>
            </TouchableOpacity>
            {image?<Image source={{uri: image}} className='w-[200] h-[200] rounded-md'/>:''}
          </View>
          <View>
            <Text className='text-xl font-bold pt-[30]'>Insert Video:</Text>
            <TouchableOpacity
              className='p-[10] m-[10] border text-black justify-center items-center bg-white'
              onPress={() => pickDocument()}>
            <Text>Insert</Text>
            </TouchableOpacity>
            {video?<Video source={{uri: video}} className='w-[270] h-[150] border-4 rounded-md' useNativeControls={true} isLooping={false} shouldPlay={false}/>:''}
          </View>
          <View className='justify-center items-center ml-[150] h-[200]'>
            <TouchableOpacity
                className='w-1/2 mb-[80] p-[20] border rounded-full text-black justify-center items-center bg-cyan-400'
                onPress={() => console.log("pressed")}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        :''}
      </ScrollView>
    </LinearGradient>
  )
}

export default Youractivity;