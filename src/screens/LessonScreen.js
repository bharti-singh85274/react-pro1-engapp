import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { getLessonById } from "../api/lesson";

import Colors from "../constants/colors";
import Typography from "../constants/typography";
import Radius from "../constants/radius";

export default function LessonScreen({ route, navigation }) {
  const { lessonId } = route.params;

const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  const loadLesson = async () => {
    try {
      setLoading(true);

      const res = await getLessonById(lessonId);

        // console.log("Lesson API:", res);
        console.log("Lesson ID:", lessonId);
        console.log("Lesson Data:", res);

        setLesson(res);
    } catch (e) {
      console.log("LESSON ERROR:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLesson();
  }, []);

  // const handleComplete = async () => {
  //   try {
  //     await completeLesson(lessonId);
  //     setCompleted(true);

  //     Alert.alert("Completed 🎉", "Lesson completed successfully!", [
  //       {
  //         text: "OK",
  //         onPress: () => navigation.goBack(),
  //       },
  //     ]);
  //   } catch (e) {
  //     console.log(e);
  //     Alert.alert("Error", "Could not complete lesson");
  //   }
  // };


  const startQuiz=()=>{

    navigation.navigate("Quiz",{

    lessonId

    });

    };


    const formatLessonContent = (content) => {
  if (!content) return [];

  const headings = [
    "INTRODUCTION",
    "EXPLANATION",
    "EXAMPLES",
    "PRACTICE",
    "SUMMARY",
  ];

  const icons = {
    INTRODUCTION: "📘",
    EXPLANATION: "📖",
    EXAMPLES: "💬",
    PRACTICE: "✍️",
    SUMMARY: "✅",
  };

  let sections = [];

  let currentHeading = "";
  let currentContent = "";

  content.split("\n").forEach((line) => {
    const text = line.trim();

    if (headings.includes(text)) {
      if (currentHeading) {
        sections.push({
          heading: currentHeading,
          content: currentContent.trim(),
        });
      }

      currentHeading = text;
      currentContent = "";
    } else {
      currentContent += line + "\n";
    }
  });

  if (currentHeading) {
    sections.push({
      heading: currentHeading,
      content: currentContent.trim(),
    });
  }

  return sections.map((item) => ({
    ...item,
    icon: icons[item.heading],
  }));
};



  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        />
      </SafeAreaView>
    );
  }


if (!lesson) {
  return (
    <SafeAreaView style={styles.center}>
      <Text style={{ fontSize: 16 }}>
        Lesson not found
      </Text>
    </SafeAreaView>
  );
}

 return (
  <SafeAreaView style={styles.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={Colors.text}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Lesson Details
        </Text>

      </View>

      {/* Lesson Card */}

      <View style={styles.lessonCard}>

        <View style={styles.lessonIcon}>
          <Ionicons
            name="book"
            size={34}
            color="#fff"
          />
        </View>

        <Text style={styles.lessonTitle}>
          {lesson.title}
        </Text>

        <Text style={styles.lessonSubtitle}>
          Complete this lesson and test your knowledge with a short quiz.
        </Text>

      </View>


     {/* Overview */}

    <View style={styles.section}>

      <Text style={styles.sectionTitle}>
        Lesson Overview
      </Text>

      <View style={styles.statsGrid}>

        <View style={styles.statCard}>
          <Ionicons
            name="help-circle"
            size={28}
            color="#2563EB"
          />
          <Text style={styles.statValue}>
            {lesson.question_count}
          </Text>
          <Text style={styles.statLabel}>
            Questions
          </Text>
        </View>
        

        <View style={styles.statCard}>
          <Ionicons
            name="time"
            size={28}
            color="#10B981"
          />
          <Text style={styles.statValue}>
            {lesson.estimated_time} min
          </Text>
          <Text style={styles.statLabel}>
            Duration
          </Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons
            name="school"
            size={28}
            color="#F59E0B"
          />
          <Text style={styles.statValue}>
            {lesson.difficulty}
          </Text>
          <Text style={styles.statLabel}>
            Level
          </Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons
            name="trophy"
            size={28}
            color="#EF4444"
          />
          <Text style={styles.statValue}>
            {lesson.xp_reward}
          </Text>
          <Text style={styles.statLabel}>
            XP Reward
          </Text>
        </View>

      </View>

    </View>


     {/* Lesson Content */}

      <View style={styles.section}>

        <Text style={styles.sectionTitle}>
          📖 Lesson Content
        </Text>

        <View style={styles.contentCard}>

        {formatLessonContent(lesson.content).map(
            (section, index) => (

              <View
                key={index}
                style={styles.lessonSection}
              >

                <Text style={styles.lessonHeading}>
                  {section.icon} {section.heading}
                </Text>

                <Text style={styles.lessonContent}>
                  {section.content}
                </Text>

              </View>

            )
          )}

        </View>

      </View>



      {/* Quiz Tips */}

    <View style={styles.section}>

      <Text style={styles.sectionTitle}>
        💡 Quiz Tips
      </Text>

      <View style={styles.tipCard}>

        <View style={styles.tipRow}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color="#22C55E"
          />
          <Text style={styles.tipText}>
            Read every question carefully.
          </Text>
        </View>

        <View style={styles.tipRow}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color="#22C55E"
          />
          <Text style={styles.tipText}>
            There is no negative marking.
          </Text>
        </View>

        <View style={styles.tipRow}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color="#22C55E"
          />
          <Text style={styles.tipText}>
            Review your answers before submitting.
          </Text>
        </View>

        <View style={styles.tipRow}>
          <Ionicons
            name="checkmark-circle"
            size={20}
            color="#22C55E"
          />
          <Text style={styles.tipText}>
            Earn XP by completing the quiz.
          </Text>
        </View>

      </View>

    </View>


      {/* Start Quiz */}

      <TouchableOpacity
        style={styles.startButton}
        onPress={startQuiz}
        activeOpacity={0.8}
      >
        <Ionicons
          name="rocket"
          size={22}
          color="#FFFFFF"
        />

        <Text style={styles.startButtonText}>
          Start Quiz
        </Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        Complete the quiz to earn XP and improve your English skills.
      </Text>


      </ScrollView>
    </SafeAreaView>
  );

    }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
      },

    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    card: { backgroundColor: "#fff", padding: 20, borderRadius: 12 },
    title: { fontSize: 20, fontWeight: "bold" },
    content: { marginTop: 10, color: "#374151" },
  

    startButton: {
  marginTop: 30,
  backgroundColor: Colors.primary,
  borderRadius: 16,
  height: 58,

  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",

  elevation: 4,
},

