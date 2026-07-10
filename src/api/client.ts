import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearStorage } from "../utils/storage";


const client = axios.create({
  baseURL: "http://192.168.1.18:8000/api",
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});



client.interceptors.response.use(

(response) => response,

async(error) => {

    if(error.response?.status === 401){

        console.log(
            "TOKEN EXPIRED OR INVALID"
        );

        await clearStorage();

    }

    return Promise.reject(error);

}

);


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