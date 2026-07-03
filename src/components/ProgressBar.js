import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProgressBar({ progress = 0 }) {
  return (
    <View style={styles.container}>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${progress}%` }]} />
      </View>

      <Text style={styles.text}>{progress}% completed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  barBackground: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
    overflow: "hidden",
  },
  barFill: {
    height: 8,
    backgroundColor: "#2563EB",
    borderRadius: 20,
  },
  text: {
    fontSize: 12,
    marginTop: 5,
    color: "#6B7280",
  },
});