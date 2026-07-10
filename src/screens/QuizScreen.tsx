import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

import { getQuiz, submitQuiz } from "../api/quiz";

export default function QuizScreen({ route, navigation }) {
  const { lessonId } = route.params;

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // {questionId: option}

  // ---------------- LOAD QUIZ ----------------
  const loadQuiz = async () => {
    try {
      setLoading(true);
      const res = await getQuiz(lessonId);
      
      console.log("QUIZ DATA:", res);
      setQuestions(res?.data || []);
    } catch (e) {
      console.log("QUIZ LOAD ERROR:", e);
      Alert.alert("Error", "Failed to load quiz");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  // ---------------- SELECT ANSWER ----------------
  const selectAnswer = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  // ---------------- SUBMIT QUIZ ----------------
  const submit = async () => {

    console.log("Submitting lesson:", lessonId);
    try {
      if (Object.keys(answers).length === 0) {
        Alert.alert("Error", "Please answer at least one question");
        return;
      }

      // const res = await submitQuiz(lessonId, answers);

      // navigation.replace("QuizResult", {
      //   result: res,
      // });
      const res = await submitQuiz(lessonId, answers);

      console.log("QUIZ SUBMIT RESPONSE:", res);

      navigation.replace("QuizResult", {
        result: res,
      });

    } catch (e) {
      console.log("SUBMIT ERROR:", e);
      Alert.alert("Error", "Quiz submission failed");
    }
  };

  // ---------------- LOADING ----------------
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Quiz</Text>

      {questions.map((q, index) => (
        <View key={q.id} style={styles.card}>
          <Text style={styles.question}>
            {index + 1}. {q.question}
          </Text>

          {/* {q.options.map((opt, i) => { */}

          {(typeof q.options === "string"
    ? JSON.parse(q.options)
    : q.options
).map((opt, i) => {
            const selected = answers[q.id] === opt;

            return (
              <TouchableOpacity
                key={i}
                onPress={() => selectAnswer(q.id, opt)}
                style={[
                  styles.option,
                  selected && styles.selectedOption,
                ]}
              >
                <Text
                  style={{
                    color: selected ? "#fff" : "#111",
                  }}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>Submit Quiz</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
    padding: 15,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  option: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  button: {
    backgroundColor: "#16A34A",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});