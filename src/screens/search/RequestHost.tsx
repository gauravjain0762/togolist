import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {Button, CustomHeader} from '../../component';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {navigateTo} from '../../utils/commonFunction';
import {SCREEN_NAMES} from '../../navigation/screenNames';

const RequestHost = () => {
  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader
        backImg={IMAGES.back1}
        backIconStyle={styles.back}
        showSearch={false}
        moreImg={IMAGES.more_icon}
        moreIconStyle={styles.more}
        headerStyle={styles.header}
      />
      <ImageBackground
        source={IMAGES.requestHost_bg}
        resizeMode="cover"
        style={styles.imageContainer}>
        <>
          <Text style={styles.title}>Posting Title</Text>
          <TouchableOpacity style={[styles.inputBox]}>
            <Image source={IMAGES.location} style={styles.icon} />
            <Text style={styles.placeholder}>Location</Text>
          </TouchableOpacity>
          <View style={styles.Eventrow}>
            <TouchableOpacity style={styles.card1}>
              <Image source={IMAGES.canlder} style={styles.icon1} />
              <Text style={styles.cardText}>Set Dates</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.BGcard}>
              <Image source={IMAGES.camera} style={styles.icon} />
              <Text style={styles.cardText}>Image</Text>
            </TouchableOpacity>
          </View>
          <Button
            title="Next"
            onPress={() => navigateTo(SCREEN_NAMES.PostRequest)}
          />
        </>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default RequestHost;

const styles = StyleSheet.create({
  back: {
    resizeMode: 'contain',
    width: wp(24),
    height: wp(24),
    tintColor: undefined,
  },
  more: {
    tintColor: undefined,
    resizeMode: 'contain',
    width: wp(24),
    height: wp(24),
  },
  header: {
    paddingHorizontal: wp(16),
  },
  imageContainer: {
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    padding: wp(24),
    marginHorizontal: wp(16),
    flex: 1,
    marginBottom: hp(26),
  },
  title: {
    ...commonFontStyle(700, 32, '#FFFFFF99'),
    marginBottom: 10,
    textAlign: 'center',
  },
  placeholder: {
    ...commonFontStyle(500, 16, '#3C3C4399'),
  },
  inputBox: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    paddingVertical: hp(16),
  },
  icon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginRight: 5,
  },
  icon1: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
    marginRight: 5,
    tintColor: '#3C3C4399',
  },
  cardText: {
    ...commonFontStyle(500, 16, '#3C3C4399'),
  },
  Eventrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(8),
  },
  card1: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flex: 1,
    marginRight: 10,
  },
  BGcard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flex: 1,
  },
});
