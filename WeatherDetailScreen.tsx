// WeatherDetailScreen.tsx
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, Animated } from 'react-native'; // Import Animated
import { SharedElement } from 'react-native-shared-element';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Hardcoded weatherData since it's not passed from WeatherListScreen
const weatherData = [
  { id: '1', city: 'San Diego', temp: '72°', description: 'Partly Cloudy', high: '75°', low: '62°' },
  { id: '2', city: 'Santa Monica', temp: '69°', description: 'Partly Cloudy', high: '72°', low: '62°' },
  { id: '3', city: 'Seattle', temp: '60°', description: 'Cloudy', high: '71°', low: '53°' },
  { id: '4', city: 'Los Angeles', temp: '76°', description: 'Mostly Sunny', high: '81°', low: '62°' },
  { id: '5', city: 'Encinitas', temp: '68°', description: 'Partly Cloudy', high: '69°', low: '61°' },
  { id: '6', city: 'Medford', temp: '78°', description: 'Sunny', high: '85°', low: '59°' },
];

// Reusable component for a single detail card
const WeatherDetailCard = ({ item }) => {
  return (
    <View style={styles.detailCardContent}>
      <SharedElement id={`item.${item.id}.city`}>
        <Text style={styles.detailCity}>{item.city}</Text>
      </SharedElement>
      <SharedElement id={`item.${item.id}.temperature`}>
        <Text style={styles.detailTemp}>{item.temp}</Text>
      </SharedElement>
      <Text style={styles.detailDescription}>{item.description}</Text>
      <Text style={styles.detailHighLow}>H:{item.high} L:{item.low}</Text>

      <View style={styles.additionalDetails}>
        <Text style={styles.additionalText}>Sunny conditions expected around 3PM.</Text>
        <Text style={styles.additionalText}>Wind gusts are up to 10 mph.</Text>
      </View>
    </View>
  );
};

const WeatherDetailScreen = ({ route }) => {
  const { item: initialItem } = route.params; // Get the single item passed
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current; // Animated value for scroll position

  // Find the initial index of the passed item within the hardcoded data
  const initialIndex = weatherData.findIndex(dataItem => dataItem.id === initialItem.id); //

  // Use a state to control FlatList visibility after scrolling
  const [flatListReady, setFlatListReady] = useState(false);

  useEffect(() => {
    // Only scroll if initialIndex is found and FlatListRef exists
    if (flatListRef.current && initialIndex !== -1) {
      // Small timeout to allow shared element transition to start
      const timer = setTimeout(() => {
        flatListRef.current.scrollToIndex({ index: initialIndex, animated: false });
        setFlatListReady(true); // Mark FlatList as ready
      }, 50); // Adjust delay as needed
      return () => clearTimeout(timer);
    }
  }, [initialIndex]);

  const renderPaginationDots = () => {
    const dotPosition = Animated.divide(scrollX, width); // Calculate active dot position

    return (
      <View style={styles.paginationContainer}>
        {weatherData.map((_, index) => {
          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [10, 20, 10], // Active dot is wider
            extrapolate: 'clamp',
          });

          const dotOpacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3], // Active dot is fully opaque
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                { width: dotWidth, opacity: dotOpacity },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity> */}

      {/* The FlatList now handles the "next card data" and horizontal swiping */}
      {initialIndex !== -1 && ( // Only render FlatList if initial item is found
        <FlatList
          ref={flatListRef}
          data={weatherData}
          renderItem={({ item }) => <WeatherDetailCard item={item} />}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled // Enables snapping to full pages
          showsHorizontalScrollIndicator={false}
          // initialScrollIndex is set when component mounts via useEffect
          getItemLayout={(data, index) => (
            { length: width, offset: width * index, index }
          )}
          style={flatListReady ? {} : { opacity: 0 }} // Hide FlatList until ready
          onScroll={Animated.event( // Capture scroll events for dot animation
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false } // 'useNativeDriver: true' not supported for 'onScroll' with 'Animated.event' by default
          )}
          scrollEventThrottle={16} // Update scroll position frequently
        />
      )}

      {/* Render the pagination dots */}
      {renderPaginationDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4a90e2', // Light blue background
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 2, // Ensure back button is above FlatList
  },
  backButtonText: {
    fontSize: 30,
    color: '#333',
  },
  detailCardContent: {
    width: width, // Each card takes full screen width
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1, // Allow content to fill the height
  },
  detailCity: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  detailTemp: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  detailDescription: {
    fontSize: 24,
    color: '#666',
    marginTop: 5,
  },
  detailHighLow: {
    fontSize: 20,
    color: '#666',
    marginTop: 10,
  },
  additionalDetails: {
    marginTop: 30,
    alignItems: 'center',
  },
  additionalText: {
    fontSize: 18,
    color: '#555',
    marginBottom: 5,
  },
  // Styles for the pagination dots
  paginationContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30, // Position at the bottom
    alignSelf: 'center', // Center horizontally
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#FFF', // White dots
    marginHorizontal: 4,
  },
});

export default WeatherDetailScreen;