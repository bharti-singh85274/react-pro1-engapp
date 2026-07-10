import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";
import { loginUser } from "../api/auth";

import Screen from "../components/common/Screen";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

import Colors from "../constants/colors";
import Typography from "../constants/typography";
import Spacing from "../constants/spacing";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

export default function LoginScreen({
  navigation,
}: Props) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await loginUser(email, password);

      navigation.replace("MainTabs");
    } catch (e: any) {
      Alert.alert(
        "Login Error",
        "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen keyboard scrollable>
      <View style={styles.container}>
        {/* Header */}

        <View style={styles.header}>
          <Text style={styles.logo}>🎓</Text>

          <Text style={styles.appName}>
            English Master
          </Text>

          <Text style={styles.title}>
            Welcome Back
          </Text>

          <Text style={styles.subtitle}>
            Continue learning English with confidence.
          </Text>
        </View>

        {/* Form */}

        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

         
      <TouchableOpacity
              onPress={() =>
                  navigation.navigate("ForgotPassword")
              }
          >
              <Text
                  style={{
                      alignSelf: "flex-end",
                      marginTop: 10,
                      marginBottom: 20,
                      color: Colors.primary,
                      fontWeight: "600"
                  }}
              >
                  Forgot Password?
              </Text>
          </TouchableOpacity>

          <Button
            title="Login"
            loading={loading}
            onPress={handleLogin}
          />
        </View>

        {/* Footer */}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?
          </Text>

        <TouchableOpacity
            onPress={() => navigation.navigate("Signup")}
        >
            <Text style={styles.signUp}>
                Sign Up
            </Text>
        </TouchableOpacity>
        
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 20,
  },

  header: {
    alignItems: "center",
    marginTop: 20,
  },

  logo: {
    fontSize: 60,
    marginBottom: 10,
  },

  appName: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 20,
  },

  title: {
    fontSize: Typography.h1,
    fontWeight: "700",
    color: Colors.text,
  },

  subtitle: {
    marginTop: 10,
    textAlign: "center",
    color: Colors.subText,
    fontSize: Typography.body,
    lineHeight: 24,
    paddingHorizontal: 20,
  },

  form: {
    marginTop: 40,
  },

  forgotContainer: {
    alignItems: "flex-end",
    marginTop: -8,
    marginBottom: 25,
  },

  forgot: {
    color: Colors.primary,
    fontWeight: "600",
  },

  footer: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },

  footerText: {
    color: Colors.subText,
    fontSize: Typography.body,
  },

  signUp: {
    marginTop: 6,
    color: Colors.primary,
    fontWeight: "700",
    fontSize: Typography.body,
  },
});