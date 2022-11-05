import React from "react";
import { View, Text, Button } from "react-native";
import Historico from "../models/Historico";

import { deleteDoc, doc, getDoc } from "firebase/firestore";
import db from "../../services/firebase/firebase";

export default function App(props: Historico) {
  const [nomeAluno, setNomeAluno] = React.useState("");

  async function getNomeAluno() {
    const docRef = doc(db, "Aluno", `${props.matricula}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const nomeAluno = docSnap.data()["nome"];
      setNomeAluno(nomeAluno);
    } else {
      console.log("No such document!");
    }
  }

  React.useEffect(() => {
    getNomeAluno();
  });

  async function deletarHistorico() {
    await deleteDoc(doc(db, "Historico", `${props.key_value}`));
    props.changeDeletaState(true);
    window.alert("Histórico deletado com sucesso!");
  }

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
      <Text>Nome: {nomeAluno}</Text>
      <Text>Nota: {props.nota}</Text>
      <Text>Frequência: {props.frequencia}</Text>
      <View
        style={{
          margin: 5,
          padding: 10,
          flexDirection: "column",
          justifyContent: "space-between",
          marginVertical: 1,
        }}
      >
        <Button
          title="Editar histórico"
          color="#2196f3"
          onPress={() =>
            props.navigation.navigate("Edita Historico", {
              cod_historico: props.key_value,
            })
          }
        ></Button>
      </View>
      <View
        style={{
          margin: 5,
          padding: 10,
          flexDirection: "column",
          justifyContent: "space-between",
          marginVertical: 1,
        }}
      >
        <Button
          title="Deletar histórico"
          color="#2196f3"
          onPress={() => deletarHistorico()}
        ></Button>
      </View>
    </View>
  );
}
