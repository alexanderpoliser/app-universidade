import React from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { collection, getDocs, addDoc } from "firebase/firestore";
import db from "../../../services/firebase/firebase";
import CardAluno from "../../components/CardAluno";
import Aluno from "../../models/Aluno";

export default function App() {
  const [nome, setNome] = React.useState("");
  const [foto, setFoto] = React.useState("");
  const [cidade, setCidade] = React.useState("");
  const [endereco, setEndereco] = React.useState("");
  const [alunos, setAlunos] = React.useState<Aluno[]>([]);
  const [loading, setLoading] = React.useState(true);
  const collecRef = collection(db, "Aluno");
  const { width, height } = useWindowDimensions();

  React.useEffect(() => {
    carregaAlunos();
  }, []);

  function carregaAlunos() {
    const listAlunos: Aluno[] = [];
    getDocs(collecRef).then((snapshot) => {
      snapshot.forEach((documentSnapshot) => {
        listAlunos.push({
          ...(documentSnapshot.data() as Aluno),
          key: documentSnapshot.id,
        });
      });
      setAlunos(listAlunos);
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
    setFoto("");
    setCidade("");
    setEndereco("");
  }

  async function cadastrarAluno() {
    try {
      addDoc(collection(db, "Aluno"), {
        nome: nome,
        foto: foto,
        cidade: cidade,
        endereco: endereco,
      }).then(async function () {{
          window.alert("Aluno cadastrado!");
          limpaCampos();
          carregaAlunos();
        }
      });
    } catch (error) {
      window.alert("Não foi possível cadastrar o aluno");
    }
  }

  function validaCampos() {
    if (nome == "") {
      window.alert("Insira um nome válido!");
    } else if (foto == "") {
      window.alert("Insira uma foto válida!");
    } else if (cidade == "") {
      window.alert("Insira uma cidade válida!");
    } else if (endereco == "") {
      window.alert("Insira um endereço válido!");
    } else console.log(cadastrarAluno());
  }

  return (
    <View style={{ flex: 1 }}>
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
      <FlatList
        data={alunos}
        renderItem={({ item }) => (
          <>
            <CardAluno
              nome={item.nome}
              foto={item.foto}
              cidade={item.cidade}
              endereco={""}
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
