import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {AppStyles} from '../../theme/appStyles';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {Button, SocialBtn} from '../../component';
import {IMAGES} from '../../assets/Images';
import {navigateTo} from '../../utils/commonFunction';
import {SCREEN_NAMES} from '../../navigation/screenNames';

const WelcomeScreen = () => {
  return (
    <View style={[AppStyles.flex, styles.mainContainer]}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.black} />
      <View style={styles.header}>
        <View style={AppStyles.flex} />
        <View style={[AppStyles.flex, AppStyles.Hcenter]}>
          <Image source={IMAGES.headerLogo} style={styles.headerlogo} />
        </View>
        <View style={[AppStyles.flex, styles.login]}>
          <Text style={styles.headerBtn}>{'Log in'}</Text>
        </View>
      </View>
      <ImageBackground source={IMAGES.welcome} style={styles.container}>
        <View style={styles.btns}>
          <Button
            onPress={() => navigateTo(SCREEN_NAMES.IntroScreen)}
            title={'Sign up with Email'}
          />
          <SocialBtn img={IMAGES.google} title={'Sign up with Google'} />
          <SocialBtn img={IMAGES.apple} title={'Sign up with Apple'} />
        </View>
        <Text style={styles.footertext}>
          {
            'By signing up, you accept our Terms of Service and our Privacy Policy. Your data will be used responsibly to enhance your experience'
          }
        </Text>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.black,
    paddingHorizontal: wp(16),
    borderBottomWidth: 1,
    borderColor: '#FAE8D140',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: hp(10),
  },
  headerBtn: {
    ...commonFontStyle(700, 18, colors.white),
  },
  container: {
    paddingHorizontal: wp(16),
    justifyContent: 'flex-end',
    flex: 1,
  },
  btns: {
    gap: wp(8),
  },
  footertext: {
    ...commonFontStyle(500, 13, '#EBEBF599'),
    textAlign: 'center',
    marginTop: hp(16),
    lineHeight: hp(20),
    marginBottom: hp(21),
  },
  mainContainer: {
    backgroundColor: colors.white,
  },
  headerlogo: {
    width: wp(130),
    height: hp(33),
    resizeMode: 'contain',
  },
  login: {
    alignItems: 'flex-end',
  },
});
