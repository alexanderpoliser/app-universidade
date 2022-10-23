import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { BsFillGearFill } from "react-icons/bs";

import Home from "../pages/Home/Home";
import Config from "../pages/Config/Config";
import Menu from "../pages/Menu/Menu";

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
          headerShown: false
        }}
        
      />
            <Tab.Screen
        name="Config"
        component={Config}
        options={{
          tabBarLabel: "Config",
          tabBarIcon: () => <BsFillGearFill />,
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Tabs />
    </NavigationContainer>
  );
}
