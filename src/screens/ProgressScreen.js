import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { getProgress } from "../api/progress";

export default function ProgressScreen() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const res = await getProgress();
      setProgress(res);
    } catch (err) {
      console.log("Progress error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        📊 Progress
      </Text>

      {progress && (
        <>
          <Text>Total Lessons: {progress.total_lessons}</Text>
          <Text>Completed: {progress.completed_lessons}</Text>
          <Text>Progress: {progress.percentage}%</Text>
        </>
      )}
    </View>
  );
}