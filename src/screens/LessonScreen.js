import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

// import { getLessonById } from "../api/course";
import { getLessonById } from "../api/lesson";
import { completeLesson } from "../api/progress";

export default function LessonScreen({ route, navigation }) {
  const { lessonId } = route.params;

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  const loadLesson = async () => {
    try {
      setLoading(true);

      // const res = await getLessonById(lessonId);
      // const data = res?.data || res;

      // setLesson(data);

      const res = await getLessonById(lessonId);

        console.log("Lesson API:", res);

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


  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!lesson) {
    return (
      <View style={styles.center}>
        <Text>Lesson not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.content}>{lesson.content}</Text>
      </View>



      {/* <TouchableOpacity
    style={styles.button}
    onPress={() =>
        navigation.navigate("Quiz", {
            lessonId,
        })
    }
>
    <Text style={styles.buttonText}>
        Start Quiz
    </Text>
</TouchableOpacity> */}


<TouchableOpacity

onPress={startQuiz}

style={styles.button}

>

<Text style={styles.buttonText}>

Take Quiz

</Text>

</TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F8FC", padding: 15 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 12 },
  title: { fontSize: 20, fontWeight: "bold" },
  content: { marginTop: 10, color: "#374151" },
  button: {
    marginTop: 20,
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});