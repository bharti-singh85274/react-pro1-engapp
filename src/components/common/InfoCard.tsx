import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function InfoCard({

    icon,
    title,
    description,
    color="#3563E9"

}) {

    return (

        <View style={styles.card}>

            <Ionicons
                name={icon}
                size={28}
                color={color}
            />

            <View style={styles.content}>

                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.description}>
                    {description}
                </Text>

            </View>

        </View>

    );

}

const styles=StyleSheet.create({

card:{
backgroundColor:"#fff",
borderRadius:20,
padding:18,
marginBottom:16,
flexDirection:"row",
elevation:5,
shadowColor:"#000",
shadowOpacity:.08,
shadowRadius:8
},

content:{
marginLeft:16,
flex:1
},

title:{
fontSize:18,
fontWeight:"700",
marginBottom:6
},

description:{
fontSize:15,
color:"#666",
lineHeight:24
}

});