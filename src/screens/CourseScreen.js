import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import CourseHeader from "../components/course/CourseHeader";
import CourseStats from "../components/course/CourseStats";

import { getCourseBySlug } from "../api/course";
import LessonCard from "../components/course/LessonCard";

export default function CourseScreen({ route, navigation }) {
  const { slug } = route.params;

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);


  // const loadCourse = async () => {
  //   try {
  //     setLoading(true);

  //     const courseRes = await getCourseBySlug(slug);
  //     const progressRes = await getProgress();

  //     const data = courseRes?.data || courseRes;

  //     setCourse(data);
  //     setLessons(data?.lessons || []);

  //     setProgress(progressRes?.data || progressRes);

  //   } catch (e) {
  //     console.log("COURSE ERROR:", e);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const loadCourse = async () => {
  try {

    setLoading(true);

    const response = await getCourseBySlug(slug);

    const data = response.data;

    setCourse(data);

    setLessons(data.lessons || []);

  } catch (e) {

    console.log(e);

  } finally {

    setLoading(false);

  }
};


  useFocusEffect(
    useCallback(() => {
      loadCourse();
    }, [slug])
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!course) {
    return (
      <View style={styles.center}>
        <Text>Course not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
  
      <CourseHeader course={course} />
      <CourseStats course={course} />

      <Text style={styles.sectionTitle}>Lessons</Text>

      {/* {lessons.map((l, index) => {
        const isCompleted =
          progress?.completed_lessons?.includes(l.id);

        return (
          <TouchableOpacity
            key={l.id}
            style={styles.lessonCard}
            onPress={() =>
              navigation.navigate("Lesson", {
                lessonId: l.id,
              })
            }
          >
            <Text style={styles.lessonTitle}>
              {index + 1}. {l.title}
            </Text>

            <Text style={{ color: isCompleted ? "green" : "#6B7280" }}>
              {isCompleted ? "✔ Completed" : "▶ Start"}
            </Text>
          </TouchableOpacity>
        );
      })} */}

      {lessons.map((lesson, index) => {

  const previousLesson =
    index === 0 ? null : lessons[index - 1];

  const isLocked =
    index > 0 && !previousLesson.completed;

  return (

    <LessonCard
      key={lesson.id}
      lesson={lesson}
      index={index}
      isLocked={isLocked}
      onPress={() =>
        navigation.navigate("Lesson", {
          lessonId: lesson.id,
        })
      }
    />

  );

})}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FB" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", padding: 15 },
  lessonCard: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginTop: 10,
    padding: 15,
    borderRadius: 12,
  },
  lessonTitle: { fontSize: 16, fontWeight: "600" },
});