import React from "react";

import {

View,
Text,
StyleSheet

} from "react-native";

export default function ProgressSummary({

stats

}){

return(

<View style={styles.card}>

<Text style={styles.title}>

Your Progress

</Text>

<View style={styles.row}>

<View>

<Text style={styles.number}>

{stats.completed_lessons}

</Text>

<Text>

Lessons

</Text>

</View>

<View>

<Text style={styles.number}>

{stats.progress}%

</Text>

<Text>

Completed

</Text>

</View>

<View>

<Text style={styles.number}>

{stats.xp}

</Text>

<Text>

XP

</Text>

</View>

</View>

</View>

);

}

const styles=StyleSheet.create({

card:{
backgroundColor:"#fff",
padding:20,
borderRadius:15,
marginBottom:20
},

title:{
fontWeight:"bold",
fontSize:18,
marginBottom:20
},

row:{
flexDirection:"row",
justifyContent:"space-between"
},

number:{
fontSize:24,
fontWeight:"bold"
}

});