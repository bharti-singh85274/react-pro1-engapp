import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CourseScreen from '../screens/CourseScreen';
import LessonScreen from '../screens/LessonScreen';
import ProgressScreen from '../screens/ProgressScreen';
import QuizScreen from "../screens/QuizScreen";
import QuizResultScreen from "../screens/QuizResultScreen";
import TabNavigator from "./TabNavigator";
import EditProfileScreen from "../screens/EditProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";


import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="Profile"component={ProfileScreen}/>
        <Stack.Screen name="Course" component={CourseScreen} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen}/>
       <Stack.Screen name="QuizResult" component={QuizResultScreen} />
       <Stack.Screen name="EditProfile" component={EditProfileScreen}/>
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}