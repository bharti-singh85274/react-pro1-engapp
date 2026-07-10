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

import { verifyOtp } from "../api/auth";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "VerifyOtp"
>;

export default function VerifyOtpScreen({
  navigation,
  route,
}: Props) {

  const { email } = route.params;

  const [otp, setOtp] = useState("");

  const [otpError, setOtpError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {

    setOtpError("");

    if (!otp.trim()) {

      setOtpError("OTP is required.");

      return;

    }

    if (otp.length !== 6) {

      setOtpError("OTP must be 6 digits.");

      return;

    }

    try {

      setLoading(true);

      await verifyOtp(email, otp);

      navigation.navigate("ResetPassword", {

        email,

        otp,

      });

    } catch (error: any) {

      console.log(error.response?.data);

      Alert.alert(

        "Verification Failed",

        error.response?.data?.message ||

          "Invalid OTP."

      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <Screen keyboard>

      <View style={styles.container}>

        <Text style={styles.title}>

          Verify OTP

        </Text>

        <Text style={styles.subtitle}>

          Enter the 6-digit OTP sent to

        </Text>

        <Text style={styles.email}>

          {email}

        </Text>

        <Input

          label="OTP"

          placeholder="Enter OTP"

          value={otp}

          onChangeText={(text) => {

            setOtp(text);

            setOtpError("");

          }}

          keyboardType="number-pad"

          maxLength={6}

          error={otpError}

        />

        <Button

          title="Verify OTP"

          loading={loading}

          onPress={handleVerifyOtp}

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

    color: Colors.subText,

    fontSize: Typography.body,

  },

  email: {

    marginTop: 6,

    marginBottom: 35,

    fontSize: Typography.body,

    color: Colors.primary,

    fontWeight: "700",

  },

});