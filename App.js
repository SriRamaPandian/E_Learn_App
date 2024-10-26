import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './Screen/SignIn.js';
import SignUp from './Screen/SignUp.js';
import Drawer from './Screen/Drawer.js';
import SelectFav from './Screen/SelectFav.js';
import { styled } from 'nativewind';
import { onAuthStateChanged, User } from 'firebase/auth';
import { firebase_auth } from './firebaseConfig.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const StyledSafeAreaView = styled(SafeAreaView);

export default function App() {
  const [user, setUser] = useState(User);

  const setId = async (id) => {
    try {
      await AsyncStorage.setItem('userId', id);
    } catch (e) {
      console.error(e);
    }
  };
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase_auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setId(currentUser.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if(user == undefined){
    return(null)
  }

  return (
    <StyledSafeAreaView className="flex-1">
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ user ? "Drawer" : "SignIn" }>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Drawer" component={Drawer} options={{ headerShown: false }} />
          <Stack.Screen name="SelectFav" component={SelectFav} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </StyledSafeAreaView>
  );
}
