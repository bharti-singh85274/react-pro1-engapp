import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import ProgressBar from "../ProgressBar";

export default function ContinueLearningCard({
  course,
  lesson,
  progress,
  navigation,
}) {

  if (!course) {
    return null;
  }

 

  const percentage =
  typeof progress === "number"
    ? progress
    : progress?.progress ??
      progress?.progress_percentage ??
      progress?.percentage ??
      0;


  const completedLessons =
    progress?.completed_lessons ?? 0;

  const totalLessons =
    progress?.total_lessons ?? 0;

  return (

    <View style={styles.card}>

      <Text style={styles.heading}>
        Continue Learning
      </Text>

      <Text style={styles.course}>
        {course.title}
      </Text>

      <Text style={styles.lesson}>
        {lesson?.title ?? "Course Completed 🎉"}
      </Text>

     <Text style={styles.progressText}>
          {percentage}% Complete
      </Text>

      <View style={styles.progressContainer}>
          <ProgressBar progress={percentage} />
      </View>

     <Text style={styles.lessonCount}>
        {completedLessons} of {totalLessons} lessons completed
    </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {

          if (lesson) {

            navigation.navigate("Lesson", {
              lessonId: lesson.id,
            });

          }

        }}
      >

        <Text style={styles.buttonText}>
          ▶ Continue Lesson
        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  card: {

    backgroundColor: "#2563EB",

    borderRadius: 18,

    padding: 22,

  },

  heading: {

    color: "#E5E7EB",

    fontSize: 15,

    fontWeight: "600",

  },

  course: {

    color: "#fff",

    fontSize: 24,

    fontWeight: "700",

    marginTop: 6,

  },

lesson:{

    color:"#DBEAFE",

    fontSize:15,

    marginTop:5,

},

 lessonCount:{

    color:"#DBEAFE",

    fontSize:14,

    marginTop:12,

},

  progressContainer: {

    marginTop: 15,

  },

 progressText:{

    color:"#FFFFFF",

    fontSize:20,

    fontWeight:"700",

    marginTop:22,

    marginBottom:10,

},

 button:{

    marginTop:24,

    backgroundColor:"#FFFFFF",

    paddingVertical:16,

    borderRadius:12,

    alignItems:"center",

},


  buttonText:{

    color:"#2563EB",

    fontWeight:"700",

    fontSize:17,

},

});