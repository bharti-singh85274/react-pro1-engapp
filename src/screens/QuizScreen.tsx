import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { getQuiz, submitQuiz } from "../api/quiz";
import Colors from "../constants/colors";

export default function QuizScreen({ route, navigation }) {
  const { lessonId } = route.params;

const [loading, setLoading] = useState(true);

const [questions, setQuestions] = useState([]);

const [answers, setAnswers] = useState({});

const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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


  const currentQuestion = questions[currentQuestionIndex];



  // ---------------- SELECT ANSWER ----------------
  const selectAnswer = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };



 const confirmExitQuiz = () => {
  navigation.goBack();
};


const nextQuestion = () => {

  if (!currentQuestion) return;

  if (!answers[currentQuestion.id]) {
    Alert.alert(
      "Select an answer",
      "Please select an option before continuing."
    );
    return;
  }

  if (currentQuestionIndex < questions.length - 1) {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }
};

const previousQuestion = () => {

  if (currentQuestionIndex > 0) {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  }

};


  // ---------------- SUBMIT QUIZ ----------------
  const submit = async () => {

    console.log("Submitting lesson:", lessonId);
    try {
      if (Object.keys(answers).length === 0) {
        Alert.alert("Error", "Please answer at least one question");
        return;
      }

      const res = await submitQuiz(lessonId, answers);

      console.log("QUIZ SUBMIT RESPONSE:", res);

      // navigation.replace("QuizResult", {
      //   result: res,
      // });
      
      navigation.navigate("QuizResult", {
      result: res,
      lessonId: lessonId,
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
  <SafeAreaView style={styles.container}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >

    <View style={styles.header}>

        <TouchableOpacity
          style={styles.closeButton}
          onPress={confirmExitQuiz}
        >
          <Ionicons
            name="close"
            size={24}
            color={Colors.text}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Quiz
        </Text>

        <View style={{ width: 40 }} />

      </View>

    
     
     {currentQuestion && (

  <View style={styles.card}>

    <Text style={styles.questionCount}>
      Question {currentQuestionIndex + 1} of {questions.length}
    </Text>

    <Text style={styles.question}>
      {currentQuestion.question}
    </Text>

    {(typeof currentQuestion.options === "string"
      ? JSON.parse(currentQuestion.options)
      : currentQuestion.options
    ).map((opt, index) => {

      const selected =
        answers[currentQuestion.id] === opt;

      return (

        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selected && styles.selectedOption,
          ]}
          onPress={() =>
            selectAnswer(currentQuestion.id, opt)
          }
        >

          <Text
            style={[
              styles.optionText,
              selected && styles.selectedOptionText,
            ]}
          >
            {String.fromCharCode(65 + index)}. {opt}
          </Text>

        </TouchableOpacity>

      );

    })}

  </View>

)}


    <View style={styles.navigationContainer}>

        {currentQuestionIndex > 0 ? (
          <TouchableOpacity
            style={[styles.navButton, styles.previousButton]}
            onPress={previousQuestion}
          >
            <Ionicons
              name="arrow-back"
              size={20}
              color="#FFFFFF"
            />
            <Text style={styles.navButtonText}>
              Previous
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={{ flex: 1 }} />
        )}

        {currentQuestionIndex === questions.length - 1 ? (

          <TouchableOpacity
            style={[styles.navButton, styles.finishButton]}
            onPress={submit}
          >
            <Text style={styles.navButtonText}>
              Finish Quiz
            </Text>

            <Ionicons
              name="checkmark-circle"
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>

        ) : (

          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={nextQuestion}
          >
            <Text style={styles.navButtonText}>
              Next
            </Text>

            <Ionicons
              name="arrow-forward"
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>

        )}

      </View>



    </ScrollView>
  </SafeAreaView>
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

 
  scrollContent: {
  padding: 20,
},

header: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 25,
},

closeButton: {
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
  color: Colors.text,
},


questionCount: {
  fontSize: 15,
  color: "#666",
  marginBottom: 12,
  fontWeight: "600",
},

optionText: {
  fontSize: 16,
  color: "#222",
  fontWeight: "600",
},

selectedOptionText: {
  color: "#FFFFFF",
},


navigationContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: 25,
  marginBottom: 30,
},

navButton: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderRadius: 12,
  minWidth: 140,
},

previousButton: {
  backgroundColor: "#6B7280",
},

nextButton: {
  backgroundColor: Colors.primary,
},

finishButton: {
  backgroundColor: "#16A34A",
},

navButtonText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "700",
  marginHorizontal: 6,
},


});