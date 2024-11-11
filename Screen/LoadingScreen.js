import { View, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect} from 'react'
import { ProgressBar } from 'react-native-paper'

export default function LoadingScreen() {
    const[progress, setProgress] = useState(0);

    useEffect(()=>{
        const interval = setInterval(()=>{
            setProgress((prev)=>(prev < 1 ? prev + 0.1 : 1));

        },300);
        return () => clearInterval(interval);
        },[]);
  return (
    <View style={{ flex:1, justifyContent:'center',alignItems:'center',padding:20}}>
        <Image
        source={require('../assets/Logo.jpg')}
        style={{width:150,height:150,borderRadius:75,overflow:'hidden'}}
        resizeMode='cover'
        />
      <ActivityIndicator size="large" color="#0000ff" style={{marginTop:20}}/>
      <ProgressBar progress={progress} color="#0000ff"  style={{ width: '80%', marginTop: 20 }} />
    </View>
  );
}