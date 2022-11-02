import React from "react";
import { View, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { defaultTheme } from "../../../defaultTheme";

import Aluno from "../Aluno/Aluno";
import Professor from "../Professor/Professor";
import Disciplina from "../Disciplina/Disciplina";
import Turma from "../Turma/Turma";

const Stack = createNativeStackNavigator();

function Menu(props: any) {
  return (
    <View>
      <Button
        title="Aluno"
        onPress={() => props.navigation.navigate("Aluno")}
        color="#2196f3"
      />
      <Button
        title="Professor"
        onPress={() => props.navigation.navigate("Professor")}
        color="#2196f3"
      />
      <Button
        title="Disciplina"
        onPress={() => props.navigation.navigate("Disciplina")}
        color="#2196f3"
      />
      <Button
        title="Turma"
        onPress={() => props.navigation.navigate("Turma")}
        color="#2196f3"
      />
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
        <Stack.Screen name="Turma" component={Turma} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
