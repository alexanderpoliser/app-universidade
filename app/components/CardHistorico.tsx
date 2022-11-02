import React from "react";
import { View, Text } from "react-native";
import Historico from "../models/Historico";

export default function App(props: Historico) {
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
      <Text style={{ fontWeight: "500" }}>Código Turma{props.cod_turma}</Text>
      <Text>{props.matricula}</Text>
    </View>
  );
}
