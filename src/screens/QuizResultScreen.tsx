import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";


export default function QuizResultScreen(
    { route, navigation }: any
) {


    const { result, lessonId } = route.params;

    const quiz = result?.quiz;


    console.log(
        "RESULT SCREEN LESSON ID:",
        lessonId
    );


    const passed = quiz?.passed;



    return (

       
        <ScrollView contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}    >
               

            <Text style={styles.title}>
                Quiz Completed 🎉
            </Text>



            <View style={styles.scoreCircle}>


                <Text style={styles.scoreText}>
                    {quiz?.percentage}%
                </Text>


                <Text style={styles.scoreLabel}>
                    Score
                </Text>


            </View>





            <View style={styles.card}>


                <Text style={styles.resultTitle}>
                    Your Result
                </Text>



                <View style={styles.row}>

                    <Text style={styles.label}>
                        Correct Answers
                    </Text>

                    <Text style={styles.value}>
                        {quiz?.score}/{quiz?.total}
                    </Text>

                </View>





                <View style={styles.row}>

                    <Text style={styles.label}>
                        Wrong Answers
                    </Text>

                    <Text style={styles.value}>
                        {quiz?.wrong}
                    </Text>

                </View>





                <View style={styles.row}>

                    <Text style={styles.label}>
                        XP Earned
                    </Text>

                    <Text style={styles.xp}>
                        +{quiz?.xp} XP
                    </Text>

                </View>




                <Text
                    style={
                        passed
                        ?
                        styles.pass
                        :
                        styles.fail
                    }
                >

                {
                    passed
                    ?
                    "🎊 Congratulations! You Passed"
                    :
                    "Keep Practicing! Try Again"
                }

                </Text>



            </View>







            <TouchableOpacity

                style={styles.reviewButton}

                onPress={()=>{


                    console.log(
                        "SENDING TO REVIEW:",
                        lessonId
                    );


                    navigation.navigate(
                        "QuizReview",
                        {
                            lessonId:lessonId
                        }
                    );


                }}

            >

                <Text style={styles.buttonText}>
                    Review Answers
                </Text>


            </TouchableOpacity>







            <TouchableOpacity

                style={styles.retryButton}

                onPress={()=>{


                    navigation.navigate(
                        "Quiz",
                        {
                            lessonId:lessonId
                        }
                    );


                }}

            >

                <Text style={styles.buttonText}>
                    Retry Quiz
                </Text>


            </TouchableOpacity>








            <TouchableOpacity

                style={styles.homeButton}

                onPress={()=>{


                 navigation.reset({
                    index: 0,
                    routes: [
                        {
                        name: "MainTabs",
                        state: {
                            index: 0,
                            routes: [
                            {
                                name: "MainTabs",
                            },
                            ],
                        },
                        },
                    ],
                    });


                }}

            >

                <Text style={styles.buttonText}>
                    Go Home
                </Text>


            </TouchableOpacity>





       </ScrollView>

    );

}






const styles = StyleSheet.create({



container:{

    flexGrow:1,

    justifyContent:"center",

    alignItems:"center",

    padding:20,

    backgroundColor:"#F5F7FB",
    
    paddingBottom:40,


},




title:{

    fontSize:26,

    fontWeight:"bold",

    marginBottom:20

},




scoreCircle:{

    width:130,

    height:130,

    borderRadius:65,

    backgroundColor:"#2563EB",

    justifyContent:"center",

    alignItems:"center",

    marginBottom:20

},




scoreText:{

    color:"#fff",

    fontSize:34,

    fontWeight:"bold"

},




scoreLabel:{

    color:"#fff",

    fontSize:15

},





card:{

    width:"100%",

    backgroundColor:"#fff",

    padding:20,

    borderRadius:15,

},





resultTitle:{

    fontSize:20,

    fontWeight:"bold",

    marginBottom:15

},




row:{

    flexDirection:"row",

    justifyContent:"space-between",

    marginBottom:12

},




label:{

    fontSize:16

},




value:{

    fontWeight:"bold",

    fontSize:16

},




xp:{

    color:"#10B981",

    fontWeight:"bold",

    fontSize:16

},





pass:{

    marginTop:15,

    color:"#10B981",

    fontWeight:"bold",

    textAlign:"center"

},




fail:{

    marginTop:15,

    color:"#EF4444",

    fontWeight:"bold",

    textAlign:"center"

},




reviewButton:{

    width:"100%",

    marginTop:20,

    backgroundColor:"#10B981",

    padding:15,

    borderRadius:10,

    alignItems:"center"

},





retryButton:{

    width:"100%",

    marginTop:12,

    backgroundColor:"#F59E0B",

    padding:15,

    borderRadius:10,

    alignItems:"center"

},




homeButton:{

    width:"100%",

    marginTop:12,

    backgroundColor:"#2563EB",

    padding:15,

    borderRadius:10,

    alignItems:"center"

},




buttonText:{

    color:"#fff",

    fontWeight:"bold",

    fontSize:16

}



});