import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Colors from "../../constants/colors";

type Props = {
  progress: number;
};

export default function ProgressCard({
  progress,
}: Props) {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Overall Learning Progress
      </Text>

      <View style={styles.progressBackground}>

        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
            },
          ]}
        />

      </View>

      <Text style={styles.percent}>
        {progress}% Completed
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {

    backgroundColor: Colors.white,

    borderRadius: 18,

    padding: 20,

    marginBottom: 20,

    elevation: 2,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 6,

    shadowOffset: {
      width: 0,
      height: 3,
    },

  },

  title: {

    fontSize: 18,

    fontWeight: "700",

    color: Colors.text,

    marginBottom: 15,

  },

  progressBackground: {

    height: 12,

    backgroundColor: "#E5E7EB",

    borderRadius: 10,

    overflow: "hidden",

  },

  progressFill: {

    height: 12,

    backgroundColor: Colors.primary,

    borderRadius: 10,

  },

  percent: {

    marginTop: 12,

    textAlign: "right",

    fontSize: 14,

    color: Colors.subText,

    fontWeight: "600",

  },

});