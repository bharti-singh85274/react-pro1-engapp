import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

type Props = {
  xp: number;
  streak: number;
  lessons: number;
  courses: number;
};

export default function StatsCard({
  xp,
  streak,
  lessons,
  courses,
}: Props) {
  return (
    <View style={styles.container}>

      {/* Row 1 */}

      <View style={styles.row}>

        <View style={styles.card}>
          <Ionicons
            name="star"
            size={24}
            color="#F59E0B"
          />

          <Text style={styles.value}>
            {xp}
          </Text>

          <Text style={styles.label}>
            XP
          </Text>
        </View>

        <View style={styles.card}>
          <Ionicons
            name="flame"
            size={24}
            color="#EF4444"
          />

          <Text style={styles.value}>
            {streak}
          </Text>

          <Text style={styles.label}>
            Day Streak
          </Text>
        </View>

      </View>

      {/* Row 2 */}

      <View style={styles.row}>

        <View style={styles.card}>
          <Ionicons
            name="book"
            size={24}
            color={Colors.primary}
          />

          <Text style={styles.value}>
            {lessons}
          </Text>

          <Text style={styles.label}>
            Lessons
          </Text>
        </View>

        <View style={styles.card}>
          <Ionicons
            name="school"
            size={24}
            color="#22C55E"
          />

          <Text style={styles.value}>
            {courses}
          </Text>

          <Text style={styles.label}>
            Courses
          </Text>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  card: {

    width: "48%",

    backgroundColor: Colors.white,

    borderRadius: 18,

    paddingVertical: 22,

    alignItems: "center",

    elevation: 2,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 6,

    shadowOffset: {
      width: 0,
      height: 3,
    },

  },

  value: {

    fontSize: 22,

    fontWeight: "700",

    color: Colors.text,

    marginTop: 10,

  },

  label: {

    marginTop: 5,

    fontSize: 14,

    color: Colors.subText,

  },

});