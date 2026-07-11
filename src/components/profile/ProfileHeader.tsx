import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/colors";

type Props = {
  name: string;
  email: string;
};

export default function ProfileHeader({
  name,
  email,
}: Props) {
  return (
    <View style={styles.container}>

      <View style={styles.avatarContainer}>
        <Ionicons
          name="person"
          size={55}
          color={Colors.white}
        />
      </View>

      <Text style={styles.name}>
        {name}
      </Text>

      <Text style={styles.email}>
        {email}
      </Text>

      <View style={styles.levelContainer}>
        <Ionicons
          name="school"
          size={18}
          color="#FACC15"
        />

        <Text style={styles.levelText}>
          English Learner
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {

    backgroundColor: Colors.primary,

    borderRadius: 24,

    paddingVertical: 28,

    alignItems: "center",

    marginBottom: 20,

    elevation: 4,

  },

  avatarContainer: {

    width: 90,

    height: 90,

    borderRadius: 45,

    backgroundColor: "rgba(255,255,255,0.20)",

    justifyContent: "center",

    alignItems: "center",

    marginBottom: 15,

  },

  name: {

    fontSize: 22,

    fontWeight: "700",

    color: Colors.white,

  },

  email: {

    marginTop: 6,

    color: "#E5E7EB",

    fontSize: 15,

  },

  levelContainer: {

    flexDirection: "row",

    alignItems: "center",

    marginTop: 15,

    backgroundColor: "rgba(255,255,255,0.15)",

    paddingHorizontal: 15,

    paddingVertical: 8,

    borderRadius: 20,

  },

  levelText: {

    color: Colors.white,

    marginLeft: 8,

    fontWeight: "600",

  },

});