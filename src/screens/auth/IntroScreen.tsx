import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {colors} from '../../theme/colors';
import {AuthHeader, Button} from '../../component';
import {AppStyles} from '../../theme/appStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {IMAGES} from '../../assets/Images';
import CustomBtn from '../../component/common/CustomBtn';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';

let data = [
  {
    id: 1,
    name: 'Togolists',
    info: 'Discover new spots, save places to go with Togolists.',
    images: IMAGES.intro1,
  },
  {
    id: 2,
    name: 'Experiences',
    info: 'Know whats on, find events and activities near you.',
    images: IMAGES.intro2,
  },
  {
    id: 3,
    name: 'Trips',
    info: 'Plan trips with lists, itineraries & more.',
    images: IMAGES.intro3,
  },
  {
    id: 4,
    name: 'Hosts',
    info: 'Find local hosts for unique experiences.',
    images: IMAGES.intro4,
  },
  {
    id: 5,
    name: 'Listings',
    info: 'Create itineraries and experiences to earn with Togolist.',
    images: IMAGES.intro5,
  },
];

const IntroScreen = () => {
  const [stap, setStap] = useState(20);

  const slides = useMemo(() => {
    // This will only re-compute if `data` changes.
    // If `data` is static, this will run only once.
    return data?.map((item, index) => (
      <ImageBackground
        source={item?.images} // Ensure `item.images` is a valid image source
        resizeMode="cover"
        key={item?.name || `slide-${index}`} // Use a unique and stable key
        style={styles.slide1}>
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={styles.text}>{item?.info}</Text>
      </ImageBackground>
    ));
  }, [data]);

  const handleIndexChanged = useCallback(i => {
    // Swiper index `i` is 0-based
    setStap((i + 1) * 20);
  }, []);

  return (
    <SafeAreaView style={[AppStyles.flex, styles.mainContainor]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      <AuthHeader proggress={stap} />
      <View style={[styles.lineStyle, {marginTop: 10}]} />
      <View style={styles.sliderContainer}>
        <Swiper
          onIndexChanged={handleIndexChanged}
          paginationStyle={styles.paginationStyle}
          // renderPagination={(index, total, swiper) => {
          //   console.log('index, total, number', index, total, swiper);
          //   return (
          //     <View style={{backgroundColor: 'yellow', width: 20, height: 20}}>
          //       <Text>2</Text>
          //     </View>
          //   );
          // }}
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(26),
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
    marginBottom: hp(120),
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
    backgroundColor: 'yellow',
    flex: 1,
    position: 'relative',
    // alignSelf: 'center',
  },
});
