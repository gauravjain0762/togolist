import React from 'react';
import { Pressable, Animated, StyleSheet, View, Easing } from 'react-native';

const CustomToggle = ({ value, onValueChange }: { value: boolean; onValueChange: (val: boolean) => void }) => {
  const offset = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(offset, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [value]);

  const interpolateThumb = offset.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 22], // left position for thumb
  });

  const interpolateBg = offset.interpolate({
    inputRange: [0, 1],
    outputRange: ['#78788029', '#BD2332'],
  });

  return (
    <Pressable onPress={() => onValueChange(!value)}>
      <Animated.View style={[styles.container, { backgroundColor: interpolateBg }]}>
        <Animated.View style={[styles.thumb, { left: interpolateThumb }]} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 51,
    height: 31,
    borderRadius: 31,
    justifyContent: 'center',
    padding: 4,
  },
  thumb: {
    position: 'absolute',
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default CustomToggle;
