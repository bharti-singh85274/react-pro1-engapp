import React, { useState, useCallback } from "react";
import AchievementsSection from "../components/Home/AchievementsSection";
import RecentActivitySection from "../components/Home/RecentActivitySection";
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { getHome } from "../api/home";

import CourseCard from "../components/CourseCard";
import ContinueLearningCard from "../components/Home/ContinueLearningCard";
import { Dimensions } from "react-native";


export default function HomeScreen({ navigation }) {


  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);



  const loadData = async()=>{

    try{

      setLoading(true);


      const response = await getHome();


      console.log(
        "HOME DASHBOARD RESPONSE:",
        JSON.stringify(response,null,2)
      );


      setDashboard(
        response.data
      );


    }
    catch(error){

      console.log(
        "HOME ERROR:",
        error
      );

    }
    finally{

      setLoading(false);

    }

  };



  useFocusEffect(

    useCallback(()=>{

      loadData();

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




  const stats = dashboard?.stats;



  const continueLearning =
    dashboard?.continue_learning;



  const courses =
    dashboard?.recommendations || [];


  const achievements =
    dashboard?.achievements || [];

  const recentActivity =
    dashboard?.recent_activity || [];



  return (

    <ScrollView

      style={styles.container}

      contentContainerStyle={styles.content}

    >



      {/* Header */}

    <Text style={styles.title}>
        Hello, {dashboard?.user?.name} 👋
        </Text>

        <Text style={styles.subtitle}>
        Continue your learning journey
        </Text>




      {/* Stats Cards */}


      <View style={styles.statsContainer}>


        <View style={styles.statCard}>


          <Text style={styles.statIcon}>
            ⭐
          </Text>


          <Text style={styles.statValue}>

            {stats?.xp || 0}

          </Text>


          <Text style={styles.statLabel}>

            XP

          </Text>


        </View>





        <View style={styles.statCard}>


          <Text style={styles.statIcon}>
            🔥
          </Text>


          <Text style={styles.statValue}>

            {
              stats?.current_streak || 0
            }

          </Text>


          <Text style={styles.statLabel}>

            Day Streak

          </Text>


        </View>



      </View>





      {/* Daily Goal */}


     <View style={styles.goalCard}>

  <Text style={styles.cardTitle}>
    🎯 Daily Goal
  </Text>

  {/* Lesson Goal */}

  <View style={styles.goalRow}>

    <Text style={styles.goalLabel}>
      Lessons
    </Text>

    <Text style={styles.goalValue}>
      {dashboard?.daily_goal?.completed_lessons ?? 0}
      /
      {dashboard?.daily_goal?.target_lessons ?? 0}
    </Text>

  </View>

  <View style={styles.progressBackground}>

    <View
      style={[
        styles.progressFill,
        {
          width: `${
            (
              (dashboard?.daily_goal?.completed_lessons ?? 0) /
              Math.max(
                dashboard?.daily_goal?.target_lessons ?? 1,
                1
              )
            ) * 100
          }%`,
        },
      ]}
    />

  </View>

  {/* XP Goal */}

  <View style={[styles.goalRow, { marginTop: 18 }]}>

    <Text style={styles.goalLabel}>
      XP
    </Text>

    <Text style={styles.goalValue}>
      {dashboard?.daily_goal?.earned_xp ?? 0}
      /
      {dashboard?.daily_goal?.target_xp ?? 0}
    </Text>

  </View>

  <View style={styles.progressBackground}>

    <View
      style={[
        styles.progressFill,
        {
          width: `${
            (
              Number(dashboard?.daily_goal?.earned_xp ?? 0) /
              Math.max(
                dashboard?.daily_goal?.target_xp ?? 1,
                1
              )
            ) * 100
          }%`,
        },
      ]}
    />

  </View>

</View>





      {/* Continue Learning */}



      <View style={styles.progressCard}>


      <ContinueLearningCard
          course={continueLearning?.course}
          lesson={continueLearning?.lesson}
          progress={continueLearning}
          navigation={navigation}
      />


      </View>






      {/* Overall Progress */}



      <View style={styles.overallCard}>


        <Text style={styles.sectionTitle}>

          Overall Progress

        </Text>


      <Text style={styles.progressPercent}>
    {stats?.progress ?? 0}%
</Text>

<View style={styles.progressBar}>

    <View
        style={[
            styles.progressFill,
            {
                width: `${stats?.progress ?? 0}%`
            }
        ]}
    />

</View>

      <Text style={styles.progressSubtitle}>
            {stats?.completed_lessons ?? 0}
            {" of "}
            {stats?.total_lessons ?? 0}
            {" lessons completed"}
        </Text>


      </View>






      {/* Courses */}



      <Text style={styles.courseHeading}>

        Recommended Courses

      </Text>



      {
        courses.map((item)=>(


          <CourseCard

            key={item.id}

            item={item}

            progress={item.progress || 0}


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


      <AchievementsSection
          achievements={achievements}
      />

      <RecentActivitySection
          activities={recentActivity}
      />


    </ScrollView>

  );

}





const styles = StyleSheet.create({



container:{

  flex:1,

  backgroundColor:"#F8FAFC",

},



content:{

  padding:18,

  paddingTop:55,

  paddingBottom:40,

},



loader:{

 flex:1,

 justifyContent:"center",

 alignItems:"center",

},



title:{

 fontSize:30,

 fontWeight:"700",

 color:"#111827",

},



subtitle:{

 fontSize:15,

 color:"#6B7280",

 marginTop:6,

 marginBottom:20,

},



statsContainer:{

 flexDirection:"row",

 justifyContent:"space-between",

 marginBottom:20,

},



statCard:{

 backgroundColor:"#fff",

 width:"48%",

 padding:18,

 borderRadius:15,

 alignItems:"center",

},



statIcon:{

 fontSize:25,

},



statValue:{

 fontSize:26,

 fontWeight:"bold",

 marginTop:5,

},



statLabel:{

 color:"#6B7280",

},



goalCard:{

 backgroundColor:"#fff",

 padding:18,

 borderRadius:15,

 marginBottom:20,

},



progressCard:{
    marginBottom:20,
},



overallCard:{

 backgroundColor:"#fff",

 padding:20,

 borderRadius:15,

 marginBottom:25,

},


progressSubtitle: {

    marginTop: 10,

    color: "#6B7280",

    fontSize: 15,

},



sectionTitle:{

 color:"#111827",

 fontSize:18,

 fontWeight:"700",

 marginBottom:10,

},



cardTitle:{

 fontSize:18,

 fontWeight:"700",

 marginBottom:10,

},



progressPercent:{

 fontSize:36,

 fontWeight:"bold",

 color:"#2563EB",

},



courseHeading:{

 fontSize:22,

 fontWeight:"700",

 marginBottom:15,

},


progressBar:{
    height:12,
    backgroundColor:"#E5E7EB",
    borderRadius:20,
    overflow:"hidden",
    marginTop:15,
},

progressFill:{
    height:12,
    backgroundColor:"#2563EB",
    borderRadius:20,
},


goalRow: {

  flexDirection: "row",

  justifyContent: "space-between",

  marginBottom: 8,

},

goalLabel: {

  fontSize: 15,

  color: "#374151",

  fontWeight: "600",

},

goalValue: {

  fontWeight: "700",

  color: "#2563EB",

},

progressBackground: {

  height: 10,

  backgroundColor: "#E5E7EB",

  borderRadius: 10,

  overflow: "hidden",

},

progressFill: {

  height: "100%",

  backgroundColor: "#2563EB",

  borderRadius: 10,

},



});