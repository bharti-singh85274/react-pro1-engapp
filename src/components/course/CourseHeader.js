import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

const BASE_URL = "http://192.168.1.22:8000/storage/";

export default function CourseHeader({ course }) {
  return (
    <View style={styles.container}>

      <Image
        source={{
          uri: course.thumbnail
            ? BASE_URL + course.thumbnail
            : "https://via.placeholder.com/600x300",
        }}
        style={styles.image}
      />

      <View style={styles.content}>

        <Text style={styles.title}>
          {course.title}
        </Text>

        <Text style={styles.description}>
          {course.description}
        </Text>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 18,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 220,
  },

  content: {
    padding: 18,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  description: {
    marginTop: 10,
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
  },

});