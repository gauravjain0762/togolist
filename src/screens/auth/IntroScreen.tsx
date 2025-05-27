import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../theme/colors';
import {AuthHeader} from '../../component';
import {AppStyles} from '../../theme/appStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {IMAGES} from '../../assets/Images';

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
  const [stap, setStap] = useState(0);
  return (
    <View style={[AppStyles.flex, styles.mainContainor]}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      <AuthHeader proggress={stap} />
      <View style={styles.sliderContainer}>
        <Swiper
          onIndexChanged={i => setStap((i + 1) * 20)}
          style={styles.wrapper}>
          {data?.map((i, index) => (
            <ImageBackground
              source={i?.images}
              resizeMode="cover"
              key={i?.name}
              style={styles.slide1}>
              <Text style={styles.title}>{i?.name}</Text>
              <Text style={styles.text}>{i?.info}</Text>
            </ImageBackground>
          ))}
        </Swiper>
      </View>
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...commonFontStyle(700, 32, colors.white),
    textAlign: 'center',
  },
  sliderContainer: {
    margin: wp(16),
    flex: 1,
    borderRadius: 13,
    overflow: 'hidden',
  },
  mainContainor: {
    backgroundColor: colors.white,
  },
  title: {
    ...commonFontStyle(700, 40, colors.white),
    marginBottom: hp(120),
  },
});
