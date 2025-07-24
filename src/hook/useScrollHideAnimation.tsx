// hook/useScrollHideAnimation.ts
import {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { useState } from 'react';

export const useScrollHideAnimation = (barHeight: number = 80, threshold: number = 10) => {
  const lastOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const translateY = useSharedValue(0);

  const [isVisible, setIsVisible] = useState(true); // <-- UI state (optional)

  console.log('====================================');
  console.log('isVisible',isVisible);
  console.log('====================================');

  const show = () => {
    translateY.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
    setIsVisible(true);
  };

  const hide = () => {
    translateY.value = withTiming(barHeight, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
    setIsVisible(false);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentOffset = event.contentOffset.y;
      const diff = currentOffset - lastOffset.value;

      if (Math.abs(diff) < threshold) return;

      if (diff > 0 && isScrolling.value) {
        translateY.value = withTiming(barHeight, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
        runOnJS(setIsVisible)(false);
      } else if (diff < 0 && isScrolling.value) {
        translateY.value = withTiming(0, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
        runOnJS(setIsVisible)(true);
      }

      lastOffset.value = currentOffset;
    },
    onBeginDrag: () => {
      isScrolling.value = true;
    },
    onEndDrag: () => {
      isScrolling.value = false;
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return {
    animatedStyle,
    scrollHandler,
    isVisible,
    show,
    hide,
  };
};
