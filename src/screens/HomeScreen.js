import React, { useState, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { getCourses } from "../api/course";
import { getProgress } from "../api/progress";

import CourseCard from "../components/CourseCard";

export default function HomeScreen({ navigation }) {
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      const courseRes = await getCourses();
      const progressRes = await getProgress();

      console.log("COURSES :", courseRes);
      console.log("PROGRESS :", progressRes);

      setCourses(courseRes.data || []);
      setProgress(progressRes);

    } catch (error) {
      console.log(
        "HOME ERROR :",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >

      {/* Header */}

      <Text style={styles.title}>
        Learn English
      </Text>

      <Text style={styles.subtitle}>
        Continue your learning journey 🚀
      </Text>

      {/* Progress Card */}

      <View style={styles.progressCard}>

        <Text style={styles.progressTitle}>
          Overall Progress
        </Text>

        <Text style={styles.progressPercent}>
          {progress?.percentage || 0}%
        </Text>

      </View>

      {/* Courses */}

      <Text style={styles.courseHeading}>
        Courses
      </Text>

      {courses.map((item) => (

        <CourseCard
          key={item.id}
          item={item}
          progress={progress?.percentage || 0}
          onPress={() =>
            navigation.navigate("Course", {
              slug: item.slug,
            })
          }
        />

      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    padding: 18,
    paddingTop: 55,
    paddingBottom: 40,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 6,
    marginBottom: 25,
  },

  progressCard: {
    backgroundColor: "#2563EB",
    borderRadius: 20,
    padding: 22,
    marginBottom: 28,
  },

  progressTitle: {
    color: "#fff",
    fontSize: 16,
  },

  progressPercent: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 8,
  },

  courseHeading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    color: "#111827",
  },

});