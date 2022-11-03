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

import {collection, query, where, doc, getDoc, getDocs,documentId } from "firebase/firestore";
import db from "../../../services/firebase/firebase";
import Aluno from "../../models/Aluno";
import CardAluno from "../../components/CardDetalheAluno";

export default function App({route}: any) {

  const [loading, setLoading] = React.useState(true);
  const [alunos, setAlunos] = React.useState<Aluno[]>([]);
  const { width, height } = useWindowDimensions();


  async function getMatricula() {
    const turmaId = route.params['cod_turma']
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
