import React from "react";

import {
  View,
  Button,
  FlatList,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";

import { collection, getDocs} from "firebase/firestore";
import db from "../../../services/firebase/firebase";

import Historico from "../../models/Historico";
import CardHistorico from "../../components/CardHistorico";

export default function App({ navigation }: any) {
  const [historico, setHistorico] = React.useState<Historico[]>([]);
  const [loading, setLoading] = React.useState(true);
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
    });
  }

  function carregaHistoricoFiltroNota() {
    const listHistoricos: Historico[] = [];
    getDocs(collecRef).then((snapshot) => {
      snapshot.forEach((documentSnapshot) => {
        listHistoricos.push({
          ...(documentSnapshot.data() as Historico),
          key: documentSnapshot.id,
        });
      });
      listHistoricos.sort(
        (h1, h2) => (h1.nota < h2.nota) ? 1 : (h1.nota > h2.nota) ? -1 : 0);
      setHistorico(listHistoricos);
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

  return (
    <View>
    <View style={{ marginVertical: 4, marginTop: 10 }}>
        <Button
            onPress={() => 
            {window.alert("Filtrando Nota!");
            carregaHistoricoFiltroNota();}}
            title="Filtra Nota"
            color="#2196f3"
            accessibilityLabel="Filtrando Nota!"
        />
    </View>
    <FlatList
        data={historico}
        renderItem={({ item }) => (
            <>
                <CardHistorico
                    matricula={item.matricula}
                    cod_turma={item.cod_turma}
                    frequencia={item.frequencia}
                    nota={item.nota}
                    key_value={item.key}
                    navigation={navigation}
                    changeDeletaState={""}
                />
            </>
        )}
    />
    </View>
  );
}
