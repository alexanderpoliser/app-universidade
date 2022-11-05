import React from "react";
import { View, Text } from "react-native";
import Professor from "../models/Professor";

export default function App(props: Professor) {
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
      <Text style={{ fontWeight: "500" }}>{props.nome}</Text>
      <Text style={{ fontWeight: "500" }}>
        Código do professor: {props.key_value}
      </Text>
      <Text>Cidade: {props.cidade}</Text>
    </View>
  );
}
