import React from "react";
import { View, Text, Button, Image } from "react-native";

export default function App() {
  const image1 = require("../../../assets/bg/bg-1.jpg");
  const image2 = require("../../../assets/bg/bg-2.jpg");
  const image3 = require("../../../assets/bg/bg-3.jpg");

  const [background, setBackground] = React.useState(image1);
  const [numBackground, setNumBackground] = React.useState(1);

  function changeBackground(numBackground: number) {
    if (numBackground == 1) {
      setBackground(image1);
      return background;
    } else if (numBackground == 2) {
      setBackground(image2);
      return background;
    } else if (numBackground == 3) {
      setBackground(image3);
      return background;
    }
  }

  return (
    <View style={{ flex: 1, alignItems: "center", padding: 5 }}>
      <Text style={{ color: "white" }}>Escolha um Plano de fundo abaixo:</Text>
      <Button title="Background 1" onPress={() => changeBackground(1)}></Button>
      <Button title="Background 2" onPress={() => changeBackground(2)}></Button>
      <Button title="Background 3" onPress={() => changeBackground(3)}></Button>
      <Image
        style={{
          width: "100px",
          height: "100px",
          borderRadius: 50,
          marginBottom: 10,
        }}
        source={{ uri: background }}
      ></Image>
    </View>
  );
}
