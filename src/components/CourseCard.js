import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import ProgressBar from "./ProgressBar";

export default function CourseCard({
  item,
  progress,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >

      <View style={styles.row}>

        <View style={{ flex: 1 }}>

          <Text style={styles.title}>
            {item.title}
          </Text>

          <Text style={styles.desc}>
            {item.short_description}
          </Text>

        </View>

        <View
          style={[
            styles.level,
            {
              backgroundColor: item.theme_color,
            },
          ]}
        >
          <Text style={styles.levelText}>
            {item.level}
          </Text>
        </View>

      </View>

      <View style={{ marginTop: 15 }}>
        <ProgressBar progress={progress} />
      </View>

      <View style={styles.footer}>

        <Text style={styles.footerText}>
          📚 {item.lessons_count} Lessons
        </Text>

        <Text style={styles.footerText}>
          ⭐ {item.rating}
        </Text>

        <Text style={styles.footerText}>
          🎁 {item.xp_reward} XP
        </Text>

      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 19,
    fontWeight: "700",
    color: "#111827",
  },

  desc: {
    marginTop: 6,
    color: "#6B7280",
    lineHeight: 20,
  },

  level: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: "flex-start",
  },

  levelText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },

  footerText: {
    fontSize: 13,
    color: "#4B5563",
  },

});