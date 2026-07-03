import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function QuizResultScreen({ route, navigation }) {
  const { result } = route.params;

  const quiz = result?.quiz;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Result 🎉</Text>

      <View style={styles.card}>
        <Text>Score: {quiz.score}</Text>
        <Text>Total: {quiz.total}</Text>
        <Text>Wrong: {quiz.wrong}</Text>
        <Text>Percentage: {quiz.percentage}%</Text>
        <Text>XP Earned: {quiz.xp}</Text>

        <Text style={{ marginTop: 10, fontWeight: "bold" }}>
          {quiz.passed ? "Passed ✔" : "Try Again ❌"}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5F7FB",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});