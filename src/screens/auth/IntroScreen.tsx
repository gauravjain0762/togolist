import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {colors} from '../../theme/colors';
import {AuthHeader, Button} from '../../component';
import {AppStyles} from '../../theme/appStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {SCREEN_WIDTH, commonFontStyle, hp, wp} from '../../theme/fonts';
import {IMAGES} from '../../assets/Images';
import CustomBtn from '../../component/common/CustomBtn';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import {SwiperData} from '../../utils/constents';

const IntroScreen = () => {
  const [stap, setStap] = useState(20);

  const slides = useMemo(() => {
    // This will only re-compute if `data` changes.
    // If `data` is static, this will run only once.
    return SwiperData?.map((item, index) => (
      <ImageBackground
        source={item?.images} // Ensure `item.images` is a valid image source
        resizeMode="cover"
        key={item?.name || `slide-${index}`} // Use a unique and stable key
        style={styles.slide1}>
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={styles.text}>{item?.info}</Text>
      </ImageBackground>
    ));
  }, [SwiperData]);

  const handleIndexChanged = useCallback(i => {
    // Swiper index `i` is 0-based
    setStap((i + 1) * 20);
  }, []);

  return (
    <SafeAreaView style={[AppStyles.flex, styles.mainContainor]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      <AuthHeader showBack={false} proggress={stap} />
      <View style={[styles.lineStyle, {marginTop: 10}]} />
      <View style={styles.sliderContainer}>
        <Swiper
          onIndexChanged={handleIndexChanged}
          paginationStyle={styles.paginationStyle}
          dotColor={colors._BD2332_0_3}
          activeDotColor={colors._BD2332}
          style={styles.wrapper}>
          {slides}
        </Swiper>
      </View>
      <View style={styles.lineStyle} />
      <Button
        BtnStyle={styles.button}
        titleStyle={styles.buttonText}
        onPress={() => {
          navigateTo(SCREENS.WelcomeScreen);
        }}
        title={'Create Account'}
      />
    </SafeAreaView>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: wp(26),
    gap: hp(120),
  },
  text: {
    ...commonFontStyle(700, 32, colors.white),
    textAlign: 'center',
  },
  sliderContainer: {
    margin: wp(16),
    flex: 1,
    borderRadius: wp(20),
    overflow: 'hidden',
  },
  mainContainor: {
    backgroundColor: colors.white,
  },
  title: {
    ...commonFontStyle(700, 40, colors.white),
    marginTop: hp(113),
  },
  button: {
    marginTop: 10,
    marginHorizontal: wp(16),
    marginBottom: hp(8),
    borderWidth: 1,
    borderColor: colors.black,
  },
  buttonText: {
    ...commonFontStyle(700, 18, colors.white),
  },
  lineStyle: {
    borderWidth: 0.7,
    width: '100%',
    borderColor: '#1B15151A',
  },
  paginationStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    left: wp(SCREEN_WIDTH / 2 - 64),
    right: wp(SCREEN_WIDTH / 2 - 64),
    paddingVertical: hp(6),
    borderRadius: 100,
    bottom: hp(30),
    // alignSelf: 'center',
  },
});
