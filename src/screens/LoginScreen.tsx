import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../api/auth';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;

export default function LoginScreen({
  navigation,
}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // const handleLogin = async () => {
  //   if (!email || !password) {
  //     Alert.alert("Error", "Please fill all fields");
  //     return;
  //   }

  //   setLoading(true);

  //   const result = await loginUser(email, password);

  //   setLoading(false);

  //   if (result.status === 200) {
  //     // ✅ Save token
  //     await AsyncStorage.setItem("token", result.data.token);

  //     // optional save user
  //     await AsyncStorage.setItem(
  //       "user",
  //       JSON.stringify(result.data.user)
  //     );

  //     // ✅ Go to Home
  //     navigation.replace("Home");

  //   } else {
  //     Alert.alert("Login Failed", result.data.message || "Invalid credentials");
  //   }
  // };

const handleLogin = async () => {
  if (!email.trim() || !password.trim()) {
    Alert.alert("Error", "Please enter email and password");
    return;
  }

  try {
    setLoading(true);

    const res = await loginUser(email, password);

    console.log("LOGIN RESPONSE:", res);

    if (!res) {
      Alert.alert("Error", "No response from server");
      return;
    }

    if (res.token) {
      // Verify token was saved
      const savedToken = await AsyncStorage.getItem("token");
      console.log("Saved Token:", savedToken);

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else {
      Alert.alert("Login Failed", res.message || "Invalid credentials");
    }
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    Alert.alert("Error", "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 12,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});