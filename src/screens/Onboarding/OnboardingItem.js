import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function OnboardingItem({ item }) {
  return (
    <View style={styles.container}>
    
      <Image source={item.image}  resizeMode="contain" style={styles.image} />

      <Text style={styles.title}>{item.title}</Text>

      <Text style={styles.description}>
        {item.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({

 container: {
  width,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 30,
},


image: {
   width: width * 0.78,
  height: 320,
},

 title: {
  fontSize: 30,
  fontWeight: "700",
  color: "#111827",
  textAlign: "center",
},

 description: {
  marginTop: 20,
  fontSize: 17,
  color: "#6B7280",
  textAlign: "center",
  lineHeight: 28,
  paddingHorizontal: 10,
},


});