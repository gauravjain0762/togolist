import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SharedElement } from 'react-native-shared-element'; // Import SharedElement

const AnimatedWeatherCard = ({ item, index, onPress }) => {
  // Initial list entry animations (slide up and fade in)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // New: Animation for press feedback (scale)
  const scaleAnim = useRef(new Animated.Value(1)).current; // Initial scale: 1 (normal size)

  useEffect(() => {
    // Stagger the initial list entry animations
    const delay = index * 80;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay: delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay: delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, index]);

  // Function to handle press in animation
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95, // Scale down to 95% of original size
      useNativeDriver: true,
      friction: 7, // Controls the bounciness/friction
      tension: 100, // Controls the speed/aggressiveness
    }).start();
  };

  // Function to handle press out and navigation
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Scale back to original size
      useNativeDriver: true,
      friction: 7,
      tension: 100,
    }).start(() => {
      // After scaling back up, navigate to the detail screen
      onPress();
    });
  };

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim }, // Apply the animated scale
          ],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={1} // Disable default TouchableOpacity opacity change
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
      >
        <SharedElement id={`item.${item.id}.city`}>
          <Text style={styles.city}>{item.city}</Text>
        </SharedElement>
        <SharedElement id={`item.${item.id}.temperature`}>
          <Text style={styles.temperature}>{item.temp}</Text>
        </SharedElement>
        <Text style={styles.description}>{item.description}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  touchable: {
    padding: 20,
    alignItems: 'center',
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  temperature: {
    fontSize: 50,
    fontWeight: '300',
    color: '#4a90e2',
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    color: '#666',
  },
});

export default AnimatedWeatherCard;