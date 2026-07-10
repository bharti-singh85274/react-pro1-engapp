import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { getProgress } from "../api/progress";
import ProgressBar from "../components/ProgressBar";

export default function ProgressScreen() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const res = await getProgress();

      setProgress(res);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#2563EB"
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        📊 My Progress
      </Text>

      <View style={styles.card}>

        <Text style={styles.heading}>
          Overall Progress
        </Text>

      <ProgressBar
    progress={progress?.percentage ?? 0}
/>

        <Text style={styles.percent}>
          {progress?.percentage}%
        </Text>

      </View>

      <View style={styles.stats}>

        <View style={styles.box}>
          <Text style={styles.value}>
            {progress?.completed_count}
          </Text>

          <Text style={styles.label}>
            Completed
          </Text>
        </View>

        <View style={styles.box}>
          <Text style={styles.value}>
            {progress?.total_lessons}
          </Text>

          <Text style={styles.label}>
            Lessons
          </Text>
        </View>

      </View>

      <View style={styles.xpCard}>

        <Text style={styles.xpTitle}>
          ⭐ Total XP
        </Text>

        <Text style={styles.xp}>
          {progress?.xp}
        </Text>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FC",
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
    elevation: 3,
  },

  heading: {
    fontWeight: "bold",
    fontSize: 18,
  },

  percent: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "bold",
    color: "#2563EB",
  },

  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  box: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 18,
    alignItems: "center",
    elevation: 3,
  },

  value: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2563EB",
  },

  label: {
    marginTop: 8,
    color: "#6B7280",
  },

  xpCard: {
    backgroundColor: "#2563EB",
    padding: 25,
    borderRadius: 18,
  },

  xpTitle: {
    color: "#DBEAFE",
    fontSize: 16,
  },

  xp: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "bold",
    marginTop: 10,
  },
});