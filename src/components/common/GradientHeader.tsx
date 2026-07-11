import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/colors";

export default function GradientHeader({
  title,
  subtitle,
  icon,
}) {
  return (
    <LinearGradient
      colors={[Colors.primary, "#5B8CFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.iconCircle}>
        <Ionicons
          name={icon}
          size={42}
          color="#fff"
        />
      </View>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: {
    borderRadius: 28,
    paddingVertical: 35,
    alignItems: "center",
    marginBottom: 25,
  },

  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 8,
    color: "#EEF3FF",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 25,
  },

});