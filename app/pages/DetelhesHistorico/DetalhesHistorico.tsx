import React from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
  Text
} from "react-native";

import {collection, query, where, getDocs,documentId } from "firebase/firestore";
import db from "../../../services/firebase/firebase";
import Aluno from "../../models/Aluno";
import CardAluno from "../../components/CardDetalheAluno";
import CardHistorico from "../../components/CardHistorico";

export default function App({route}: any) {
  const historicoId = route.params['cod_turma']

  
  const [loading, setLoading] = React.useState(true);
  const [nota, setNota] = React.useState("");
  const [frequencia, setFrequencia] = React.useState("");
  const [codTurma, setCodTurma] = React.useState("");
  const { width, height } = useWindowDimensions();
  
  async function getMatricula() {    
    const turmaId = route.params['cod_turma']    
    const historicoRef = collection(db, "Historico");
    const q = query(historicoRef, where("matricula", "==", turmaId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCodTurma(doc.data()["cod_turma"])
      setNota(doc.data()["nota"])
      setFrequencia(doc.data()["frequencia"])
      setLoading(false);
    });
  }

  React.useEffect(() => {
    getMatricula();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", marginTop: height / 2 }}>
        <ActivityIndicator size={36} color={"white"} />
      </View>
    );
  }

  return (
    <View>
        <CardHistorico
              matricula={historicoId}
              cod_turma={codTurma}
              frequencia={frequencia}
              nota={nota}
            />
    </View>
  );
}

