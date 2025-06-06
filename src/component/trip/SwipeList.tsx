import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {IMAGES} from '../../assets/Images';
import {SCREEN_WIDTH, commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';

type swiperList = {
  title?: string;
  conatinerStyle?: ViewStyle;
  onPress?: any;
  deletePress?: any;
};

const SwipeList: FC<swiperList> = ({
  conatinerStyle,
  deletePress,
  onPress,
  title,
}) => {
  const animation = useSharedValue(0);
  const locked = useSharedValue(false); // NEW: lock state
  const AnimetedTouchableOpacity = Animated.createAnimatedComponent(Pressable);

  const SCREEN_WIDTH = Dimensions.get('window').width;
  const MAX_TRANSLATE_X = -SCREEN_WIDTH * 0.4; // 40%

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx: any) => {
      ctx.startX = animation.value;
    },
    onActive: (event, ctx: any) => {
      let newTranslateX = ctx.startX + event.translationX;

      if (newTranslateX >= 0) {
        animation.value = 0; // Don't allow right swipe
      } else if (newTranslateX >= MAX_TRANSLATE_X) {
        animation.value = newTranslateX; // Allow up to -40%
      } else {
        // Beyond -40% → apply resistance (bounce effect)
        const overshoot = newTranslateX - MAX_TRANSLATE_X;
        animation.value = MAX_TRANSLATE_X + overshoot * 0.6; // dampen overshoot
      }
    },
    onEnd: event => {
      if (animation.value <= MAX_TRANSLATE_X) {
        animation.value = withSpring(MAX_TRANSLATE_X); // snap to -40%
      } else {
        animation.value = withSpring(0); // snap back to 0
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: animation.value,
        },
      ],
    };
  });
  return (
    <GestureHandlerRootView style={[styles.container, conatinerStyle]}>
      <PanGestureHandler
        onGestureEvent={gestureHandler}
        onHandlerStateChange={event => {
          console.log('asdasd', event?.nativeEvent);
          //   if (event?.nativeEvent.translationX < -100.430219) {
          //     Alert.alert('', 'Are you sure you want to remove device', [
          //       {
          //         text: 'No',

          //         onPress: () => console.log('Cancel Pressed'),
          //         style: 'cancel',
          //       },
          //       {
          //         text: 'Yes',
          //         onPress: () => {},
          //       },
          //     ]);
          //   }
        }}>
        <Animated.View style={styles.bgConatiner}>
          <AnimetedTouchableOpacity
            onPress={() => {}}
            style={[styles.listConatiner, animatedStyle]}>
            <Image source={IMAGES.Verified} style={styles.deviceIcon} />
            <Text style={styles.titleText}>{title}</Text>
          </AnimetedTouchableOpacity>
          <View style={styles.deleteConatiner}>
            <Image source={IMAGES.remove} style={styles.deleteIcon} />
            <Text style={styles.deleteTitle}>Delete</Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default SwipeList;

const styles = StyleSheet.create({
  container: {},
  deviceIcon: {
    width: wp(40),
    height: wp(40),
    resizeMode: 'contain',
  },
  listConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(12),
    paddingVertical: hp(12),
    paddingLeft: wp(16),
    backgroundColor: colors.white,
    position: 'absolute',
    width: SCREEN_WIDTH,
  },
  bgConatiner: {
    backgroundColor: colors.red,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: hp(20),
  },
  deleteIcon: {
    width: wp(24),
    height: wp(24),
  },
  deleteTitle: {
    ...commonFontStyle(600, 16, colors.white),
  },
  titleText: {
    ...commonFontStyle(600, 16, colors.black),
  },
  deleteConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(12),
    marginRight: wp(20),
  },
});
