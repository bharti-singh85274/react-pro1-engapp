import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function LessonCard({
  lesson,
  index,
  isLocked,
  onPress,
}) {
  const completed = lesson.completed;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      disabled={isLocked}
      onPress={onPress}
      style={[
        styles.card,
        isLocked && styles.lockedCard,
      ]}
    >
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>
            {index + 1}. {lesson.title}
          </Text>

          <Text style={styles.subtitle}>
            {completed
              ? "Completed"
              : isLocked
              ? "Locked"
              : "Tap to Start"}
          </Text>
        </View>

        <Text style={styles.icon}>
          {completed ? "✅" : isLocked ? "🔒" : "▶️"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 18,
    borderRadius: 14,
    elevation: 3,
  },

  lockedCard: {
    opacity: 0.6,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    marginTop: 6,
    color: "#6B7280",
  },

  icon: {
    fontSize: 26,
  },

});