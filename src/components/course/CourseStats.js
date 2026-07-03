import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function CourseStats({ course }) {
  return (
    <View style={styles.container}>

      <View style={styles.row}>

        <View style={styles.item}>
          <Text style={styles.icon}>⭐</Text>
          <Text style={styles.value}>{course.rating}</Text>
          <Text style={styles.label}>Rating</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.icon}>👥</Text>
          <Text style={styles.value}>
            {course.students_count}
          </Text>
          <Text style={styles.label}>Students</Text>
        </View>

      </View>

      <View style={styles.row}>

        <View style={styles.item}>
          <Text style={styles.icon}>⏱</Text>
          <Text style={styles.value}>
            {course.duration}
          </Text>
          <Text style={styles.label}>Duration</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.icon}>🎁</Text>
          <Text style={styles.value}>
            {course.xp_reward}
          </Text>
          <Text style={styles.label}>XP Reward</Text>
        </View>

      </View>

      <View style={styles.levelContainer}>
        <Text style={styles.levelText}>
          {course.level}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  item: {
    width: "45%",
    alignItems: "center",
  },

  icon: {
    fontSize: 24,
  },

  value: {
    marginTop: 6,
    fontWeight: "700",
    fontSize: 17,
    color: "#111827",
  },

  label: {
    marginTop: 4,
    color: "#6B7280",
    fontSize: 13,
  },

  levelContainer: {
    alignSelf: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 25,
  },

  levelText: {
    color: "#fff",
    fontWeight: "700",
  },

});