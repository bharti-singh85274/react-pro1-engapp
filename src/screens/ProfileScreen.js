import React, { useCallback, useMemo, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  ScrollView,
  View,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";

import Colors from "../constants/colors";

import { getProfile } from "../api/profile";
import { logoutUser } from "../api/auth";

import ProfileHeader from "../components/profile/ProfileHeader";
import StatsCard from "../components/profile/StatsCard";
import ProgressCard from "../components/profile/ProgressCard";
import MenuItem from "../components/profile/MenuItem";
import { getProgress } from "../api/progress";

export default function ProfileScreen({ navigation }) {

  const [loading, setLoading] = useState(true);

 const [user, setUser] = useState(null);
 const [progressData, setProgressData] = useState(null);

  useFocusEffect(

    useCallback(() => {

      loadProfile();

    }, [])

  );


  const loadProfile = async () => {

    setLoading(true);

    try {

        const profile = await getProfile();

        const progress = await getProgress();

        setUser(profile.user);

        setProgressData(progress);

    } catch (error) {

        console.log(
            error.response?.data || error.message
        );

    } finally {

        setLoading(false);

    }

};


const handleLogout = async () => {
  console.log("Step 1");

  try {
    console.log("Step 2 - Calling logout");

    await logoutUser();

    console.log("Step 3 - Logout completed");

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });

    console.log("Step 4 - Navigation completed");
  } catch (error) {
    console.log("Logout Error:", error);
  }
};
  

  const xp = progressData?.xp || 0;

const streak = 0;

const completedLessons = progressData?.completed_count || 0;

const totalLessons = progressData?.total_lessons || 0;

const progress = progressData?.percentage || 0;

const totalCourses = 7;

  if (loading) {

    return (

      <View style={styles.loader}>

        <ActivityIndicator

          size="large"

          color={Colors.primary}

        />

      </View>

    );

  }

  return (

    <ScrollView

      style={styles.container}

      showsVerticalScrollIndicator={false}

    >

      <ProfileHeader

        name={user?.name || "User"}

        email={user?.email || ""}

      />

        <StatsCard
        xp={xp}
        streak={streak}
        lessons={completedLessons}
        courses={totalCourses}
    />

      <ProgressCard

        progress={progress}

      />

      <MenuItem

        icon="person-circle"

        title="Edit Profile"

        onPress={() =>
          navigation.navigate(
            "EditProfile",
            {
              user,
            }
          )
        }

      />

      <MenuItem

        icon="lock-closed"

        title="Change Password"

        onPress={() =>
          navigation.navigate(
            "ChangePassword"
          )
        }

      />

      <MenuItem

        icon="notifications"

        title="Notifications"

        onPress={() => navigation.navigate("Notifications")}

      />

      <MenuItem

        icon="shield-checkmark"

        title="Privacy Policy"

       onPress={() => navigation.navigate("PrivacyPolicy")}

      />

      <MenuItem

        icon="information-circle"

        title="About App"

        onPress={() => navigation.navigate("About")}

      />

      <MenuItem

        icon="log-out"

        title="Logout"

        color={Colors.danger}

        onPress={handleLogout}

      />

      <View
        style={{
          height: 40,
        }}
      />

    </ScrollView>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: Colors.background,

    padding: 20,

  },

  loader: {

    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: Colors.background,

  },

});