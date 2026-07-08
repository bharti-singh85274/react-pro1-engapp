import React, {useState, useCallback} from "react";

import {
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    StyleSheet
} from "react-native";

import {useFocusEffect} from "@react-navigation/native";

import {getCourses} from "../api/course";

import CourseCard from "../components/CourseCard";


export default function CoursesScreen({navigation}) {


    const [courses,setCourses] = useState([]);
    const [loading,setLoading] = useState(true);



    const loadCourses = async()=>{

        try{

            const response = await getCourses();

            console.log("COURSES:",response);

            setCourses(response.data || []);

        }
        catch(error){

            console.log(
                "COURSE ERROR:",
                error.response?.data || error.message
            );

        }
        finally{

            setLoading(false);

        }

    };



    useFocusEffect(
        useCallback(()=>{

            loadCourses();

        },[])
    );



    if(loading){

        return(

            <View style={styles.loader}>

                <ActivityIndicator
                    size="large"
                    color="#2563EB"
                />

            </View>

        );

    }



    return(

        <ScrollView style={styles.container}>


            <Text style={styles.title}>
                All Courses
            </Text>



            {
                courses.map((item)=>(

                    <CourseCard

                        key={item.id}

                        item={item}

                        progress={item.progress}


                        onPress={()=>


                            navigation.navigate(
                                "Course",
                                {
                                    slug:item.slug
                                }

                            )


                        }

                    />

                ))
            }


        </ScrollView>

    );

}



const styles=StyleSheet.create({


    container:{
        flex:1,
        backgroundColor:"#F8FAFC",
        padding:18
    },


    title:{
        fontSize:28,
        fontWeight:"700",
        marginBottom:20
    },


    loader:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }


});