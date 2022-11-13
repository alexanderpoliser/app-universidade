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

import Historico from "../../models/Historico";
import CardAlteraHistorico from "../../components/CardAlteraHistorico";

export default function App({ route, navigation }: any) {
  const [matricula, setMatricula] = React.useState("");
  const [codTurma, setCodTurma] = React.useState("");
  const [frequencia, setFrequencia] = React.useState("");
  const [nota, setNota] = React.useState("");
  const [historico, setHistorico] = React.useState<Historico[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [deletaState, setDeletaState] = React.useState(false);
  let editaState = route.params["editaState"];
  const { width, height } = useWindowDimensions();
  const collecRef = collection(db, "Historico");

  React.useEffect(() => {
    carregaHistorico();
  }, []);

  function carregaHistorico() {
    const listHistoricos: Historico[] = [];
    getDocs(collecRef).then((snapshot) => {
      snapshot.forEach((documentSnapshot) => {
        listHistoricos.push({
          ...(documentSnapshot.data() as Historico),
          key: documentSnapshot.id,
        });
      });
      setHistorico(listHistoricos);
      setLoading(false);
      navigation.setParams({
        editaState: false,
      });
    });
  }
  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", marginTop: height / 2 }}>
        <ActivityIndicator size={36} color={"white"} />
      </View>
    );
  }
  if (editaState) {
    carregaHistorico();
  }

  if (deletaState == true) {
    carregaHistorico();
    setDeletaState(false);
  }

  function limpaCampos() {
    setMatricula("");
    setCodTurma("");
    setFrequencia("");
    setNota("");
  }

  async function cadastrarHistorico() {
    try {
      addDoc(collection(db, "Historico"), {
        matricula: matricula,
        cod_turma: codTurma,
        frequencia: frequencia,
        nota: nota,
      }).then(async function () {
        limpaCampos();
        window.alert("Aluno Cadastrado!")
        carregaHistorico();
      });
    } catch (error) {
      window.alert("Não foi possível cadastrar o professor");
    }
  }
  function validaCampos() {
    if (matricula == "") {
      window.alert("Insira uma matricula válida!");
    } else if (codTurma == "") {
      window.alert("Insira um código de turma válido!");
    } else if (frequencia == "") {
      window.alert("Insira uma frequência válida!");
    } else if (nota == "") {
      window.alert("Insira uma nota válida!");
    } else cadastrarHistorico();
  }

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        value={matricula}
        style={styles.TextInput}
        placeholder="Digite a matricula do aluno!"
        onChangeText={(text) => {
          setMatricula(text);
        }}
      />
      <TextInput
        value={frequencia}
        style={styles.TextInput}
        placeholder="Digite a frequência do aluno!"
        onChangeText={(text) => {
          setFrequencia(text);
        }}
      />
      <TextInput
        value={nota}
        style={styles.TextInput}
        placeholder="Digite a nota do aluno!"
        onChangeText={(text) => {
          setNota(text);
        }}
      />
      <TextInput
        value={codTurma}
        style={styles.TextInput}
        placeholder="Digite o código da turma!"
        onChangeText={(text) => {
          setCodTurma(text);
        }}
      />
      <Button
        onPress={validaCampos}
        title="Cadastrar Historico"
        color="#2196f3"
        accessibilityLabel="Cadastrar Historico"
      />
      <FlatList
        data={historico}
        renderItem={({ item }) => (
          <>
            <CardAlteraHistorico
              matricula={item.matricula}
              cod_turma={item.cod_turma}
              frequencia={item.frequencia}
              nota={item.nota}
              key_value={item.key}
              navigation={navigation}
              changeDeletaState={(deletaState: boolean) =>
                setDeletaState(deletaState)
              }
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
