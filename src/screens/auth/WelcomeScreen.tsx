import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {AppStyles} from '../../theme/appStyles';
import {colors} from '../../theme/colors';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {Button, SocialBtn} from '../../component';
import {IMAGES} from '../../assets/Images';
import {navigateTo} from '../../utils/commonFunction';
import {SCREEN_NAMES, SCREENS} from '../../navigation/screenNames';
import {SafeAreaView} from 'react-native-safe-area-context';

const WelcomeScreen = () => {
  return (
    <SafeAreaView
      edges={['top']}
      style={[AppStyles.flex, styles.mainContainer]}>
      <StatusBar
        barStyle={'light-content'}
        animated
        backgroundColor={colors._1B1B1B}
      />
      <View style={styles.header}>
        <View style={AppStyles.flex1} />
        <View style={[AppStyles.flex1, AppStyles.Hcenter]}>
          <Image source={IMAGES.headerLogo} style={styles.headerlogo} />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigateTo(SCREENS.SigninScreen);
          }}
          style={[styles.login]}>
          <Text style={styles.headerBtn}>{'Log in'}</Text>
        </TouchableOpacity>
      </View>
      <ImageBackground source={IMAGES.welcome} style={styles.container}>
        <View style={styles.btns}>
          <Button
            onPress={() => navigateTo(SCREEN_NAMES.SignupScreen)}
            title={'Sign up with Email'}
          />
          <SocialBtn
            img={IMAGES.google}
            title={'Sign up with Google'}
            onPress={() => {
              navigateTo(SCREENS.UserNameScreen);
            }}
          />
          <SocialBtn
            img={IMAGES.apple}
            title={'Sign up with Apple'}
            onPress={() => {
              navigateTo(SCREENS.UserNameScreen);
            }}
          />
        </View>
        <Text style={styles.footertext}>
          {
            'By signing up, you accept our Terms of Service and our Privacy Policy. Your data will be used responsibly to enhance your experience'
          }
        </Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors._1B1B1B,
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
    flex: 1,
  },
});
