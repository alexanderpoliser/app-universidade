import React from "react";
import { View, Text } from "react-native";
import Turma from "../models/Turma";

import { doc, getDoc } from "firebase/firestore";
import db from "../../services/firebase/firebase";

export default function App(props: Turma) {
  const [professorNome, setProfessor] = React.useState("")
  const [disciplinaNome, setDisciplina] = React.useState("")

  async function getProfessorNome() {
    const docRef = doc(db, "Professor", `${props.cod_prof}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const professorName = docSnap.data()["nome"];
      setProfessor(professorName);
    } else {
      console.log("No such document!");
    }
  }

  async function getDisciplinaNome() {
    const docRef = doc(db, "Disciplina", `${props.cod_disc}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const disciplinaName = docSnap.data()["nome_disc"];
      setDisciplina(disciplinaName);
    } else {
      console.log("No such document!");
    }
  }

  React.useEffect(() => {
    getProfessorNome();
    getDisciplinaNome();
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
      <Text style={{ fontWeight: "500" }}>Código Turma: {props.key_value}</Text>
      <Text>{props.ano}</Text>
      <Text>{props.horario}</Text>
      <Text>Cod Disciplina: {disciplinaNome}</Text>
      <Text>Cod Professor: {professorNome} </Text>
    </View>
  );
}
function getDisciplina() {
  throw new Error("Function not implemented.");
}

