import React from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";

import { doc, updateDoc } from "firebase/firestore";
import db from "../../../services/firebase/firebase";

export default function App({ route, navigation }: any) {
  const [novaNota, setNovaNota] = React.useState("");
  const [novaFrequencia, setNovaFrequencia] = React.useState("");
  const cod_historico = route.params["cod_historico"];

  async function atualizaCampos() {
    await updateDoc(doc(db, "Historico", `${cod_historico}`), {
      frequencia: novaFrequencia,
      nota: novaNota,
    });
    window.alert("Campos atualizados!");
    navigation.navigate("Historico", {
      editaState: true,
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        value={novaNota}
        style={styles.TextInput}
        placeholder="Digite a nova nota!"
        onChangeText={(text) => {
          setNovaNota(text);
        }}
      />
      <TextInput
        value={novaFrequencia}
        style={styles.TextInput}
        placeholder="Digite a nova frequência!"
        onChangeText={(text) => {
          setNovaFrequencia(text);
        }}
      />

      <Button
        onPress={() => {
          atualizaCampos();
        }}
        title="Editar os Campos"
        color="#2196f3"
        accessibilityLabel="Editar os Campos"
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
