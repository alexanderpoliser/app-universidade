import React from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
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
import CardDetalheAluno from "../../components/CardDetalheAluno";

export default function App({ route, navigation }: any) {
  const [loading, setLoading] = React.useState(false);
  const [alunos, setAlunos] = React.useState<Aluno[]>([]);
  const { width, height } = useWindowDimensions();

  async function getMatricula() {
    const turmaId = route.params["cod_turma"];
    const historicoRef = collection(db, "Historico");
    const q = query(historicoRef, where("cod_turma", "==", turmaId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      getAlunos(doc.data()["matricula"]);
    });
  }

  const listAlunos: Aluno[] = [];
  async function getAlunos(matricula: string) {
    const alunoRef = collection(db, "Aluno");
    const q = query(alunoRef, where(documentId(), "==", matricula));
    await getDocs(q).then((snapshot) => {
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
    <View style={{ flex: 1 }}>
      <FlatList
        data={alunos}
        renderItem={({ item }) => (
          <>
            <CardDetalheAluno
              nome={item.nome}
              foto={item.foto}
              cidade={item.cidade}
              endereco={item.endereco}
              key_value={item.key}
              navigation={navigation}
            />
          </>
        )}
      />
    </View>
  );
}
