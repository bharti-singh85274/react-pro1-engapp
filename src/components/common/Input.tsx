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
          focused && styles.focusedInput,
          style,
        ]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {/* Error */}
      {!!error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
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
});