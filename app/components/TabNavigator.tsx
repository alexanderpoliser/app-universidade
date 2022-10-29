import React, { useEffect } from "react";

import { ImageBackground, useWindowDimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { BsFillGearFill } from "react-icons/bs";

import Home from "../pages/Home/Home";
import Config from "../pages/Config/Config";
import Menu from "../pages/Menu/Menu";
import { defaultTheme } from "../../defaultTheme";
import background from "../../assets/bg/bg-1.jpg";

const Tab = createBottomTabNavigator();

function Tabs(props: any) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <AiFillHome />,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarLabel: "Menu",
          tabBarIcon: () => <AiOutlineMenu />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Config"
        component={Config}
        options={{
          tabBarLabel: "Config",
          tabBarIcon: () => <BsFillGearFill />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const { width, height } = useWindowDimensions();

  return (
    <ImageBackground
      source={{
        uri: background,
      }}
      style={{ flex: 1, width, height }}
    >
      <NavigationContainer independent={true} theme={defaultTheme}>
        <Tabs />
      </NavigationContainer>
    </ImageBackground>
  );
}
