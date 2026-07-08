import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import slides from "./data";
import OnboardingItem from "./OnboardingItem";

const { width } = Dimensions.get("window");

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const flatListRef = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const onViewRef = useRef(({ viewableItems }) => {
    if (
      viewableItems &&
      viewableItems.length > 0 &&
      viewableItems[0].index != null
    ) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const nextSlide = async () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToOffset({
        offset: (currentIndex + 1) * width,
        animated: true,
      });

      setCurrentIndex(currentIndex + 1);
    } else {
      await AsyncStorage.setItem(
        "onboarding_completed",
        "true"
      );

      navigation.replace("Login");
    }
  };

  const skip = async () => {
    await AsyncStorage.setItem(
      "onboarding_completed",
      "true"
    );

    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item }) => (
          <OnboardingItem item={item} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        onScrollToIndexFailed={(info) => {
          flatListRef.current?.scrollToOffset({
            offset: info.index * width,
            animated: true,
          });
        }}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttons}>
          {currentIndex !== slides.length - 1 ? (
            <TouchableOpacity onPress={skip}>
              <Text style={styles.skip}>
                Skip
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={nextSlide}
          >
            <Text style={styles.buttonText}>
              {currentIndex === slides.length - 1
                ? "Get Started"
                : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  footer: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },

  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 5,
  },

  activeDot: {
    width: 28,
    backgroundColor: "#2563EB",
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  skip: {
    fontSize: 17,
    color: "#6B7280",
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 4,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
});