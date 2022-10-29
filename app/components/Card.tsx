import React from "react";
import { View, Text, Image } from "react-native";
import Card from '../models/Card'

export default function App(props: Card) {
    return(
        <View style={{flex:1,
            alignItems:"center",
            backgroundColor:"#D9D9D9",
            padding:20,
            margin:20,
            borderRadius:20}}>

            <View style={{flex:1}}>
                <Image 
                style={{width: '100px',
                 height: '100px',
                borderRadius:50,
                marginBottom:10}}
                source={{uri:props.image as any}}/>
            </View>

            <Text style={{fontWeight:'500'}}>{props.name}</Text>
            <Text>{props.ra}</Text>
        </View>
    )
}

