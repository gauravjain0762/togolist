import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {CustomHeader, LinearView} from '../../component';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';

const PostRequest = () => {
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
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={IMAGES.bbq}
          imageStyle={styles.placeimges}
          style={styles.place}>
          <Text style={styles.placeTitle}>{'Guide to Toronto'}</Text>
          <View style={styles.location}>
            <Image source={IMAGES.wordWide} style={styles.pin} />
            <Text style={styles.address}>{'Toronto, Canada'}</Text>
          </View>
          <Text style={styles.rate}>{'Hourly $20 USD'}</Text>
        </ImageBackground>
        <LinearView>
          <Text style={styles.headerTitle}>{'Details'}</Text>
        </LinearView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostRequest;

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
  scroll: {
    paddingHorizontal: wp(16),
  },
  placeimges: {
    borderRadius: 20,
  },
  placeTitle: {
    ...commonFontStyle(700, 32, colors.white),
  },
  place: {
    width: 'auto',
    resizeMode: 'contain',
    height: hp(555),
    marginBottom: wp(18),
    marginTop: hp(21),
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: hp(4),
    paddingVertical: hp(38),
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginTop: hp(4),
  },
  pin: {
    resizeMode: 'contain',
    width: wp(24),
    height: wp(24),
    tintColor: colors.white,
  },
  address: {
    ...commonFontStyle(600, 14, colors.white),
  },
  rate: {
    ...commonFontStyle(400, 14, colors.white),
  },
  headerTitle: {
    ...commonFontStyle(700, 24, colors.black),
    padding: wp(18),
    paddingBottom: hp(4),
  },
});
