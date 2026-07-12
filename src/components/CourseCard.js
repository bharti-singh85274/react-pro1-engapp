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




const progressData = item.progress ?? progress ?? {};

const percentage =
    typeof progressData === "number"
      ? progressData
      : progressData.percentage ??
        progressData.progress_percentage ??
        progressData.progress ??
        item.progress_percentage ??
        item.percentage ??
        0;


const completedLessons =
    progressData.completed_lessons ??
    item.completed_lessons ??
    0;

const totalLessons =
    progressData.total_lessons ??
    item.total_lessons ??
    item.lessons_count ??
    0;

const status =
    progressData.status ??
    item.status ??
    "not_started";

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "#16A34A";
      case "in_progress":
        return "#2563EB";
      default:
        return "#9CA3AF";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_progress":
        return "In Progress";
      default:
        return "Not Started";
    }
  };

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
            {item.reason}
            </Text>

        </View>

      

      </View>

      {/* Progress */}

      <View style={{ marginTop: 18 }}>

        <ProgressBar progress={percentage} />

      </View>

      <View style={styles.progressRow}>

        <Text style={styles.progressText}>
          {completedLessons} / {totalLessons} Lessons
        </Text>

        <Text style={styles.progressPercent}>
          {percentage}%
        </Text>

      </View>

      <View style={styles.statusContainer}>

        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: getStatusColor(),
            },
          ]}
        >
          <Text style={styles.statusText}>
            {getStatusText()}
          </Text>
        </View>

      </View>

    <View style={styles.footer}>

      <Text style={styles.footerText}>
      📘 {completedLessons}/{totalLessons} Lessons
      </Text>

      <Text style={styles.footerText}>
      {getStatusText()}
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

  progressRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progressText: {
    color: "#4B5563",
    fontSize: 13,
  },

  progressPercent: {
    fontWeight: "700",
    color: "#2563EB",
  },

  statusContainer: {
    marginTop: 12,
    alignItems: "flex-start",
  },

  statusBadge: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
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