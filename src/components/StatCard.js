import React from "react";
import { View, Text } from "react-native";

export default function StatCard({ title, value }) {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "#fff",
                margin: 8,
                padding: 18,
                borderRadius: 12,
                alignItems: "center",
                elevation: 2,
            }}
        >
            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "bold",
                }}
            >
                {value}
            </Text>

            <Text
                style={{
                    color: "#666",
                    marginTop: 5,
                }}
            >
                {title}
            </Text>
        </View>
    );
}