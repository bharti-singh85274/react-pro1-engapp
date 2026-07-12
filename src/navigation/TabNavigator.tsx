import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import CourseScreen from "../screens/CourseScreen";
import CoursesScreen from "../screens/CoursesScreen";
import ProgressScreen from "../screens/ProgressScreen";
import ProfileScreen from "../screens/ProfileScreen";

import Colors from "../constants/colors";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "#9CA3AF",

        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName: any = "MainTabs";

       switch (route.name) {
          case "MainTabs":
            iconName = "home";
            break;

          case "Courses":
            iconName = "book";
            break;

          case "Progress":
            iconName = "stats-chart";
            break;

          case "Profile":
            iconName = "person";
            break;

          default:
            iconName = "ellipse";
        }

          return (
            <Ionicons
              name={iconName}
              size={22}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="MainTabs"
        component={HomeScreen}
      />

      {/* <Tab.Screen
        name="Courses"
        component={CourseScreen}
      /> */}

      <Tab.Screen
        name="Courses"
        component={CoursesScreen}
      />

      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
      
    </Tab.Navigator>
  );
}