import React from "react";
import { View, Text, Button } from "react-native";

import { doc, getDoc } from "firebase/firestore";
import db from "../../services/firebase/firebase";

export default function App(props: any) {
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
      <Button
        onPress={() => props.navigation.navigate("Detalhe Turma", {cod_turma:props.key_value})}
        title="Detalhe turma"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />      
    </View>
  );
}

