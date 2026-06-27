import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function OnboardingItem({ item }) {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />

      <Text style={styles.title}>{item.title}</Text>

      <Text style={styles.description}>
        {item.description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
//   container: {
//     // width: 390,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 30,
//   },

  container: {
  width,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 30,
},

  image: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
    marginBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },

  description: {
    marginTop: 18,
    fontSize: 17,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 28,
  },
});