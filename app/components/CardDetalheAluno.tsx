import React from "react";
import { View, Text, Image, Button } from "react-native";
import Aluno from "../models/Aluno";

export default function App(props: any) {
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
      <View style={{ flex: 1 }}>
        <Image
          style={{
            width: "100px",
            height: "100px",
            borderRadius: 50,
            marginBottom: 10,
          }}
          source={{ uri: props.foto as any }}
        />
      </View>

      <Text style={{ fontWeight: "500" }}>{props.nome}</Text>
      <Text>{props.cidade}</Text>
      <Button
        onPress={() => props.navigation.navigate("Detalhe Historico", {cod_turma:props.key_value})}
        title="Detalhe historico aluno"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
