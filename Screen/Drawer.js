import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, TextInput, Button, Text, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import Main from './Main';
import Profile from './Profile';
import Watchlater from './Watchlater';
import Youractivity from './Youractivity';

export const MyContext = React.createContext();
const Draw = createDrawerNavigator();

const Drawer = () => {

  return (
    <SafeAreaView className='flex-1'>
    <MyContext.Provider>
        <Draw.Navigator 
        initialRouteName="Main"
        screenOptions={
        {headerTitleStyle: {fontWeight: 'bold',fontSize: 30},headerStyle:{backgroundColor:'#4682b4'}}}>
        <Draw.Screen
        name="Main"
        component={Main}
        options={{ drawerLabel: 'Main',title: 'E_Learn' }}
        />
        <Draw.Screen
        name="Profile"
        component={Profile}
        options={{ drawerLabel: 'Profile' }}
        />
        </Draw.Navigator>
    </MyContext.Provider>
</SafeAreaView>
  );
};

export default Drawer;
