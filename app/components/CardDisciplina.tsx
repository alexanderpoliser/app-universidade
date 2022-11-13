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
      <Text style={{ fontWeight: "500" }}>Disciplina: {props.nome_disc}</Text>
      <Text style={{ fontWeight: "500" }}>
        Código da disciplina: {props.key_value}
      </Text>
      <Text>Carga horária: {props.carga_hor} hora(s)</Text>
    </View>
  );
}
