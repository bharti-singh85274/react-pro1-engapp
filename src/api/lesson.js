import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://127.0.0.1:8000/api";

export const getLessons = async (courseId) => {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/courses/${courseId}/lessons`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  return response.json();
};