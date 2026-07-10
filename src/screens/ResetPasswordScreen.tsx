import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";

import Screen from "../components/common/Screen";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

import Colors from "../constants/colors";
import Typography from "../constants/typography";

import { resetPassword } from "../api/auth";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ResetPassword"
>;

export default function ResetPasswordScreen({
  navigation,
  route,
}: Props) {
  const { email, otp } = route.params;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  const [confirmError, setConfirmError] =
    useState("");

  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    setPasswordError("");
    setConfirmError("");

    if (!password.trim()) {
      setPasswordError("Password is required.");
      return;
    }

    if (password.length < 8) {
      setPasswordError(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (!confirmPassword.trim()) {
      setConfirmError(
        "Confirm Password is required."
      );
      return;
    }

    if (password !== confirmPassword) {
      setConfirmError(
        "Passwords do not match."
      );
      return;
    }

  try {
  setLoading(true);

  const response = await resetPassword(
    email,
    otp,
    password,
    confirmPassword
  );

  console.log("RESET SUCCESS");

  navigation.reset({
    index: 0,
    routes: [
      {
        name: "Login",
      },
    ],
  });

} catch (error: any) {

  console.log("RESET PASSWORD ERROR", error);

  Alert.alert(
    "Error",
    error.response?.data?.message ||
      "Unable to reset password."
  );

} finally {

  setLoading(false);

}
  };

  return (
    <Screen keyboard>
      <View style={styles.container}>
        <Text style={styles.title}>
          Reset Password
        </Text>

        <Text style={styles.subtitle}>
          Create a new password for your account.
        </Text>

        <Input
          label="New Password"
          placeholder="Enter new password"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError("");
          }}
          error={passwordError}
        />

        <Input
          label="Confirm Password"
          placeholder="Confirm password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setConfirmError("");
          }}
          error={confirmError}
        />

        <Button
          title="Reset Password"
          loading={loading}
          onPress={handleResetPassword}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: Typography.h1,
    fontWeight: "700",
    color: Colors.text,
  },

  subtitle: {
    marginTop: 10,
    marginBottom: 35,
    fontSize: Typography.body,
    color: Colors.subText,
  },
});