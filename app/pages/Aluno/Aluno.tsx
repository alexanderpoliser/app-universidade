import React from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";
import { collection, getDocs, addDoc } from "firebase/firestore";
import db from "../../../services/firebase/firebase";

const collecRef = collection(db, "Aluno");

export default function App() {
  const [nome, setNome] = React.useState("");
  const [foto, setFoto] = React.useState("");
  const [cidade, setCidade] = React.useState("");
  const [endereco, setEndereco] = React.useState("");

  function cadastrarAluno() {
    addDoc(collection(db, "Aluno"), {
      nome: nome,
      foto: foto,
      cidade: cidade,
      endereco: endereco,
    });
    window.alert("Aluno cadastrado!");
    loadAluno();
  }

  function loadAluno() {
    getDocs(collecRef)
      .then((snapshot) => {
        for (let i = 0; i < snapshot.docs.length; i++) {
          console.log("Dados[", i, "]: ", snapshot.docs[i].data());
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  React.useEffect(() => {
    loadAluno();
  }, []);

  function validaCampos() {
    if (nome == "") {
      window.alert("Insira um nome válido!");
    } else if (foto == "") {
      window.alert("Insira uma foto válida!");
    } else if (cidade == "") {
      window.alert("Insira uma cidade válida!");
    } else if (endereco == "") {
      window.alert("Insira um endereço válido!");
    } else cadastrarAluno();
  }

  return (
    <View>
      <TextInput
        style={styles.TextInput}
        value={nome}
        placeholder="Digite seu nome!"
        onChangeText={(text) => {
          setNome(text);
        }}
      />
      <TextInput
        value={foto}
        style={styles.TextInput}
        placeholder="Digite o link para sua foto!"
        onChangeText={(text) => {
          setFoto(text);
        }}
      />
      <TextInput
        value={cidade}
        style={styles.TextInput}
        placeholder="Digite sua cidade!"
        onChangeText={(text) => {
          setCidade(text);
        }}
      />
      <TextInput
        value={endereco}
        style={styles.TextInput}
        placeholder="Digite seu endereço!"
        onChangeText={(text) => {
          setEndereco(text);
        }}
      />

      <Button
        onPress={validaCampos}
        title="Cadastrar Aluno"
        color="#2196f3"
        accessibilityLabel="Cadastrar Aluno"
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
  },
});
