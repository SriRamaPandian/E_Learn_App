<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./Screen/SignIn.js";
import SignUp from "./Screen/SignUp.js";
import Drawer from "./Screen/Drawer.js";
import SelectFav from "./Screen/SelectFav.js";
import CSE from "./Screen/CSE.js";
import ECE from "./Screen/ECE.js";
import MECH from "./Screen/MECH.js";
import { styled } from "nativewind";
import { onAuthStateChanged, User } from "firebase/auth";
import { firebase_auth } from "./firebaseConfig.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
=======
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './Screen/SignIn.js';
import SignUp from './Screen/SignUp.js';
import Drawer from './Screen/Drawer.js';
import SelectFav from './Screen/SelectFav.js';
import Search from './Screen/Search.js';
import Result from './Screen/Result.js';
import CSE from "./Screen/CSE.js";
import ECE from "./Screen/ECE.js";
import MECH from "./Screen/MECH.js";
import { styled } from 'nativewind';
import { onAuthStateChanged, User } from 'firebase/auth';
import { firebase_auth } from './firebaseConfig.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
>>>>>>> 86b0fd8 (going_to_finish)


const Stack = createStackNavigator();
const StyledSafeAreaView = styled(SafeAreaView);

export default function App() {
  const [user, setUser] = useState(User);
  const [isloading, setisloading] = useState(true);

  const setId = async (id) => {
    try {
      await AsyncStorage.setItem("userId", id);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase_auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setId(currentUser.uid);
        setisloading(false);
      } else {
        setisloading(false);
        setUser(null);
        setisloading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isloading) {
    return null;
  }

  return (
    <StyledSafeAreaView className="flex-1">
      <NavigationContainer>
<<<<<<< HEAD
        <Stack.Navigator initialRouteName={user == null ? "SignIn" : "Drawer"}>
=======
        <Stack.Navigator initialRouteName={ user == null ? "SignIn" : "Drawer" }>
>>>>>>> 86b0fd8 (going_to_finish)
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen
            name="Drawer"
            component={Drawer}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SelectFav" component={SelectFav} />
<<<<<<< HEAD
=======
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Result" component={Result} />
>>>>>>> 86b0fd8 (going_to_finish)
          <Stack.Screen name="CSE" component={CSE} />
          <Stack.Screen name="ECE" component={ECE} />
          <Stack.Screen name="MECH" component={MECH} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </StyledSafeAreaView>
  );
}
