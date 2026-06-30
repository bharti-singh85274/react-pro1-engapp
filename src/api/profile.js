import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://127.0.0.1:8000/api";

/**
 * GET PROFILE
 */
export const getProfile = async () => {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response.json();
};

/**
 * UPDATE PROFILE
 */
export const updateProfile = async (name, email) => {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
    }),
  });

  return response.json();
};