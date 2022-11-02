import React, { useEffect } from "react";

import { ImageBackground, useWindowDimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { BsFillGearFill } from "react-icons/bs";

import Home from "../pages/Home/Home";
import Config from "../pages/Config/Config";
import Menu from "../pages/Menu/Menu";
import { defaultTheme } from "../../defaultTheme";

const Tab = createBottomTabNavigator();

function Tabs() {
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
  const [background, setBackground] = React.useState<String>("");

  const getImageBackground: (value: string) => void = async (key: string) => {
    try {
      const imageBackground = AsyncStorage.getItem(key);
      imageBackground.then((background) => {
        const backgroundObject = JSON.parse(background!);
        const getBackgroundObjectValue: String[] =
          Object.values(backgroundObject);
        setBackground(getBackgroundObjectValue[0]);
      });
    } catch (erro) {
      console.log("Erro");
    }
  };
  React.useEffect(() => {
    getImageBackground("@background");
  }, []);

  const { width, height } = useWindowDimensions();

  return (
    <ImageBackground
      source={{
        uri: background as any,
      }}
      style={{ flex: 1, width, height }}
    >
      <NavigationContainer independent={true} theme={defaultTheme}>
        <Tabs />
      </NavigationContainer>
    </ImageBackground>
  );
}
