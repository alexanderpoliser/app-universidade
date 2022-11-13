import React from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
  Text,
} from "react-native";

import {
  collection,
  query,
  where,
  getDocs,
  documentId,
} from "firebase/firestore";
import db from "../../../services/firebase/firebase";
import Aluno from "../../models/Aluno";
import CardAluno from "../../components/CardDetalheAluno";
import CardHistorico from "../../components/CardHistorico";
import Historico from "../../models/Historico";

export default function App({ route }: any) {
  const [loading, setLoading] = React.useState(true);
  const [historicos, setHistoricos] = React.useState<Historico[]>([]);
  const { width, height } = useWindowDimensions();

  async function getMatricula() {
    const listHistorico: Historico[] = []; 
    const turmaId = route.params["cod_turma"];
    const historicoRef = collection(db, "Historico");
    const q = query(historicoRef, where("matricula", "==", turmaId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      listHistorico.push({
          ...(doc.data() as Historico),
          key: doc.id,
        });
      setHistoricos(listHistorico);
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
       <FlatList
        data={historicos}
        renderItem={({ item }) => (
          <>
            <CardHistorico
            matricula={item.matricula}
            cod_turma={item.cod_turma}
            frequencia={item.frequencia}
            nota={item.nota}
            navigation={undefined}
            key_value={undefined}
            changeDeletaState={undefined}
          />
          </>
        )}
      />
    </View>
  );
}
