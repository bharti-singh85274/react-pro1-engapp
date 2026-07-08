import React from "react";
import { View, StyleSheet } from "react-native";

import Colors from "../../constants/colors";

type Props = {
  total: number;
  current: number;
};

export default function Paginator({
  total,
  current,
}: Props) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === current && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 5,
  },

  activeDot: {
    width: 28,
    backgroundColor: Colors.primary,
  },
});