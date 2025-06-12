// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import WeatherListScreen from './WeatherListScreen';
import WeatherDetailScreen from './WeatherDetailScreen';

const Stack = createSharedElementStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WeatherList" headerMode="none">
        <Stack.Screen name="WeatherList" component={WeatherListScreen} />
        <Stack.Screen
          name="WeatherDetail"
          component={WeatherDetailScreen}
          options={() => ({
            gestureEnabled: false, // Disables swipe back gesture for now, adjust as needed
            transitionSpec: {
              // Customize timing for open and close animations
              open: { animation: 'timing', config: { duration: 700 } }, // Open animation duration
              close: { animation: 'timing', config: { duration: 400 } }, // Close animation duration
            },
            cardStyleInterpolator: ({ current: { progress } }) => ({
              cardStyle: {
                // This makes the new screen fade in/out during the transition
                opacity: progress,
              },
            }),
          })}
          // **CRITICAL: Enable the sharedElements function here**
          sharedElements={(route, otherRoute, showing) => {
            const { item } = route.params; // Get the item data passed from the list screen
            return [
              {
                id: `item.${item.id}.temperature`, // Unique ID for the temperature text
                animation: 'fade', // Optional: how the shared element itself animates (e.g., 'fade', 'move')
                resize: 'clip', // Optional: how the element resizes ('clip', 'stretch', 'none')
              },
              {
                id: `item.${item.id}.city`, // Unique ID for the city name text
                animation: 'fade',
                resize: 'clip',
              },
              // You can add more shared elements here if you want to animate other parts,
              // for example, the entire card background or an icon.
              // To aanimate the entire card background, you would:
              // 1. Add a SharedElement wrapping the main card content in WeatherListScreen.
              // 2. Add a SharedElement wrapping the main content area in WeatherDetailScreen.
              // 3. Give them a unique ID like `item.${item.id}.cardBackground`.
              // Example (uncomment if you add the SharedElement wrappers in other files):
              // {
              //   id: `item.${item.id}.cardBackground`,
              //   animation: 'fade',
              //   resize: 'clip',
              // },
            ];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;