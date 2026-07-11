import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

import Colors from "../../constants/colors";
import Radius from "../../constants/radius";
import Typography from "../../constants/typography";
import Shadow from "../../constants/shadow";
import Ionicons from "@expo/vector-icons/Ionicons";

type InputProps = TextInputProps & {
  label: string;
  error?: string;
};

export default function Input({
  label,
  error,
  secureTextEntry,
  style,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      {/* Label */}
      <Text style={styles.label}>{label}</Text>

      {/* Input */}
    <TextInput
        {...props}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={Colors.subText}
        style={[
          styles.input,
          focused && !error && styles.focusedInput,
          error && styles.inputError,
          style,
        ]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />


      {/* Error */}
     {error ? (
    <View style={styles.errorContainer}>
        <Ionicons
            name="alert-circle"
            size={16}
            color="#D32F2F"
        />

        <Text style={styles.errorText}>
            {error}
        </Text>
    </View>
) : null}

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },

  label: {
    marginBottom: 8,
    color: Colors.text,
    fontSize: Typography.body,
    fontWeight: "600",
  },

  input: {
    height: 58,

    backgroundColor: Colors.inputBackground,

    borderWidth: 1,

    borderColor: Colors.border,

    borderRadius: Radius.xl,

    paddingHorizontal: 18,

    fontSize: Typography.body,

    color: Colors.text,

    ...Shadow,
  },

  focusedInput: {
    borderColor: Colors.primary,
  },

  error: {
    marginTop: 6,

    color: Colors.danger,

    fontSize: Typography.caption,
  },


  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDECEC",
    borderLeftWidth: 4,
    borderLeftColor: "#D32F2F",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 6,
    borderRadius: 8,
},

errorText: {
    color: "#D32F2F",
    fontSize: 13,
    marginLeft: 8,
    flex: 1,
},


inputError: {
    borderColor: "#D32F2F",
    borderWidth: 2,
},


});