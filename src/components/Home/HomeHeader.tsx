import React from "react";
import {View,Text,StyleSheet} from "react-native";

export default function HomeHeader({user}){

return(

<View style={styles.container}>

<Text style={styles.greeting}>
Hello 👋
</Text>

<Text style={styles.name}>
{user?.name}
</Text>

<Text style={styles.subtitle}>
Continue improving your English today.
</Text>

</View>

);

}

const styles=StyleSheet.create({

container:{
marginBottom:20
},

greeting:{
fontSize:18,
color:"#6B7280"
},

name:{
fontSize:28,
fontWeight:"bold",
marginTop:4
},

subtitle:{
marginTop:8,
fontSize:15,
color:"#6B7280"
}

});