import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator
} from "react-native";


import {
    getProfile,
    logout
} from "../api/profile";



export default function ProfileScreen({ navigation }) {


    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);



   useFocusEffect(

    useCallback(()=>{

        loadProfile();

    },[])

);



    const loadProfile = async () => {


        try {


            const response = await getProfile();


            console.log(
                "PROFILE RESPONSE:",
                response
            );


            // Laravel response:
            // {
            //    user:{
            //       name:"",
            //       email:""
            //    }
            // }

            setUser(response.user);


        }
        catch (error) {


            console.log(
                "PROFILE ERROR:",
                error.response?.data || error.message
            );


        }
        finally {

            setLoading(false);

        }


    };





    const handleLogout = async () => {


        try {

            await logout();

        }
        catch (error) {

            console.log(
                "LOGOUT ERROR:",
                error.response?.data || error.message
            );

        }



        navigation.reset({

            index: 0,

            routes: [
                {
                    name: "Login"
                }
            ]

        });


    };





    if (loading) {


        return (

            <View style={styles.loader}>


                <ActivityIndicator
                    size="large"
                    color="#2563EB"
                />


            </View>

        );


    }





    return (

        <View style={styles.container}>


            <Text style={styles.heading}>
                My Profile
            </Text>




            <View style={styles.profileCard}>


                <Text style={styles.name}>
                    {user?.name || "User"}
                </Text>


                <Text style={styles.email}>
                    {user?.email || ""}
                </Text>


            </View>





            <TouchableOpacity

                style={styles.button}

                onPress={() =>
                    navigation.navigate(
                        "EditProfile",
                        {
                            user: user
                        }
                    )
                }

            >

                <Text style={styles.buttonText}>
                    Edit Profile
                </Text>


            </TouchableOpacity>







            <TouchableOpacity

                style={styles.button}

                onPress={() =>
                    navigation.navigate(
                        "ChangePassword"
                    )
                }

            >

                <Text style={styles.buttonText}>
                    Change Password
                </Text>


            </TouchableOpacity>








            <TouchableOpacity

                style={styles.logout}

                onPress={handleLogout}

            >

                <Text style={styles.buttonText}>
                    Logout
                </Text>


            </TouchableOpacity>



        </View>

    );

}






const styles = StyleSheet.create({


    container: {

        flex: 1,

        padding: 20,

        backgroundColor: "#F8FAFC"

    },



    loader: {

        flex: 1,

        justifyContent: "center",

        alignItems: "center"

    },



    heading: {

        fontSize: 30,

        fontWeight: "700",

        marginBottom: 25

    },



    profileCard: {

        backgroundColor: "#FFFFFF",

        padding: 20,

        borderRadius: 15

    },



    name: {

        fontSize: 22,

        fontWeight: "700"

    },



    email: {

        marginTop: 5,

        color: "#6B7280"

    },



    button: {

        marginTop: 20,

        backgroundColor: "#2563EB",

        padding: 15,

        borderRadius: 10

    },



    logout: {

        marginTop: 20,

        backgroundColor: "#EF4444",

        padding: 15,

        borderRadius: 10

    },



    buttonText: {

        color: "#FFFFFF",

        textAlign: "center",

        fontWeight: "700"

    }



});