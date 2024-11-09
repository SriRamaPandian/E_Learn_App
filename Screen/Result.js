import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, ScrollView, RefreshControl, Alert, TextInput, TouchableOpacity, Platform} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useCallback } from 'react';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { firebase_auth, firebase_db } from '../firebaseConfig';
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Linking from 'expo-linking';

const Result = () => {

  const route = useRoute();
  const { DocId } = route.params || {};

  const [isloading, setisloading] = useState(true);
  const [isliked, setisliked] = useState(false);

  const [vname, setvname] = useState('');
  const [description,  setdescription] = useState('');
  const [vresult, setvresult] = useState('');
  const [dresult, setdresult] = useState('');
  const [image, setimage] = useState('');
  const [views, setviews] = useState(0);
  const [likes, setlikes] = useState(0);
  const [feedback, setfeedback] = useState('');

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

      const getdata = async () => {
        try{
          const docRef = doc(firebase_db, 'Videos', DocId );
          const DocSnap = await getDoc(docRef);

          if (DocSnap.exists()) {
            const datas = DocSnap.data();
            setvname(datas.vname);
            setdescription(datas.description);
            setvresult(datas.vresult);
            setdresult(datas.dresult);
            setviews(datas.views);
            setlikes(datas.likes);
            switch(datas.dresult.mimeType){
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
      setisloading(false);

          }
          catch(e){
            Alert.alert("Error",e.message);
            console.log(e.message);
          }
      }

      getdata();
  
      return () => {
      };
    }, [])
  );

  const openDocument = async (data) => {
    console.log("Firebase Storage URI:", data.uri);
  
    if (!data.uri || !data.mimeType) {
      console.error("Document URI or MIME type is undefined.");
      return;
    }
  
    try {
      const extension = data.mimeType.includes('pdf') ? 'pdf' :
                        data.mimeType.includes('msword') ? 'doc' :
                        data.mimeType.includes('vnd.openxmlformats-officedocument.wordprocessingml.document') ? 'docx' :
                        data.mimeType.includes('vnd.ms-powerpoint') ? 'ppt' :
                        data.mimeType.includes('vnd.openxmlformats-officedocument.presentationml.presentation') ? 'pptx' :
                        data.mimeType.includes('vnd.openxmlformats-officedocument.spreadsheetml.sheet') ? 'xlsx' :
                        'file';
  
      const localUri = `${FileSystem.documentDirectory}downloadedDocument.${extension}`;
    
      const { uri: downloadedUri } = await FileSystem.downloadAsync(data.uri, localUri);
      console.log("File downloaded to local path:", downloadedUri);
    
      if (Platform.OS === 'android') {
        const contentUri = await FileSystem.getContentUriAsync(downloadedUri);
        await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
          data: contentUri,
          flags: 1,
          type: data.mimeType,
        });
      } else if (Platform.OS === 'ios') {
        await Linking.openURL(downloadedUri);
      }
    } catch (error) {
      console.error("Error downloading or opening document:", error);
    }
  };

  if (isloading) {
    return (
      <LinearGradient colors={LGcolor} start={LGstart} end={LGend} className='flex-1'>
        <View className='p-20 justify-center items-center'>
          <Text className='font-semibold text-2xl'>loading...</Text>
        </View>
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
        <View className='flex-1 p-3'>
          <View><Text className='font-extrabold text-2xl'>{vname + ':'}</Text></View>
          <View className='justify-center items-center my-3'>
            <Video 
            source={{ uri: vresult.uri }} 
            className=' w-11/12 h-48 border-4 rounded-md border-slate-700' 
            useNativeControls={true} 
            isLooping={false} 
            shouldPlay={true} />
          </View>
          <View className='flex-row justify-evenly'>
            {isliked ? <TouchableOpacity onPress={() => setisliked(!isliked)} className=' px-3 bg-slate-500/30 rounded-lg justify-center items-center flex-row' activeOpacity={0.3}><Text>{likes} likes </Text><AntDesign name='like1' size={30}/></TouchableOpacity> : <TouchableOpacity onPress={() => setisliked(!isliked)} className=' px-3 bg-slate-500/30 rounded-lg justify-center items-center flex-row' activeOpacity={0.3}><Text>{likes} likes </Text><AntDesign name='like2' size={30}/></TouchableOpacity>}

            <View className=' px-3 bg-slate-500/30 rounded-lg justify-center items-center '><Text>{views} views</Text></View>
            
            <TouchableOpacity className=' px-3 bg-slate-500/30 rounded-lg justify-center flex-row items-center ' activeOpacity={0.3}><Text>Watchlater</Text><MaterialIcons name="watch-later" size={40}  /></TouchableOpacity>
          </View>
          <View className=' bg-slate-400/30 rounded-xl p-3 m-2'><Text className='font-semibold text-xl'>Description:</Text><Text className=' text-base'>{description}</Text></View>
          <View className=' bg-slate-400/30 rounded-xl p-3 m-2'><Text className='font-semibold text-xl'>Attachment:</Text><FontAwesome.Button name={image} size={40} color="#000" onPress={() => openDocument(dresult)} backgroundColor="transparent"/></View>
          <View className=' bg-slate-400/30 rounded-xl p-3 m-2'><Text className='font-semibold text-xl'>Feedback:</Text>
            <TextInput
              placeholder="Enter your feedback here"
              placeholderTextColor={'#000000'}
              onChangeText={setfeedback}
              value={feedback}
              multiline={true}
              numberOfLines={3}
              scrollEnabled={true}
            />
            <TouchableOpacity className='rounded-md bg-slate-400/75 ml-72 p-1'><Text className=' font-medium text-base'>submit</Text></TouchableOpacity>
          </View>
          <View><Text className='font-bold text-xl'>Related videos:</Text><View></View></View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

export default Result;