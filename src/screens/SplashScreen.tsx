import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

import Colors from '../constants/Colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {

  useEffect(() => {
    const checkAuth = async () => {

      try {
        const token = await AsyncStorage.getItem("token");

        console.log("TOKEN FROM STORAGE:", token);

        setTimeout(() => {

          // SAFE CHECK
          if (token && token !== "undefined" && token !== "null") {
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: "Onboarding" }],
            });
          }

        }, 2000);

      } catch (error) {
        console.log("Splash error:", error);
        navigation.replace("Onboarding");
      }
    };

    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>SpeakMaster</Text>
      <Text style={styles.subtitle}>Learn English Anywhere</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  logo: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
    marginTop: 8,
  },
});