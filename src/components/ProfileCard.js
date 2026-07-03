import React from "react";
import { View, Text } from "react-native";

export default function ProfileCard({ user }) {
    return (
        <View
            style={{
                backgroundColor: "#fff",
                margin: 15,
                padding: 20,
                borderRadius: 15,
                elevation: 3,
            }}
        >
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "bold",
                }}
            >
                {user?.name}
            </Text>

            <Text
                style={{
                    marginTop: 5,
                    color: "#666",
                }}
            >
                {user?.email}
            </Text>
        </View>
    );
}