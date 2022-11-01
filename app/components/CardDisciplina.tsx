import React from "react";
import { View, Text, Image } from "react-native";
import Disciplina from "../models/Disciplina";

export default function App(props: Disciplina) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#D9D9D9",
        padding: 20,
        margin: 20,
        borderRadius: 20,
      }}
    >
      <Text style={{ fontWeight: "500" }}>{props.nome_disc}</Text>
      <Text>{props.carga_hor}</Text>
    </View>
  );
}
