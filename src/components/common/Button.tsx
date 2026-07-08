import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  GestureResponderEvent,
  ViewStyle,
} from "react-native";

import Colors from "../../constants/colors";
import Radius from "../../constants/radius";
import Shadow from "../../constants/shadow";
import Typography from "../../constants/typography";

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;

  loading?: boolean;
  disabled?: boolean;

  backgroundColor?: string;
  textColor?: string;

  style?: ViewStyle;
};

export default function Button({
  title,
  onPress,
  loading = false,
  disabled = false,
  backgroundColor = Colors.primary,
  textColor = Colors.white,
  style,
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={loading || disabled}
      onPress={onPress}
     style={[
        styles.button,
        { backgroundColor },
        style,
        (loading || disabled) && styles.disabledButton,
        ]}
    >
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
      <Text style={[styles.text, { color: textColor }]}>
            {title}
            </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

    button: {
  width: "100%",
  minHeight: 58,

  backgroundColor: Colors.primary,

  borderRadius: Radius.xl,

  justifyContent: "center",

  alignItems: "center",

  paddingHorizontal: 20,

  ...Shadow,
},

  disabledButton: {
    opacity: 0.6,
  },

  text: {
    color: Colors.white,

    fontSize: Typography.body,

    fontWeight: "700",
  },
});