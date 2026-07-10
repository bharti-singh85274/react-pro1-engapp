import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";

import Screen from "../components/common/Screen";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

import Colors from "../constants/colors";
import Typography from "../constants/typography";

import { registerUser } from "../api/auth";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Signup"
>;

export default function SignupScreen({
  navigation,
}: Props) {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

 const [errors, setErrors] = useState<any>({});

const handleSignup = async () => {
  console.log("1. Button clicked");

  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("Confirm Password:", confirmPassword);

  setErrors({});

  console.log("2. After setErrors");

  let validationErrors: any = {};

  if (!name.trim()) {
    validationErrors.name = "Name is required.";
  }

  if (!email.trim()) {
    validationErrors.email = "Email is required.";
  }

  if (!password) {
    validationErrors.password = "Password is required.";
  }

  if (!confirmPassword) {
    validationErrors.password_confirmation =
      "Confirm Password is required.";
  }

  if (
    password &&
    confirmPassword &&
    password !== confirmPassword
  ) {
    validationErrors.password_confirmation =
      "Passwords do not match.";
  }

  console.log("3. Validation Errors:", validationErrors);

  if (Object.keys(validationErrors).length > 0) {
    console.log("4. Returning because of validation");
    setErrors(validationErrors);
    return;
  }

  console.log("5. Calling Register API");

  try {
    setLoading(true);

    const response = await registerUser(
      name,
      email,
      password,
      confirmPassword
    );

    console.log("6. API Success:", response);

    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    });

  } catch (error: any) {
    console.log("7. API Error");
    console.log(error.response?.status);
    console.log(error.response?.data);
  } finally {
    console.log("8. Finally");
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
            Create Account
          </Text>

          <Text style={styles.subtitle}>
            Start your English learning journey today.
          </Text>
        </View>

        {/* Form */}

        <View style={styles.form}>
         <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
            error={errors.name}
          />

        <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

        <Input
            label="Password"
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
          />

        <Input
            label="Confirm Password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={errors.password_confirmation}
          />

          <Button
            title="Create Account"
            loading={loading}
            onPress={handleSignup}
          />
        </View>

        {/* Footer */}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?
          </Text>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.login}>
              Login
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

  footer: {
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },

  footerText: {
    color: Colors.subText,
    fontSize: Typography.body,
  },

  login: {
    marginTop: 6,
    color: Colors.primary,
    fontWeight: "700",
    fontSize: Typography.body,
  },
});