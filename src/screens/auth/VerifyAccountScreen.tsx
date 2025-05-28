import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IMAGES} from '../../assets/Images';
import {AppStyles} from '../../theme/appStyles';
import {commonFontStyle, hp, SCREEN_HEIGHT} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import CustomBtn from '../../component/common/CustomBtn';
import {AuthHeader, CustomTextInput} from '../../component';
import {
  emailCheck,
  navigateTo,
  validatePassword,
} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import {navigationRef} from '../../navigation/RootContainer';

const VerifyAccountScreen = ({navigation}: any) => {
  const [showImageScreen, setShowImageScreen] = useState(false);

  const handleNext = () => {
    setShowImageScreen(true);
  };

  const handleNextUploadImage = () => {
    setShowImageScreen(false);
    navigationRef.navigate(SCREENS.TabNavigator);
  };

  return (
    <SafeAreaView edges={['top']} style={AppStyles.flex}>
      {/* Header with back icon and progress bar */}
      <AuthHeader
        showBack
        onBackPress={() => {
          if (showImageScreen) {
            setShowImageScreen(false);
          } else {
            navigationRef.goBack();
          }
        }}
        proggress={90}
      />
      <View style={[styles.lineStyle, {marginBottom: 10, marginTop: 5}]} />
      <ImageBackground
        source={IMAGES.bg} // replace with your actual image path
        style={styles.container}>
        {/* Title */}
        <View style={{position: 'absolute', top: 20}}>
          <Text style={styles.title}>
            {showImageScreen ? 'Profile Image' : 'Verification'}
          </Text>
        </View>
        {/* Input */}
        <View>
          <Text style={styles.verifyText}>
            {showImageScreen ? 'Add Profile Image' : 'Verify Your Identity'}
          </Text>
          <Text style={styles.verifyText1}>
            {'Get access to monetization features with \na verified account'}
          </Text>
          {showImageScreen ? (
            <CustomBtn
              style={styles.button1}
              buttonText={styles.buttonText1}
              onPress={() => {
                handleNextUploadImage();
              }}
              title={'Upload Image'}
            />
          ) : (
            <CustomBtn
              style={styles.button}
              buttonText={styles.buttonText}
              onPress={() => {
                handleNext();
              }}
              title={'Verify Account'}
            />
          )}
        </View>
        {showImageScreen ? (
          <TouchableOpacity
            onPress={() => {
              setShowImageScreen(false);
              navigationRef.navigate(SCREENS.TabNavigator);
            }}
            style={styles.skipView}>
            <Text style={styles.skipText}>Skip for now.</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setShowImageScreen(true);
            }}
            style={styles.skipView}>
            <Text style={styles.skipText}>Skip verification</Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
    paddingVertical: 20,
    marginBottom: hp(21),
  },

  title: {
    marginLeft: 20,
    marginBottom: 10,
    ...commonFontStyle(700, 32, colors.white),
  },
  verifyText: {
    ...commonFontStyle(700, 24, colors.white),
    textAlign: 'center',
    marginBottom: 8,
  },
  verifyText1: {
    ...commonFontStyle(700, 16, colors.white),
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    paddingHorizontal: 24,
    borderRadius: 14,
  },
  button1: {
    paddingHorizontal: 24,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.25)',
  },
  lineStyle: {
    borderWidth: 0.7,
    width: '100%',
    borderColor: '#1B15151A',
  },
  buttonText: {
    ...commonFontStyle(700, 18, colors.white),
  },
  buttonText1: {
    ...commonFontStyle(700, 18, colors.primary1),
  },
  skipText: {
    ...commonFontStyle(500, 14, '#D9D9D9'),
  },
  skipView: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});

export default VerifyAccountScreen;
