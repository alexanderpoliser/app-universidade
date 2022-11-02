import React from "react";
import { View, Text } from "react-native";
import Historico from "../models/Historico";

import { doc, getDoc } from "firebase/firestore";
import db from "../../services/firebase/firebase";

export default function App(props: Historico) {
  const [nomeAluno, setNomeAluno] = React.useState("");

  async function getNomeAluno() {
    const docRef = doc(db, "Aluno", `${props.matricula}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const nomeAluno = docSnap.data()["nome"];
      console.log(nomeAluno);
      setNomeAluno(nomeAluno);
    } else {
      console.log("No such document!");
    }
  }

  React.useEffect(() => {
    getNomeAluno();
  });

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
      <Text style={{ fontWeight: "500" }}>
        Código da Turma: {props.cod_turma}
      </Text>
      <Text>{nomeAluno}</Text>
      <Text>Nota: {props.nota}</Text>
      <Text>Frequência: {props.frequencia}</Text>
    </View>
  );
}
