import React from "react";
import { View, StyleSheet } from "react-native";

interface Props {
  progress: number; // 0 - 100
  color?: string;
}

const ProgressBar = ({ progress, color = "#4F46E5" }: Props) => {
  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: `${progress}%`, backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 6,
    width: "100%",
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 10,
  },
});

export default ProgressBar;