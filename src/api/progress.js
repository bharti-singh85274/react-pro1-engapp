import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://127.0.0.1:8000/api";

export const completeLesson = async (lessonId) => {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/lesson/complete`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lesson_id: lessonId,
    }),
  });

  return response.json();
};

export const getProgress = async () => {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/progress`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.json();
};