import React from "react";

import {
  View,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";

import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import db from "../../../services/firebase/firebase";

import Disciplina from "../../models/Disciplina";
import CardDisciplina from "../../components/CardDisciplina";

export default function App() {
  const [nome_disc, setNomeDisc] = React.useState("");
  const [carga_hor, setCargaHor] = React.useState("");
  const [disciplina, setDisciplinas] = React.useState<Disciplina[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { width, height } = useWindowDimensions();
  const collecRef = collection(db, "Disciplina");

  React.useEffect(() => {
    carregaDisciplina();
  }, []);

  function carregaDisciplina() {
    const listDisciplinas: Disciplina[] = [];
    getDocs(collecRef).then((snapshot) => {
      snapshot.forEach((documentSnapshot) => {
        listDisciplinas.push({
          ...(documentSnapshot.data() as Disciplina),
          key: documentSnapshot.id,
        });
      });
      setDisciplinas(listDisciplinas);
      setLoading(false);
    });
  }
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", marginTop: height / 2 }}>
        <ActivityIndicator size={36} color={"white"} />
      </View>
    );
  }
  function limpaCampos() {
    setNomeDisc("");
    setCargaHor("");
  }

  async function cadastrarDisciplina() {
    try {
      addDoc(collection(db, "Disciplina"), {
        nome_disc: nome_disc,
        carga_hor: carga_hor,
      }).then(async function () {
        limpaCampos();
        carregaDisciplina();
      });
    } catch (error) {
      window.alert("Não foi possível cadastrar a disciplina");
    }
  }
  function validaCampos() {
    if (nome_disc == "") {
      window.alert("Insira um nome de disciplina válido!");
    } else if (carga_hor == "") {
      window.alert("Insira uma carga horária válida!");
    } else cadastrarDisciplina();
  }

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        value={nome_disc}
        style={styles.TextInput}
        placeholder="Digite o nome da disciplina"
        onChangeText={(text) => {
          setNomeDisc(text);
        }}
      />
      <TextInput
        value={carga_hor}
        style={styles.TextInput}
        placeholder="Digite a carga horária da disciplina"
        onChangeText={(text) => {
          setCargaHor(text);
        }}
      />

      <Button
        onPress={validaCampos}
        title="Cadastrar Disciplina"
        color="#2196f3"
        accessibilityLabel="Cadastrar Disciplina"
      />
      <FlatList
        data={disciplina}
        renderItem={({ item }) => (
          <>
            <CardDisciplina
              nome_disc={item.nome_disc}
              carga_hor={item.carga_hor}
            />
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 3,
    borderColor: "#D9D9D9",
    borderRadius: 5,
    margin: 10,
    padding: 3,
    color: "white",
  },
});
