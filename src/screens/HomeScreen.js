import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* Header */}

      <View style={styles.header}>

        <View>
          <Text style={styles.greeting}>
            👋 Welcome
          </Text>

          <Text style={styles.username}>
            SpeakMaster Student
          </Text>
        </View>

        <View style={styles.streakCard}>
          <Text style={styles.streakText}>
            🔥 7 Days
          </Text>
        </View>

      </View>

      {/* Banner */}

      <View style={styles.banner}>

        <Text style={styles.bannerTitle}>
          Keep Learning Every Day
        </Text>

        <Text style={styles.bannerSubtitle}>
          Improve your English speaking with daily practice.
        </Text>

      </View>

      {/* Progress */}

      <Text style={styles.sectionTitle}>
        Your Progress
      </Text>

      <View style={styles.progressContainer}>

        <View style={styles.progressCard}>
          <Text style={styles.progressValue}>70%</Text>
          <Text style={styles.progressLabel}>Speaking</Text>
        </View>

        <View style={styles.progressCard}>
          <Text style={styles.progressValue}>55%</Text>
          <Text style={styles.progressLabel}>Grammar</Text>
        </View>

      </View>

      <View style={styles.progressContainer}>

        <View style={styles.progressCard}>
          <Text style={styles.progressValue}>82%</Text>
          <Text style={styles.progressLabel}>Vocabulary</Text>
        </View>

        <View style={styles.progressCard}>
          <Text style={styles.progressValue}>60%</Text>
          <Text style={styles.progressLabel}>Listening</Text>
        </View>

      </View>

      {/* Continue Learning */}

      <Text style={styles.sectionTitle}>
        Continue Learning
      </Text>

      <TouchableOpacity style={styles.lessonCard}>

        <Text style={styles.lessonTitle}>
          🎧 Daily Conversation Practice
        </Text>

        <Text style={styles.lessonSubtitle}>
          Resume Lesson 3 of 10
        </Text>

      </TouchableOpacity>

      {/* Today's Lessons */}

      <Text style={styles.sectionTitle}>
        Today's Lessons
      </Text>

      <View style={styles.lessonItem}>
        <Text style={styles.lessonEmoji}>📖</Text>
        <Text style={styles.lessonText}>Basic Grammar</Text>
      </View>

      <View style={styles.lessonItem}>
        <Text style={styles.lessonEmoji}>🎤</Text>
        <Text style={styles.lessonText}>Speaking Practice</Text>
      </View>

      <View style={styles.lessonItem}>
        <Text style={styles.lessonEmoji}>📝</Text>
        <Text style={styles.lessonText}>Vocabulary Quiz</Text>
      </View>

      <View style={styles.lessonItem}>
        <Text style={styles.lessonEmoji}>🎧</Text>
        <Text style={styles.lessonText}>Listening Exercise</Text>
      </View>

      {/* Quote */}

      <View style={styles.quoteCard}>

        <Text style={styles.quote}>
          "Practice English every day and confidence will follow."
        </Text>

      </View>

      {/* Logout */}

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
    marginTop: 28,
    marginBottom: 15,
    color: '#111827',
  },

  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  progressCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
  },

  progressValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  progressLabel: {
    marginTop: 8,
    color: '#6B7280',
  },

  lessonCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 2,
  },

  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },

  lessonSubtitle: {
    marginTop: 8,
    color: '#6B7280',
  },

  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
  },

  lessonEmoji: {
    fontSize: 22,
    marginRight: 15,
  },

  lessonText: {
    fontSize: 16,
    color: '#374151',
  },

  quoteCard: {
    backgroundColor: '#E0F2FE',
    padding: 18,
    borderRadius: 16,
    marginTop: 20,
  },

  quote: {
    color: '#0369A1',
    textAlign: 'center',
    fontStyle: 'italic',
    fontSize: 15,
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