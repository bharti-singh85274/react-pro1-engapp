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
import { logout } from "../api/auth";

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

//  const loadData = async () => {
//   setLoading(true);

//   try {
//     console.log("Loading courses...");
//     const courseRes = await getCourses();
//     console.log("COURSES:", courseRes);
//     setCourses(courseRes.data || []);
//   } catch (e) {
//     console.log("COURSES ERROR:", e.response?.data || e.message);
//   }

//   try {
//     console.log("Loading progress...");
//     const progressRes = await getProgress();
//     console.log("PROGRESS:", progressRes);
//     setProgress(progressRes);
//   } catch (e) {
//     console.log("PROGRESS ERROR:", e.response?.data || e.message);
//   }

//   try {
//     console.log("Loading continue...");
//     const continueRes = await getContinueLearning();
//     console.log("CONTINUE:", continueRes);
//     setContinueLearning(continueRes.data);
//   } catch (e) {
//     console.log("CONTINUE ERROR:", e.response?.data || e.message);
//   }

//   setLoading(false);
// };
const loadData = async () => {
  try {
    const courseRes = await getCourses();
    setCourses(courseRes.data || []);
  } catch (e) {
    console.log(e);
  }

  setProgress({ percentage: 0 });
  setContinueLearning(null);
  setLoading(false);
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


      <View
  style={{
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  }}
>
  <TouchableOpacity
    onPress={handleLogout}
    style={{
      backgroundColor: "#EF4444",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    }}
  >
    <Text
      style={{
        color: "#FFFFFF",
        fontWeight: "bold",
      }}
    >
      Logout
    </Text>
  </TouchableOpacity>
</View>

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

        // <CourseCard
        //   key={item.id}
        //   item={item}
        //   // progress={progress?.percentage || 0}
        //   progress={item.progress}
        //   onPress={() =>
        //     navigation.navigate("Course", {
        //       slug: item.slug,
        //     })
        //   }
        // />

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