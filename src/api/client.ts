import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const client = axios.create({
  baseURL: "http://192.168.1.20:8000/api",
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});


client.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem("token");

    console.log("TOKEN:", token);
    console.log("REQUEST:", config.url);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("AUTH HEADER:", config.headers.Authorization);
    } else {
      console.log("NO TOKEN FOUND");
    }

    return config;
  },
  error => Promise.reject(error)
);

export default client;