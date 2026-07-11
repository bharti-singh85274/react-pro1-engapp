import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

import Colors from "../constants/colors";
import GradientHeader from "../components/common/GradientHeader";
import InfoCard from "../components/common/InfoCard";

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <GradientHeader
        title="Privacy Policy"
        subtitle="Your privacy and personal information are important to us."
        icon="shield-checkmark"
      />

      <Text style={styles.sectionTitle}>
        Information We Collect
      </Text>

      <InfoCard
        icon="person-circle"
        title="Personal Information"
        description="Your name and email address are collected only for creating and managing your account."
        color="#3563E9"
      />

      <InfoCard
        icon="bar-chart"
        title="Learning Progress"
        description="Completed lessons, quiz scores, XP and learning progress are stored to enhance your experience."
        color="#00B894"
      />

      <Text style={styles.sectionTitle}>
        How We Protect Your Data
      </Text>

      <InfoCard
        icon="lock-closed"
        title="Secure Authentication"
        description="Your account is protected through secure authentication and encrypted communication."
        color="#2ECC71"
      />

      <InfoCard
        icon="server"
        title="Secure Storage"
        description="Your information is securely stored on protected servers and is never shared without your permission."
        color="#F39C12"
      />

      <Text style={styles.sectionTitle}>
        Your Rights
      </Text>

      <InfoCard
        icon="create"
        title="Update Profile"
        description="You can edit your personal information anytime from the Profile section."
      />

      <InfoCard
        icon="key"
        title="Change Password"
        description="You can update your password whenever you want for better account security."
      />

      <InfoCard
        icon="shield-checkmark"
        title="Our Commitment"
        description="We never sell your personal information. Your data is used only to improve your learning experience."
        color="#E74C3C"
      />

      <Text style={styles.footer}>
        By using this application, you agree to this Privacy Policy.
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 16,
    marginTop: 10,
  },

  footer: {
    textAlign: "center",
    fontSize: 15,
    color: "#666",
    marginTop: 20,
    marginBottom: 30,
    lineHeight: 24,
  },

});