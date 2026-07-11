import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  color?: string;
  onPress: () => void;
};

export default function MenuItem({
  icon,
  title,
  color = Colors.text,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <Ionicons
            name={icon}
            size={22}
            color={color}
          />
        </View>

        <Text style={[styles.title, { color }]}>
          {title}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color="#9CA3AF"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  container: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    backgroundColor: Colors.white,

    paddingVertical: 16,

    paddingHorizontal: 18,

    borderRadius: 16,

    marginBottom: 14,

    elevation: 2,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 6,

    shadowOffset: {
      width: 0,
      height: 3,
    },

  },

  leftSection: {

    flexDirection: "row",

    alignItems: "center",

  },

  iconContainer: {

    width: 40,

    height: 40,

    borderRadius: 20,

    backgroundColor: "#EFF6FF",

    justifyContent: "center",

    alignItems: "center",

    marginRight: 15,

  },

  title: {

    fontSize: 16,

    fontWeight: "600",

  },

});