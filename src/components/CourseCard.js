import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function CourseCard({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>

      <Text style={styles.title}>
        📘 {item.title}
      </Text>

      <Text style={styles.desc}>
        {item.description}
      </Text>

      <View style={styles.button}>
        <Text style={styles.buttonText}>
          ▶ Start Course
        </Text>
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },

  desc: {
    marginTop: 6,
    color: "#6B7280",
  },

  button: {
    marginTop: 12,
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});