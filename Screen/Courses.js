import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from "react-native-gesture-handler";
<<<<<<< HEAD
import CSE from "./CSE";
=======
>>>>>>> 86b0fd8 (going_to_finish)
const Courses = () => {
  const navigation = useNavigation();

  const [LGcolor, setLGcolor] = useState(["#ffd9b3", "#ACE0F9"]);
  const [LGstart, setLGstart] = useState({ x: 0.3, y: 0.3 });
  const [LGend, setLGend] = useState({ x: 0.7, y: 0.7 });

  const [refreshKey, setRefreshKey] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshKey(refreshKey + 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  useFocusEffect(
    useCallback(() => {
      const display = async () => {
        const storedColor = await AsyncStorage.getItem("LGcolor");
        const storedStart = await AsyncStorage.getItem("LGstart");
        const storedEnd = await AsyncStorage.getItem("LGend");

        setLGcolor(
          storedColor ? JSON.parse(storedColor) : ["#ffd9b3", "#ACE0F9"]
        );
        setLGstart(storedStart ? JSON.parse(storedStart) : { x: 0.3, y: 0.3 });
        setLGend(storedEnd ? JSON.parse(storedEnd) : { x: 0.7, y: 0.7 });
      };

      display();

      return () => {};
    }, [])
  );

  return (
    <LinearGradient
      colors={LGcolor}
      start={LGstart}
      end={LGend}
      className="flex-1"
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="p-4">
<<<<<<< HEAD
          <Text className="text-lg font-bold">Select Department</Text>
=======
          <Text className="text-2xl font-semibold">Select Department</Text>
>>>>>>> 86b0fd8 (going_to_finish)
          <TouchableOpacity
            onPress={() => navigation.navigate("CSE")}
            className="mt-4 p-4 bg-blue-200 rounded"
          >
<<<<<<< HEAD
            <Text className="text-center">CSE</Text>
=======
            <Text className="text-center text-xl font-medium">CSE</Text>
>>>>>>> 86b0fd8 (going_to_finish)
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ECE")}
            className="mt-4 p-4 bg-blue-200 rounded"
          >
<<<<<<< HEAD
            <Text className="text-center">ECE</Text>
=======
            <Text className="text-center text-xl font-medium">ECE</Text>
>>>>>>> 86b0fd8 (going_to_finish)
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("MECH")}
            className="mt-4 p-4 bg-blue-200 rounded"
          >
<<<<<<< HEAD
            <Text className="text-center">MECH</Text>
=======
            <Text className="text-center text-xl font-medium">MECH</Text>
>>>>>>> 86b0fd8 (going_to_finish)
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

<<<<<<< HEAD
export default Courses;
=======
export default Courses;
>>>>>>> 86b0fd8 (going_to_finish)
