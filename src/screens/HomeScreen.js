import React, { useState, useCallback } from "react";
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getCourses } from "../api/course";
import { getProgress } from "../api/progress";
import { getContinueLearning } from "../api/home";
import CourseCard from "../components/CourseCard";
import ContinueLearningCard from "../components/Home/ContinueLearningCard";

export default function HomeScreen({ navigation }) {
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState(null);
  const [continueLearning, setContinueLearning] = useState(null);
  const [loading, setLoading] = useState(true);


  const handleLogout = async () => {
  try {
    await logout();
  } catch (e) {
    // Ignore API error if token is already invalid.
  }

  navigation.reset({
    index: 0,
    routes: [{ name: "Login" }],
  });
};


const loadData = async () => {
  try {

    setLoading(true);

    const courseRes = await getCourses();

    const progressRes = await getProgress();

    const continueRes = await getContinueLearning();

    // console.log("COURSES", courseRes);
    console.log(
      "COURSES API RESPONSE",
      JSON.stringify(courseRes, null, 2)
    );


    // console.log("PROGRESS", progressRes);
    console.log(
      "PROGRESS API RESPONSE",
      JSON.stringify(progressRes, null, 2)
    );


    //console.log("CONTINUE", continueRes);
    console.log(
      "CONTINUE API RESPONSE",
      JSON.stringify(continueRes, null, 2)
    );

    setCourses(courseRes.data || []);

    setProgress(progressRes);

    setContinueLearning(continueRes.data);

  } catch (e) {

    console.log("HOME ERROR", e);

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


        <ContinueLearningCard
          course={continueLearning?.course}
          lesson={
              continueLearning?.next_lesson ||
              continueLearning?.current_lesson
          }
          progress={continueLearning?.progress}
          navigation={navigation}
      />

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
            progress={item.progress}
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