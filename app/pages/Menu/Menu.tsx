import React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer, NavigationContainerProps } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Aluno from "../Aluno/Aluno";

const Stack = createNativeStackNavigator();

function Menu(props){
  return(
    <View>
        <Button
                style = {{backgroundColor:'blue'}}
                title = "Aluno"
                onPress = {()=>props.navigation.navigate('Aluno')} 
        />
    </View>    
  );
}

export default function App(){
    return(

          <NavigationContainer independent={true}>
              <Stack.Navigator>
                  <Stack.Screen name='Menu' component={Menu}/>
                  <Stack.Screen name='Aluno' component={Aluno}/>
              </Stack.Navigator>
          </NavigationContainer>
      )
}
