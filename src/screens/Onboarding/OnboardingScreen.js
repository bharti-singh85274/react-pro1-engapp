import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import slides from './data';
import OnboardingItem from './OnboardingItem';

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef(null);

  // ✅ FIXED: reliable index tracking
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems?.length > 0 && viewableItems[0].index != null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  // ✅ NEXT BUTTON (FIXED)
  const nextSlide = () => {
    const nextIndex = currentIndex + 1;

    if (nextIndex < slides.length) {
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    } else {
      navigation.replace('Login');
    }
  };

  // ✅ SKIP BUTTON (FIXED)
  const skip = () => {
    const lastIndex = slides.length - 1;

    flatListRef.current?.scrollToIndex({
      index: lastIndex,
      animated: true,
    });

    setCurrentIndex(lastIndex);
  };

  return (
    <View style={styles.container}>
      
      {/* ONBOARDING SLIDES */}
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({ item }) => (
          <OnboardingItem item={item} />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
      />

      {/* FOOTER */}
      <View style={styles.footer}>
        
        {/* DOTS */}
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

        {/* BUTTONS */}
        <View style={styles.buttons}>

          {/* SKIP */}
          {currentIndex !== slides.length - 1 && (
            <TouchableOpacity onPress={skip}>
              <Text style={styles.skip}>Skip</Text>
            </TouchableOpacity>
          )}

          {/* NEXT / GET STARTED */}
          <TouchableOpacity
            onPress={nextSlide}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {currentIndex === slides.length - 1
                ? 'Get Started'
                : 'Next'}
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
    backgroundColor: '#fff',
  },

  footer: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 5,
  },

  activeDot: {
    width: 24,
    backgroundColor: '#2563EB',
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  skip: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '600',
  },

  button: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 14,
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});