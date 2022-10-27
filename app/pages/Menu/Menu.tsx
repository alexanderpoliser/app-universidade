import React from "react";
import { View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Aluno from "../Aluno/Aluno";

const Stack = createNativeStackNavigator();

function Menu(props: any) {
  return (
    <View>
      <Button
        title="Aluno"
        onPress={() => props.navigation.navigate("Aluno")}
        color="#2196f3"
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Aluno" component={Aluno} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
