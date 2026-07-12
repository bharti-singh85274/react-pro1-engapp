import React, {useEffect, useState} from "react";

import {
View,
Text,
ScrollView,
StyleSheet,
TouchableOpacity,
ActivityIndicator
} from "react-native";

import {getQuizReview} from "../api/quiz";


export default function QuizReviewScreen({route,navigation}:any){


const params = route.params;


console.log(
    "REVIEW SCREEN PARAMS:",
    params
);


const lessonId = params?.lessonId;


const [data,setData] = useState<any>(null);



useEffect(()=>{

loadReview();

},[]);



const loadReview = async()=>{

try{


if(!lessonId){

console.log(
"Lesson ID missing"
);

return;

}



const response = await getQuizReview(
    lessonId
);


console.log(
"REVIEW RESPONSE:",
response
);


setData(
    response.data
);



}
catch(error){

console.log(
"REVIEW ERROR:",
error
);


}

};





if(!data){

return(

<View style={styles.center}>


<ActivityIndicator
size="large"
/>


<Text style={styles.loadingText}>
Loading Review...
</Text>


</View>

);

}





return(


<ScrollView
style={styles.container}
showsVerticalScrollIndicator={false}
>



<TouchableOpacity
style={styles.backButton}
onPress={()=>navigation.goBack()}
>


<Text style={styles.backText}>
← Back
</Text>


</TouchableOpacity>





<Text style={styles.title}>
Quiz Review
</Text>





<Text style={styles.lesson}>
{data.lesson.title}
</Text>






<View style={styles.summary}>


<Text style={styles.summaryTitle}>
Result Summary
</Text>


<Text style={styles.summaryText}>
Score: {data.result.score}/{data.result.total}
</Text>



<Text style={styles.summaryText}>
Percentage: {data.result.percentage}%
</Text>



<Text style={styles.summaryText}>
XP Earned: {data.result.xp}
</Text>



</View>






{
data.answers.map(
(item:any,index:number)=>(
    


<View
key={index}
style={styles.card}
>




<Text style={styles.question}>

Q{index+1}. {item.question}

</Text>





<Text style={styles.label}>
Your Answer:
</Text>



<Text
style={
item.is_correct
?
styles.correct
:
styles.wrong
}
>

{item.selected_answer}

</Text>







<Text style={styles.label}>
Correct Answer:
</Text>



<Text style={styles.answer}>

{item.correct_answer}

</Text>







<Text style={styles.label}>
Explanation:
</Text>


<Text style={styles.explanation}>
{item.explanation}
</Text>




</View>


)

)

}





<TouchableOpacity
style={styles.doneButton}
onPress={()=>navigation.goBack()}
>


<Text style={styles.doneText}>
Back to Result
</Text>


</TouchableOpacity>





</ScrollView>


);



}





const styles = StyleSheet.create({



container:{

flex:1,
padding:16,
backgroundColor:"#f7f7f7"

},



center:{

flex:1,
justifyContent:"center",
alignItems:"center"

},



loadingText:{

marginTop:15,
fontSize:16

},



backButton:{

marginBottom:15

},



backText:{

fontSize:17,
fontWeight:"600"

},



title:{

fontSize:26,
fontWeight:"bold",
marginBottom:8

},



lesson:{

fontSize:18,
marginBottom:15

},




summary:{

backgroundColor:"#ffffff",
padding:15,
borderRadius:12,
marginBottom:20

},



summaryTitle:{

fontSize:18,
fontWeight:"bold",
marginBottom:10

},



summaryText:{

fontSize:16,
marginBottom:5

},





card:{

backgroundColor:"#ffffff",
padding:15,
borderRadius:12,
marginBottom:15

},



question:{

fontSize:16,
fontWeight:"bold",
marginBottom:12

},



label:{

fontWeight:"600",
marginTop:8

},



correct:{

color:"green",
fontWeight:"bold",
fontSize:16

},



wrong:{

color:"red",
fontWeight:"bold",
fontSize:16

},



answer:{

color:"blue",
fontWeight:"bold",
fontSize:16

},



explanation:{

fontSize:15,
marginTop:5

},



doneButton:{

backgroundColor:"#4CAF50",
padding:15,
borderRadius:10,
marginTop:10,
marginBottom:30,
alignItems:"center"

},



doneText:{

color:"#fff",
fontSize:16,
fontWeight:"bold"

}



});