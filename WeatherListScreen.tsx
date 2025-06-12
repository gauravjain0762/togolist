// WeatherListScreen.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SharedElement } from 'react-native-shared-element'; // Already imported

const weatherData = [
  { id: '1', city: 'San Diego', temp: '72°', description: 'Partly Cloudy', high: '75°', low: '62°' },
  { id: '2', city: 'Santa Monica', temp: '69°', description: 'Partly Cloudy', high: '72°', low: '62°' },
  { id: '3', city: 'Seattle', temp: '60°', description: 'Cloudy', high: '71°', low: '53°' },
  { id: '4', city: 'Los Angeles', temp: '76°', description: 'Mostly Sunny', high: '81°', low: '62°' },
  { id: '5', city: 'Encinitas', temp: '68°', description: 'Partly Cloudy', high: '69°', low: '61°' },
  { id: '6', city: 'Medford', temp: '78°', description: 'Sunny', high: '85°', low: '59°' },
];

const WeatherListScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('WeatherDetail', { item })}
    >
      {/* SOURCE Shared Element for City */}
      <SharedElement id={`item.${item.id}.city`}>
        <Text style={styles.cityText}>{item.city}</Text>
      </SharedElement>
      <View style={styles.rightContent}>
        {/* SOURCE Shared Element for Temperature */}
        <SharedElement id={`item.${item.id}.temperature`}>
          <Text style={styles.tempText}>{item.temp}</Text>
        </SharedElement>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weather</Text>
      <FlatList
        data={weatherData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    paddingTop: 50,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cityText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  tempText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
  },
});

export default WeatherListScreen;