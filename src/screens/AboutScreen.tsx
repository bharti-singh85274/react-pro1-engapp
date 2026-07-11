import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

import Colors from "../constants/colors";
import GradientHeader from "../components/common/GradientHeader";
import InfoCard from "../components/common/InfoCard";

export default function AboutScreen() {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <GradientHeader
        title="English Speaking App"
        subtitle="Learn English confidently with interactive lessons, quizzes and daily practice."
        icon="school"
      />

      <Text style={styles.sectionTitle}>
        App Features
      </Text>

      <InfoCard
        icon="book"
        title="Grammar Lessons"
        description="Master English grammar with easy-to-understand lessons and examples."
        color="#3563E9"
      />

      <InfoCard
        icon="chatbubbles"
        title="Speaking Practice"
        description="Practice real-life conversations and improve your communication skills."
        color="#00B894"
      />

      <InfoCard
        icon="library"
        title="Vocabulary Builder"
        description="Expand your vocabulary with useful words, meanings and examples."
        color="#9B59B6"
      />

      <InfoCard
        icon="trophy"
        title="Quiz Practice"
        description="Test your knowledge, earn XP and track your learning progress."
        color="#F39C12"
      />

      <InfoCard
        icon="stats-chart"
        title="Progress Tracking"
        description="Monitor completed lessons, quizzes and overall learning achievements."
        color="#E74C3C"
      />

      <Text style={styles.sectionTitle}>
        App Information
      </Text>

      <InfoCard
        icon="phone-portrait"
        title="Version"
        description="Version 1.0.0"
      />

      <InfoCard
        icon="code-slash"
        title="Technology"
        description="Built using React Native (Expo) with Laravel REST API."
      />

      <InfoCard
        icon="heart"
        title="Our Mission"
        description="To make English learning simple, engaging and accessible for everyone."
        color="#FF5A7A"
      />

      <Text style={styles.footer}>
        © 2026 English Speaking App
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 16,
    marginTop: 10,
  },

  footer: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
    color: "#777",
    fontSize: 15,
  },

});