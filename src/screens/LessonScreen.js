import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from "react-native";
import { completeLesson } from "../api/progress";
import { Alert } from "react-native";
import { useState } from "react";

export default function LessonScreen({ route, navigation }) {


const [completed, setCompleted] = useState(false);

const markComplete = async () => {
  try {
    const res = await completeLesson(lesson.id);

    alert(res.message || "Lesson Completed 🎉");

    // 🔥 THIS IS THE MISSING PIECE
    setCompleted(true);

  } catch (err) {
    console.log(err);
  }
};

  const { lesson } = route.params;

  return (
    <ScrollView style={styles.container}>

    <View style={styles.header}>
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
        >
            <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        </View>

      {/* TITLE */}
      <Text style={styles.title}>
        🎓 {lesson.title}
      </Text>

      {/* VIDEO */}
      <TouchableOpacity
        style={styles.videoBtn}
        onPress={() => Linking.openURL(lesson.video_url)}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          ▶ Watch Video
        </Text>
      </TouchableOpacity>

      {/* CONTENT */}
      <View style={styles.card}>
        <Text style={styles.section}>📖 Explanation</Text>
        <Text style={styles.text}>{lesson.content}</Text>
      </View>

      {/* PRACTICE */}
      <View style={styles.card}>
        <Text style={styles.section}>🧠 Practice</Text>
        <Text>Repeat 5 times:</Text>

        <Text style={styles.example}>
          "Hello, how are you?"
        </Text>
      </View>

      {/* COMPLETE */}


      {/* <TouchableOpacity style={styles.completeBtn} onPress={markComplete}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Mark as Complete
        </Text>
      </TouchableOpacity> */}


      {completed ? (
  <View>
    <Text>✅ Completed</Text>
  </View>
) : (
  <TouchableOpacity style={styles.completeBtn} onPress={markComplete}>
    <Text style={{ color: "#fff", fontWeight: "bold" }}>
      Mark as Complete
    </Text>
  </TouchableOpacity>
)}



    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  videoBtn: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  section: {
    fontWeight: "bold",
    marginBottom: 8,
  },

  text: {
    color: "#374151",
  },

  example: {
    marginTop: 10,
    fontWeight: "bold",
    color: "#111827",
  },

    header: {
    marginBottom: 15,
    },

    backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E7EB",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    },

    backText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
    },

  completeBtn: {
    backgroundColor: "#10B981",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
});