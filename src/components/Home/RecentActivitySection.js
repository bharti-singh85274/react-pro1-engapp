import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function RecentActivitySection({ activities = [] }) {
  if (!activities.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        📋 Recent Activity
      </Text>

      {activities.map((item, index) => (
        <View key={index} style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.description}>
              {item.description}
            </Text>
          </View>

          <View style={styles.right}>
            <Text style={styles.xp}>
              +{item.xp} XP
            </Text>

            <Text style={styles.time}>
              {item.time}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 30,
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

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  description: {
    marginTop: 4,
    color: "#6B7280",
  },

  right: {
    alignItems: "flex-end",
  },

  xp: {
    color: "#F59E0B",
    fontWeight: "700",
  },

  time: {
    marginTop: 4,
    fontSize: 12,
    color: "#9CA3AF",
  },
});