startButtonText: {
  color: "#FFFFFF",
  fontSize: 18,
  fontWeight: "700",
  marginLeft: 10,
},

note: {
  textAlign: "center",
  marginTop: 15,
  marginBottom: 30,
  color: "#777",
  fontSize: 14,
},

    scrollContent: {
  padding: 20,
},

header: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 25,
},

backButton: {
  width: 42,
  height: 42,
  borderRadius: 21,
  backgroundColor: "#FFFFFF",
  justifyContent: "center",
  alignItems: "center",
  elevation: 3,
},

headerTitle: {
  fontSize: 22,
  fontWeight: "700",
  marginLeft: 15,
  color: Colors.text,
},

lessonCard: {
  backgroundColor: "#FFFFFF",
  borderRadius: 18,
  padding: 22,
  alignItems: "center",
  elevation: 4,
},

lessonIcon: {
  width: 70,
  height: 70,
  borderRadius: 35,
  backgroundColor: Colors.primary,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 15,
},

lessonTitle: {
  fontSize: 24,
  fontWeight: "700",
  color: Colors.text,
  textAlign: "center",
},



lessonSubtitle: {
  fontSize: 15,
  color: "#666",
  textAlign: "center",
  marginTop: 10,
  lineHeight: 24,
  paddingHorizontal: 10,
},


section: {
  marginTop: 25,
},

sectionTitle: {
  fontSize: 20,
  fontWeight: "700",
  color: Colors.text,
  marginBottom: 15,
},

statsGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
},

statCard: {
  width: "48%",
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  paddingVertical: 22,
  alignItems: "center",
  marginBottom: 15,
  elevation: 3,
},

statValue: {
  fontSize: 18,
  fontWeight: "700",
  marginTop: 10,
  color: Colors.text,
},

statLabel: {
  marginTop: 6,
  color: "#666",
  fontSize: 13,
},


contentCard: {
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  padding: 18,
  elevation: 3,
},

lessonContent: {
  fontSize: 15,
  color: "#444",
  lineHeight: 26,
},


tipCard: {
  backgroundColor: "#FFF9E6",
  borderRadius: 16,
  padding: 18,
  borderLeftWidth: 5,
  borderLeftColor: "#F4B400",
},

tipRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 14,
},

tipText: {
  marginLeft: 10,
  flex: 1,
  fontSize: 15,
  color: "#444",
},


lessonSection: {
  marginBottom: 25,
},

lessonHeading: {
  fontSize: 18,
  fontWeight: "700",
  color: Colors.primary,
  marginBottom: 10,
},

lessonContent: {
  fontSize: 15,
  color: "#444",
  lineHeight: 26,
},



  });