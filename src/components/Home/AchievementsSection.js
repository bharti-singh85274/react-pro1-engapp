import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AchievementsSection({ achievements = [] }) {
  if (!achievements.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🏆 Achievements</Text>

      {achievements.map((item) => (
        <View key={item.key} style={styles.card}>
          <View style={styles.left}>
            <Text style={styles.icon}>
              {item.completed ? "✅" : "⭐"}
            </Text>

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.description}>
                {item.description}
              </Text>
            </View>
          </View>

          <Text
            style={[
              styles.status,
              {
                color: item.completed
                  ? "#16A34A"
                  : "#9CA3AF",
              },
            ]}
          >
            {item.completed ? "Completed" : "Locked"}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },

  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
    color: "#111827",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },

  left: {
    flexDirection: "row",
    flex: 1,
  },

  icon: {
    fontSize: 24,
    marginRight: 12,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  description: {
    marginTop: 4,
    color: "#6B7280",
    fontSize: 13,
  },

  status: {
    fontWeight: "700",
    fontSize: 12,
  },
});