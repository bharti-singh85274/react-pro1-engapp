import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { getLessons } from "../api/lesson";

export default function CourseScreen({ route, navigation }) {

  const { courseId } = route.params;
  console.log("COURSE ID RECEIVED:", courseId);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    loadLessons();
  }, []);

//   const loadLessons = async () => {
//     try {
//       const res = await getLessons(courseId);
//       setLessons(res);
//     } catch (err) {
//       console.log(err);
//     }
//   };

const loadLessons = async () => {
  try {
    const res = await getLessons(courseId);
    
    setLessons(Array.isArray(res) ? res : []);
  } catch (err) {
    console.log(err);
  }
};

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

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>📘 Basic English Course</Text>
        <Text style={styles.subtitle}>
          Learn spoken English step by step
        </Text>
      </View>

      {/* WHAT YOU LEARN */}
      <View style={styles.card}>
        <Text style={styles.section}>🎯 What you'll learn</Text>

        <Text style={styles.point}>✔ Speak basic English</Text>
        <Text style={styles.point}>✔ Daily conversation</Text>
        <Text style={styles.point}>✔ Confidence in speaking</Text>
      </View>

      {/* LESSONS */}
      <Text style={styles.sectionTitle}>📚 Lessons</Text>

      {lessons.length === 0 ? (
        <Text style={{ color: "gray" }}>No lessons found</Text>
      ) : (
        lessons.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.lessonCard}
            onPress={() =>
              navigation.navigate("Lesson", { lesson: item })
            }
          >
            <Text style={styles.lessonTitle}>
              🎥 Lesson {index + 1}: {item.title}
            </Text>

            <Text style={styles.lessonDesc} numberOfLines={2}>
              {item.content}
            </Text>
          </TouchableOpacity>
        ))
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

  header: {
    backgroundColor: "#2563EB",
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#E5E7EB",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
  },

  section: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  point: {
    color: "#374151",
    marginBottom: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  lessonCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  lessonTitle: {
    fontSize: 15,
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

  lessonDesc: {
    marginTop: 5,
    color: "#6B7280",
  },
});