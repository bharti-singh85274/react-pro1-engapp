import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    getProfile,
    logout,
} from "../api/profile";

import { getProgress } from "../api/progress";

import ProfileCard from "../components/ProfileCard";
import StatCard from "../components/StatCard";

export default function ProfileScreen({ navigation }) {

    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        const profile = await getProfile();
        const prog = await getProgress();

        setUser(profile.user);
        setProgress(prog);
    };

    const handleLogout = async () => {

        await logout();

        await AsyncStorage.removeItem("token");

        navigation.replace("Login");
    };

    return (

        <ScrollView
            style={{
                flex:1,
                backgroundColor:"#F5F6FA"
            }}
        >

            <ProfileCard user={user}/>

            <View
                style={{
                    flexDirection:"row",
                    marginHorizontal:10
                }}
            >

                <StatCard
                    title="Completed"
                    value={progress?.completed_count || 0}
                />

                <StatCard
                    title="XP"
                    value={progress?.xp || 0}
                />

            </View>

            <View
                style={{
                    flexDirection:"row",
                    marginHorizontal:10
                }}
            >

                <StatCard
                    title="Lessons"
                    value={progress?.total_lessons || 0}
                />

                <StatCard
                    title="Progress"
                    value={`${progress?.percentage || 0}%`}
                />

            </View>

            <TouchableOpacity

                style={{
                    backgroundColor:"#2563EB",
                    margin:15,
                    padding:16,
                    borderRadius:10
                }}

                onPress={()=>{
                    navigation.navigate("Progress")
                }}

            >

                <Text
                    style={{
                        color:"#fff",
                        textAlign:"center",
                        fontWeight:"bold"
                    }}
                >
                    View Learning Progress
                </Text>

            </TouchableOpacity>

            <TouchableOpacity

                style={{
                    backgroundColor:"#10B981",
                    marginHorizontal:15,
                    padding:16,
                    borderRadius:10
                }}

                onPress={()=>{

                    Alert.alert(
                        "Coming Soon",
                        "Edit Profile Screen"
                    );

                }}

            >

                <Text
                    style={{
                        color:"#fff",
                        textAlign:"center",
                        fontWeight:"bold"
                    }}
                >
                    Edit Profile
                </Text>

            </TouchableOpacity>

            <TouchableOpacity

                style={{
                    backgroundColor:"#F59E0B",
                    margin:15,
                    padding:16,
                    borderRadius:10
                }}

                onPress={()=>{

                    Alert.alert(
                        "Coming Soon",
                        "Change Password Screen"
                    );

                }}

            >

                <Text
                    style={{
                        color:"#fff",
                        textAlign:"center",
                        fontWeight:"bold"
                    }}
                >
                    Change Password
                </Text>

            </TouchableOpacity>

            <TouchableOpacity

                style={{
                    backgroundColor:"#EF4444",
                    marginHorizontal:15,
                    marginBottom:30,
                    padding:16,
                    borderRadius:10
                }}

                onPress={handleLogout}

            >

                <Text
                    style={{
                        color:"#fff",
                        textAlign:"center",
                        fontWeight:"bold"
                    }}
                >
                    Logout
                </Text>

            </TouchableOpacity>

        </ScrollView>

    );

}