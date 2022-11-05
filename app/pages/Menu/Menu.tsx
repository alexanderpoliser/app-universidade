import React from "react";
import { View, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { defaultTheme } from "../../../defaultTheme";

import Aluno from "../Aluno/Aluno";
import Professor from "../Professor/Professor";
import Disciplina from "../Disciplina/Disciplina";
import Turma from "../Turma/Turma";
import Historico from "../Historico/Historico";
import DetalheTurma from "../DetalhesTurma/DetalhesTurma";
import DetalhesHistorico from "../DetelhesHistorico/DetalhesHistorico";
import EditaHistorico from "../EditaHistorico/EditaHistorico";

const Stack = createNativeStackNavigator();

function Menu(props: any) {
  return (
    <View>
      <View style={{ marginVertical: 4, marginTop: 10 }}>
        <Button
          title="Aluno"
          onPress={() => props.navigation.navigate("Aluno")}
          color="#2196f3"
        />
      </View>
      <View style={{ marginVertical: 4 }}>
        <Button
          title="Professor"
          onPress={() => props.navigation.navigate("Professor")}
          color="#2196f3"
        />
      </View>
      <View style={{ marginVertical: 4 }}>
        <Button
          title="Disciplina"
          onPress={() => props.navigation.navigate("Disciplina")}
          color="#2196f3"
        />
      </View>
      <View style={{ marginVertical: 4 }}>
        <Button
          title="Turma"
          onPress={() => props.navigation.navigate("Turma")}
          color="#2196f3"
        />
      </View>
      <View style={{ marginVertical: 4 }}>
        <Button
          title="Historico"
          onPress={() =>
            props.navigation.navigate("Historico", {
              editaState: false,
            })
          }
          color="#2196f3"
        />
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true} theme={defaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Aluno" component={Aluno} />
        <Stack.Screen name="Professor" component={Professor} />
        <Stack.Screen name="Disciplina" component={Disciplina} />
        <Stack.Screen name="Detalhe Turma" component={DetalheTurma} />
        <Stack.Screen name="Detalhe Historico" component={DetalhesHistorico} />
        <Stack.Screen name="Edita Historico" component={EditaHistorico} />
        <Stack.Screen name="Turma" component={Turma} />
        <Stack.Screen name="Historico" component={Historico} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
