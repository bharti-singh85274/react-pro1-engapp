import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import { getProfile, updateProfile } from "../api/profile";

export default function ProfileScreen({ navigation }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      if (res.user) {
        setName(res.user.name);
        setEmail(res.user.email);
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);

      const res = await updateProfile(name, email);

      if (res.user) {
        Alert.alert("Success", res.message);

        // refresh home screen data
        navigation.goBack();
      }

    } catch (err) {
      Alert.alert("Error", "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>

      {/* BACK BUTTON */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ fontSize: 16 }}>⬅ Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>My Profile</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleUpdate}
      >
        <Text style={styles.buttonText}>
          {saving ? "Updating..." : "Update Profile"}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FB",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  }
});