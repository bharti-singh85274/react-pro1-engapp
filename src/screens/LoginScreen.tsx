import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
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

import { validateLogin } from "../utils/validation";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

export default function LoginScreen({
  navigation,
}: Props) {

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [errors, setErrors] =
    useState<any>({});

  const [loginError, setLoginError] =
    useState("");

  const handleLogin = async () => {

    setErrors({});

    setLoginError("");

    const validationErrors =
      validateLogin(
        email,
        password
      );

    if (
      Object.keys(validationErrors).length > 0
    ) {

      setErrors(validationErrors);

      return;

    }

    try {

      setLoading(true);

      await loginUser(
        email,
        password
      );

      navigation.replace(
        "MainTabs"
      );

    } catch (error: any) {

      if (
        error.response?.status === 422
      ) {

        const apiErrors =
          error.response.data.errors || {};

        const formattedErrors: any = {};

        Object.keys(apiErrors).forEach(
          (key) => {

            formattedErrors[key] =
              apiErrors[key][0];

          }
        );

        setErrors(formattedErrors);

      } else if (
        error.response?.status === 401
      ) {

        setLoginError(
          "Invalid email or password."
        );

      } else {

        setLoginError(
          "Unable to login. Please try again."
        );

      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <Screen keyboard scrollable>

      <View style={styles.container}>

        {/* Header */}

        <View style={styles.header}>

          <Text style={styles.logo}>
            🎓
          </Text>

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

          {
            loginError ? (

              <View style={styles.loginErrorBox}>

                <Text style={styles.loginErrorText}>
                  {loginError}
                </Text>

              </View>

            ) : null
          }

          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            onChangeText={(text) => {

              setEmail(text);

              setErrors((prev: any) => ({
                ...prev,
                email: null,
              }));

              setLoginError("");

            }}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            secureTextEntry
            autoCapitalize="none"
            error={errors.password}
            onChangeText={(text) => {

              setPassword(text);

              setErrors((prev: any) => ({
                ...prev,
                password: null,
              }));

              setLoginError("");

            }}
          />

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                "ForgotPassword"
              )
            }
          >

            <Text style={styles.forgot}>
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
            onPress={() =>
              navigation.navigate(
                "Signup"
              )
            }
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

  forgot: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginBottom: 20,
    color: Colors.primary,
    fontWeight: "600",
  },

  loginErrorBox: {
    backgroundColor: "#FFF3F3",
    borderLeftWidth: 4,
    borderLeftColor: "#E53935",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },

  loginErrorText: {
    color: "#C62828",
    fontWeight: "600",
    fontSize: 14,
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