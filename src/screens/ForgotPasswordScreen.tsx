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

import { forgotPassword } from "../api/auth";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "ForgotPassword"
>;

export default function ForgotPasswordScreen({
  navigation,
}: Props) {

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");

  const handleSendOtp = async () => {

    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email is required.");
      return;
    }

    try {

      setLoading(true);

      await forgotPassword(email);

      Alert.alert(
        "Success",
        "OTP sent successfully."
      );

      navigation.navigate(
        "VerifyOtp",
        {
          email,
        }
      );

    } catch (error: any) {

      console.log(
        error.response?.data
      );

      Alert.alert(
        "Error",
        error.response?.data?.message ??
          "Unable to send OTP."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <Screen keyboard>

      <View style={styles.container}>

        <Text style={styles.title}>
          Forgot Password
        </Text>

        <Text style={styles.subtitle}>
          Enter your registered email.
        </Text>

        <Input
          label="Email"
          placeholder="Enter email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError("");
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          error={emailError}
        />

        <Button
          title="Send OTP"
          loading={loading}
          onPress={handleSendOtp}
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

    color: Colors.subText,

    fontSize: Typography.body,

  },

});