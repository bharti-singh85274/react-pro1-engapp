import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProfile } from "../api/profile";
import { getCourses } from "../api/course";
import CourseCard from "../components/CourseCard";

export default function HomeScreen({ navigation }) {

  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Refresh when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadData();
    });

    return unsubscribe;
  }, [navigation]);

  // Load both profile + courses
  const loadData = async () => {
    try {
      setLoading(true);

      const profile = await getProfile();
      const courseData = await getCourses();

      // SAFE COURSE PARSING (handles all Laravel formats)
      const list =
        courseData?.courses ||
        courseData?.data?.courses ||
        courseData;

      setCourses(Array.isArray(list) ? list : []);

      if (profile?.user) {
        setUser(profile.user);
      }

    } catch (error) {
      console.log("Home error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  return (
    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>👋 Welcome Back</Text>

          <Text style={styles.username}>
            {loading ? "Loading..." : user?.name}
          </Text>
        </View>

        <View style={styles.streakCard}>
          <Text style={styles.streakText}>🔥 7 Days</Text>
        </View>
      </View>

      {/* PROFILE BUTTON */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        style={styles.profileButton}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          My Profile
        </Text>
      </TouchableOpacity>

      {/* BANNER */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>
          Keep Learning Every Day
        </Text>
        <Text style={styles.bannerSubtitle}>
          Improve your English speaking with daily practice.
        </Text>
      </View>

      {/* COURSES SECTION */}
      <Text style={styles.sectionTitle}>
        Courses
      </Text>

      {courses.length === 0 ? (
        <Text style={{ color: "gray", marginTop: 10 }}>
          No courses available
        </Text>
      ) : (
        courses.map((item) => (
          <CourseCard
            key={item.id}
            item={item}
            onPress={() =>
              navigation.navigate("Course", {
                courseId: item.id,
              })
            }
          />
        ))
      )}


      <TouchableOpacity
        style={styles.progressBtn}
        onPress={() => navigation.navigate("Progress")}
    >
        <Text style={styles.btnText}>
            📊 My Progress
        </Text>
    </TouchableOpacity>

    

      {/* LOGOUT */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={logout}
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    paddingHorizontal: 20,
    paddingTop: 55,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  greeting: {
    fontSize: 16,
    color: '#6B7280',
  },

  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 5,
  },

  streakCard: {
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
  },

  streakText: {
    fontWeight: '700',
    color: '#F59E0B',
  },

  banner: {
    marginTop: 25,
    backgroundColor: '#2563EB',
    borderRadius: 20,
    padding: 20,
  },

  bannerTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  bannerSubtitle: {
    color: '#E5E7EB',
    marginTop: 10,
    fontSize: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
  },

  profileButton: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  logoutButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 16,
    borderRadius: 16,
    marginVertical: 35,
    alignItems: 'center',
  },

  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },

});