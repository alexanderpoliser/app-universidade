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

import Turma from "../../models/Turma";
import CardTurma from "../../components/CardTurma";

export default function App({ navigation }: any) {
  const [codDisc, setCodDisc] = React.useState("");
  const [codProf, setcodProf] = React.useState("");
  const [ano, setAno] = React.useState("");
  const [horario, setHorario] = React.useState("");
  const [turma, setTurmas] = React.useState<Turma[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { width, height } = useWindowDimensions();
  const collecRef = collection(db, "Turma");

  React.useEffect(() => {
    carregaTurma();
  }, []);

  function carregaTurma() {
    const listTurmas: Turma[] = [];
    getDocs(collecRef).then((snapshot) => {
      snapshot.forEach((documentSnapshot) => {
        listTurmas.push({
          ...(documentSnapshot.data() as Turma),
          key: documentSnapshot.id,
        });
      });
      setTurmas(listTurmas);
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
    setCodDisc("");
    setcodProf("");
    setAno("");
    setHorario("");
  }

  async function cadastrarTurma() {
    try {
      addDoc(collection(db, "Turma"), {
        cod_disc: codDisc,
        cod_prof: codProf,
        ano: ano,
        horario: horario,
      }).then(async function () {
        limpaCampos();
        carregaTurma();
      });
    } catch (error) {
      window.alert("Não foi possível cadastrar o turma");
    }
  }
  function validaCampos() {
    if (codDisc == "") {
      window.alert("Insira um codDisc de disciplina válido!");
    } else if (codProf == "") {
      window.alert("Insira uma carga horária válida!");
    } else if (ano == "") {
      window.alert("Insira uma carga horária válida!");
    } else cadastrarTurma();
  }

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        value={ano}
        style={styles.TextInput}
        placeholder="Digite o ano de início da turma!"
        onChangeText={(text) => {
          setAno(text);
        }}
      />
      <TextInput
        value={horario}
        style={styles.TextInput}
        placeholder="Digite o horário da aula!"
        onChangeText={(text) => {
          setHorario(text);
        }}
      />
      <TextInput
        value={codProf}
        style={styles.TextInput}
        placeholder="Digite o código do Professor!"
        onChangeText={(text) => {
          setcodProf(text);
        }}
      />
      <TextInput
        style={styles.TextInput}
        value={codDisc}
        placeholder="Digite o código da Disciplina!"
        onChangeText={(text) => {
          setCodDisc(text);
        }}
      />

      <Button
        onPress={validaCampos}
        title="Cadastrar turma"
        color="#2196f3"
        accessibilityLabel="Cadastrar turma"
      />
      <FlatList
        data={turma}
        renderItem={({ item }) => (
          <>
            <CardTurma
              ano={item.ano}
              horario={item.horario}
              cod_disc={item.cod_disc}
              cod_prof={item.cod_prof}
              key_value={item.key}
              navigation={navigation}
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
