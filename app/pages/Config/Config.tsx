import React from "react";
import { View, Text, ImageBackground, Button } from "react-native";

export default function App() {
  const image1 = require("../../../assets/bg/bg-1.jpg");
  const image2 = require("../../../assets/bg/bg-2.jpg");
  const image3 = require("../../../assets/bg/bg-3.jpg");

  const [background, setBackground] = React.useState(image1);

  const changeBackground = (numBackground: number) => {
    if (numBackground == 1) {
      setBackground(image1);
    }
    if (numBackground == 2) {
      setBackground(image2);
    }
    if (numBackground == 3) {
      setBackground(image3);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Config is working!</Text>
      <Button title="Background 1" onPress={() => changeBackground(1)}></Button>
      <Button title="Background 2" onPress={() => changeBackground(2)}></Button>
      <Button title="Background 3" onPress={() => changeBackground(3)}></Button>
    </View>
  );
}
