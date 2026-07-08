import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "../constants/colors";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const initialize = async () => {
      try {
        const onboarding = await AsyncStorage.getItem(
          "onboarding_completed"
        );

        const token = await AsyncStorage.getItem("token");

        setTimeout(() => {
          // First time user
          if (!onboarding) {
            navigation.reset({
              index: 0,
              routes: [{ name: "Onboarding" }],
            });
            return;
          }

          // Already logged in
          if (token && token !== "null" && token !== "undefined") {
            navigation.reset({
              index: 0,
              routes: [{ name: "MainTabs" }],
            });
            return;
          }

          // Login required
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }, 2000);
      } catch (error) {
        console.log(error);

        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    };

    initialize();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>
        SpeakMaster
      </Text>

      <Text style={styles.subtitle}>
        Learn English With Confidence
      </Text>

      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={{ marginTop: 35 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  logo: {
    width: 170,
    height: 170,
    resizeMode: "contain",
  },

  title: {
    marginTop: 25,
    fontSize: 34,
    fontWeight: "bold",
    color: Colors.primary,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#6B7280",
  },
});