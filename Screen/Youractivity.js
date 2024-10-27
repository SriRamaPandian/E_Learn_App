import React, { useState } from 'react';
import { View, Text, ScrollView, RefreshControl, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { Video } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { firebase_db } from '../firebaseConfig';

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
  const [uploaded, setuploaded] = useState([]);

  const [toggle, settoggle] = useState(true);

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

      const uploaded_data = async () =>{
        const id = await AsyncStorage.getItem('userId');
        const usersQuery = query(collection(firebase_db, 'Videos'), where('userid', '==', id));
        const userDocs = await getDocs(usersQuery);
        const datas = userDocs.docs.map(doc => doc.data());
        const temp = [];
        for (const data of datas){
          temp.push(
            <View key={data.docid} className='flex-row items-center justify-center'>
              <Video source={{uri: data.vresult.uri}} className=' w-72 h-40 mx-4 my-2 border-4 rounded-md border-slate-700' useNativeControls={true} isLooping={false} shouldPlay={false}/>
              <View className = 'flex-col'>
                <Text className='text-lg py-3'>Likes: {data.likes}</Text>
                <Text className='text-lg py-3'>Views: {data.views}</Text>
              </View>
            </View>
          )
        }
        setuploaded(temp);
      }
  
      uploaded_data();

      return () => {
       
      };
    }, [toggle])
  );

  const pickVideo = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*', 
      });
      setvideo(result.assets[0].uri);
      console.log(result.assets[0].uri);
      setvresult(result.assets[0]);
    } catch (err) {
      console.warn(err);
    }
  };

  const pickDocument = async () => {
    try{
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/*',
      });
      setdresult(result.assets[0]);
      
      let fileType = result.assets[0].mimeType || result.assets[0].name.split('.').pop();
  
      switch(fileType){
        case 'application/pdf':
          setimage('file-pdf-o');
          break;
        case 'application/vnd.ms-powerpoint':
          setimage('file-powerpoint-o');
          break;
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
          setimage('file-powerpoint-o');
          break;
        case 'application/msword':
          setimage('file-word-o');
          break;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          setimage('file-word-o');
          break;
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          setimage('file-excel-o');
          break;
        default:
          setimage('file-o');
      }
    }
    catch (err) {
      console.warn(err);
    }
  };

  const submit = async () => {
    try{
      if (!vname || !description || !cname){
        throw new Error('All fields required');
      }
      const id = await AsyncStorage.getItem('userId');
      const docRef = doc(firebase_db,'Courses',cname);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        const data = docSnap.data();
        const key = vname + data.course_name;
        const docid = id + key;
        await setDoc(doc(firebase_db, 'Videos', docid),{
          docid,
          key: key.toLowerCase(),
          userid: id,
          description,
          vresult,
          dresult,
          likes:0,
          views:0,
          createdAT: new Date(),
        });
        Alert.alert("!!!Uploaded Successfully!!!");
        settoggle(!toggle);
      }
      else{
        Alert.alert("No such course exist");
      }
    }
    catch (error) {
      Alert.alert('Error', error.message)
      console.error(error.message);
    }
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
         <View className='flex-row items-center mt-[30] p-[10]'>
          <Text className='text-2xl font-bold pr-[120]'>
                Uploaded Videos:
          </Text>
          <AntDesign.Button name="pluscircleo" size={40} color="#000" onPress={() => setispressed(!ispressed)} backgroundColor="transparent"/>
        </View>
        <View className='flex-col mb-[30]'>
          {uploaded}
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
              onPress={() => pickDocument()}>
            <Text>Insert</Text>
            </TouchableOpacity>
            {image?<FontAwesome.Button name={image} size={40} color="#000" onPress={() => console.log(image)} backgroundColor="transparent"/>:''}
          </View>
          <View>
            <Text className='text-xl font-bold pt-[30]'>Insert Video:</Text>
            <TouchableOpacity
              className='p-[10] m-[10] border text-black justify-center items-center bg-white'
              onPress={() => pickVideo()}>
            <Text>Insert</Text>
            </TouchableOpacity>
            {video?<Video source={{uri: video}} className='w-[270] h-[150] border-4 rounded-md border-slate-700' useNativeControls={true} isLooping={false} shouldPlay={false}/>:''}
          </View>
          <View className='justify-center items-center ml-[150] h-[200]'>
            <TouchableOpacity
                className='w-1/2 mb-[80] p-[20] border rounded-full text-black justify-center items-center bg-cyan-400'
                onPress={submit}>
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