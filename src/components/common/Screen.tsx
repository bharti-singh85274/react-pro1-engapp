import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import Colors from "../../constants/colors";

type ScreenProps = {
  children: React.ReactNode;
  scrollable?: boolean;
  keyboard?: boolean;
};

export default function Screen({
  children,
  scrollable = false,
  keyboard = false,
}: ScreenProps) {
  let content = (
    <View style={styles.container}>
      {children}
    </View>
  );

  if (scrollable) {
    content = (
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  if (keyboard) {
    content = (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {content}
      </KeyboardAvoidingView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={Colors.background}
        barStyle="dark-content"
      />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

 container: {
  flex: 1,
  backgroundColor: Colors.background,
  paddingHorizontal: 20,
  paddingBottom: 30,   // ✅ Add this
},

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
});