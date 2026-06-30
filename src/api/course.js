import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://127.0.0.1:8000/api";

/**
 * GET ALL COURSES
 */
export const getCourses = async () => {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/courses`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.json();
};

/**
 * GET SINGLE COURSE
 */
export const getCourseById = async (id) => {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/courses/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.json();
};