import React from "react";
import { View, Text, Button, Image } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const defaultImageBackground = {
    background1: require("../../../assets/bg/bg-1.jpg"),
  };

  const imageBackground2 = {
    background2: require("../../../assets/bg/bg-2.jpg"),
  };

  const imageBackground3 = {
    background3: require("../../../assets/bg/bg-3.jpg"),
  };

  const salvaBackground = async () => {
    try {
      const strBackground = JSON.stringify(defaultImageBackground);
      await AsyncStorage.setItem("@background", strBackground);
    } catch (error) {
      console.log("Houve um erro", error);
    }
  };
  
  const salvaBackground2 = async () => {
    try {
      const strBackground = JSON.stringify(imageBackground2);
      await AsyncStorage.setItem("@background", strBackground);
    } catch (error) {
      console.log("Houve um erro", error);
    }
  };
  const salvaBackground3 = async () => {
    try {
      const strBackground = JSON.stringify(imageBackground3);
      await AsyncStorage.setItem("@background", strBackground);
    } catch (error) {
      console.log("Houve um erro", error);
    }
  };

  const getImageBackground = async (key: string) => {
    try {
      AsyncStorage.getItem(key);
    } catch (erro) {
      console.log("Erro");
    }
  };

  function changeBackground(numBackground: number) {
    if (numBackground == 1) {
      salvaBackground();
      getImageBackground("@background");
    } else if (numBackground == 2) {
      salvaBackground2();
      getImageBackground("@background");
    } else if (numBackground == 3) {
      salvaBackground3();
      getImageBackground("@background");
    }
    document.location.reload();
  }

  return (
    <View style={{ flex: 1, alignItems: "center", padding: 5 }}>
      <Text style={{ color: "white" }}>Escolha um Plano de fundo abaixo:</Text>
      <Button title="Background 1" onPress={() => changeBackground(1)}></Button>
      <Button title="Background 2" onPress={() => changeBackground(2)}></Button>
      <Button title="Background 3" onPress={() => changeBackground(3)}></Button>
    </View>
  );
}
