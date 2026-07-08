import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function ContinueLearningCard({
  course,
  lesson,
  progress,
  navigation,
}) {
  if (!course) {
    return null;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>
        Continue Learning
      </Text>

      <Text style={styles.title}>
        {course.title}
      </Text>

      <Text style={styles.lesson}>
        {lesson ? lesson.title : "Course Completed 🎉"}
      </Text>

      <Text style={styles.lesson}>
        {progress.completed_lessons} of {progress.total_lessons} lessons completed
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
          Resume
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2563EB",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },

  heading: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    marginTop: 10,
    fontWeight: "bold",
  },

  lesson: {
    color: "#E5E7EB",
    marginVertical: 10,
  },

  button: {
    marginTop: 15,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    fontWeight: "bold",
    color: "#2563EB",
  },
});