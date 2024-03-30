import React, { useEffect } from "react";
import { View, Text, Pressable, Touchable } from "react-native";
import tw from "twrnc";
import { Root, Popup } from "popup-ui";

import { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CommunityScreen from "./CommunityScreen";
import FinancialScreen from "./FinancialScreen";
import EdScreen from "./EdScreen";
import Profile from "./Profile";
import { TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

const Homestack = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { color: "black", fontSize: 12 },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Feather name="home" size={24} color="#f0c44d" />
            ) : (
              <Feather name="home" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="Finance"
        component={FinancialScreen}
        options={{
          tabBarLabel: "Finance",
          tabBarLabelStyle: { color: "black", fontSize: 12 },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon name="bank" size={24} color="#f0c44d" />
            ) : (
              <Icon name="bank" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarLabel: "Community",
          tabBarLabelStyle: { color: "black", fontSize: 12 },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Feather name="users" size={24} color="#f0c44d" />
            ) : (
              <Feather name="users" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="Education"
        component={EdScreen}
        options={{
          tabBarLabel: "Education",
          tabBarLabelStyle: { color: "black", fontSize: 12 },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Feather name="book-open" size={24} color="#f0c44d" />
            ) : (
              <Feather name="book-open" size={24} color="black" />
            ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: { color: "black", fontSize: 12 },
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Feather name="user" size={24} color="#f0c44d" />
            ) : (
              <Feather name="user" size={24} color="black" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();

  const API_KEY = "0646d7009e6558aff0c65be26678c8fb";

  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [humidity, setHumidity] = useState("");
  const [feelslike, setFeelslike] = useState("");
  const [temp, setTemp] = useState("");
  const [windspeed, setWindspeed] = useState("");
  const [desc, setDesc] = useState("");
  const [icon,setIcon] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=Maharashtra&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    handleresponse();
  }, []);
  const handleresponse = async () => {
    const response = await axios.get(url);
    console.log(response.data);
    setData(response.data);
    setHumidity(response.data.main.humidity);
    setFeelslike(response.data.main.feels_like.toFixed());
    setTemp(response.data.main.temp);
    setWindspeed(response.data.wind.speed);
    setDesc(response.data.weather[0].description);
    setIcon(response.data.weather[0].icon);
    console.log(icon)
  };
  return (
    <View style={tw`mt-10 ml-3`}>
      <Text style={tw`font-bold text-xl`}>HomeScreen</Text>
      <View style={tw`bg-gray-200 w-93 mt-3 rounded-lg  h-40`}>
        <View style={tw`flex flex-row`}>
          <View style={tw`m-2 ml-5`}>
            <Text style={tw`text-base`}>{data.name}</Text>
            <Text style={tw`text-black text-xs mt-1`}>{desc}</Text>
          </View>
          <View>
            <Image source={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
          </View>
        </View>
        <View style={tw`m-2 flex-row items-center justify-around`}>
          <Text style={tw`text-3xl mt-3`}>{temp}°C</Text>
          <View>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-xs`}>Feels like</Text>
              <Text style={tw`font-black ml-5`}>{feelslike}°C</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-xs`}>Humidity</Text>
              <Text style={tw`font-black ml-5`}>{humidity}%</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-xs`}>Wind speed</Text>
              <Text style={tw`font-black ml-2`}>{windspeed} KPH</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Homestack;