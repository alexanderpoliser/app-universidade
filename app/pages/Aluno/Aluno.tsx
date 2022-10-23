import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import { getFirestore, collection, getDocs, doc, setDoc, addDoc} from 'firebase/firestore'
import db from "../../../services/firebase/firebase";

const collecRef = collection(db, 'Aluno');

export default function App() {
    function cadastrarAluno() {
        console.log(nome);
        addDoc(collection(db, "Aluno"), {
        nome: nome,
        foto: foto,
        cidade: cidade,
        endereco: endereco
        });
        loadAluno();
    }
    
    function loadAluno() {
      getDocs(collecRef)
        .then( (snapshot)=> {
          for(let i=0;i<snapshot.docs.length;i++) {
            console.log('Dados[', i, ']: ', snapshot.docs[i].data())
          }
        }).catch(err => {
        console.log(err.message)
      })
    }

    const [nome, setNome] = React.useState("");
    const [foto, setFoto] = React.useState("");
    const [cidade, setCidade] = React.useState("");
    const [endereco, setEndereco] = React.useState("");

  return (
    <View>
        <TextInput
         value={nome}
         placeholder="Digite seu nome!" 
         style={{borderWidth:2, borderColor:"red"}}
         onChangeText={(text) => {setNome(text)}}
        />
        <TextInput
         value={foto}
         placeholder="Digite o link para sua foto!" 
         style={{borderWidth:2, borderColor:"red"}}
         onChangeText={(text) => {setFoto(text)}}
        />
        <TextInput
         value={cidade}
         placeholder="Digite sua cidade!" 
         style={{borderWidth:2, borderColor:"red"}}
         onChangeText={(text) => {setCidade(text)}}
        />
        <TextInput
         value={endereco}
         placeholder="Digite seu endereço!" 
         style={{borderWidth:2, borderColor:"red"}}
         onChangeText={(text) => {setEndereco(text)}}
        />

        <Button
        onPress={cadastrarAluno}
        title="Cadastrar Aluno"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
        />
    </View>
  );
}