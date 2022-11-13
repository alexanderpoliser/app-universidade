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

import { collection, getDocs, addDoc } from "firebase/firestore";
import db from "../../../services/firebase/firebase";

import Professor from "../../models/Professor";
import CardProfessor from "../../components/CardProfessor";

export default function App() {
  const [nome, setNome] = React.useState("");
  const [endereco, setEndereco] = React.useState("");
  const [cidade, setCidade] = React.useState("");
  const [professor, setProfessores] = React.useState<Professor[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { width, height } = useWindowDimensions();
  const collecRef = collection(db, "Professor");

  React.useEffect(() => {
    carregaProfessor();
  }, []);

  function carregaProfessor() {
    const listProfessores: Professor[] = [];
    getDocs(collecRef).then((snapshot) => {
      snapshot.forEach((documentSnapshot) => {
        listProfessores.push({
          ...(documentSnapshot.data() as Professor),
          key: documentSnapshot.id,
        });
      });
      setProfessores(listProfessores);
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
    setNome("");
    setEndereco("");
    setCidade("");
  }

  async function cadastrarProfessor() {
    try {
      addDoc(collection(db, "Professor"), {
        nome: nome,
        endereco: endereco,
        cidade: cidade,
      }).then(async function () {
        limpaCampos();
        carregaProfessor();
      });
    } catch (error) {
      window.alert("Não foi possível cadastrar o professor");
    }
  }
  function validaCampos() {
    if (nome == "") {
      window.alert("Insira um nome de disciplina válido!");
    } else if (endereco == "") {
      window.alert("Insira uma carga horária válida!");
    } else if (cidade == "") {
      window.alert("Insira uma carga horária válida!");
    } else cadastrarProfessor();
  }

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.TextInput}
        value={nome}
        placeholder="Digite o nome do professor!"
        onChangeText={(text) => {
          setNome(text);
        }}
      />
      <TextInput
        value={cidade}
        style={styles.TextInput}
        placeholder="Digite a cidade do professor!"
        onChangeText={(text) => {
          setCidade(text);
        }}
      />
      <TextInput
        value={endereco}
        style={styles.TextInput}
        placeholder="Digite o endereço do professor!"
        onChangeText={(text) => {
          setEndereco(text);
        }}
      />

      <Button
        onPress={validaCampos}
        title="Cadastrar Professor"
        color="#2196f3"
        accessibilityLabel="Cadastrar Professor"
      />
      <FlatList
        data={professor}
        renderItem={({ item }) => (
          <>
            <CardProfessor
              nome={item.nome}
              cidade={item.cidade}
              endereco={item.cidade}
              key_value={item.key}
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
