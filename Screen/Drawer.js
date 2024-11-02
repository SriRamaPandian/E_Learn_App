import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native';
import Main from './Main';
import Profile from './Profile';
import Watchlater from './Watchlater';
import Youractivity from './Youractivity';
import Theme from './Theme';
import Courses from './Courses';

const Draw = createDrawerNavigator();

const Drawer = () => {

  return (
    <SafeAreaView className='flex-1'>
      <Draw.Navigator 
      initialRouteName="Main"
      >
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
      <Draw.Screen
      name="Your Activity"
      component={Youractivity}
      options={{ drawerLabel: 'Your Activity' }}
      />
      <Draw.Screen
      name="Watch Later"
      component={Watchlater}
      options={{ drawerLabel: 'Watch Later' }}
      />
      <Draw.Screen
      name="Theme"
      component={Theme}
      options={{ drawerLabel: 'Theme' }}
      />
      <Draw.Screen
      name="Courses"
      component={Courses}
      options={{ drawerLabel: 'Courses' }}
      />
      </Draw.Navigator>
    </SafeAreaView>
  );
};

export default Drawer;
