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
import {colors} from '../../theme/colors';
import {Button, CustomHeader} from '../../component';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';

const PlaceDetails = () => {
  return (
    <SafeAreaView style={[AppStyles.flex, styles.container]}>
      <CustomHeader
        backImg={IMAGES.back1}
        backIconStyle={styles.back}
        showSearch={false}
        moreImg={IMAGES.more}
        moreIconStyle={styles.more}
      />
      <ScrollView
        contentContainerStyle={AppStyles.flexGrow}
        style={styles.scroll}>
        <ImageBackground
          source={IMAGES.bbq}
          imageStyle={styles.placeimges}
          style={styles.place}>
          <Text style={styles.placeTitle}>{'BBQ Festival'}</Text>
          <View style={styles.location}>
            <Image source={IMAGES.wordWide} style={styles.pin} />
            <Text style={styles.address}>
              {'7007 Friars Rd. San Diego, CA'}
            </Text>
          </View>
          <View style={styles.timecontainer}>
            <Text style={styles.time}>{'May 10'}</Text>
            <Image source={IMAGES.arrow} style={styles.arrow} />
            <Text style={styles.time}>{'May 11'}</Text>
          </View>
        </ImageBackground>
        <Button titleStyle={styles.btn} title="Admin Mode" />
        <View>
          <View>
            <Image source={IMAGES.world} style={styles.world} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
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
  place: {
    width: 'auto',
    resizeMode: 'contain',
    height: hp(555),
    marginBottom: wp(18),
    marginTop: hp(21),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  placeimges: {
    borderRadius: 20,
  },
  placeTitle: {
    ...commonFontStyle(700, 32, colors.white),
  },
  scroll: {
    flex: 1,
    paddingHorizontal: wp(16),
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
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginTop: hp(12),
  },
  arrow: {
    resizeMode: 'contain',
    width: wp(12),
    height: wp(12),
  },
  time: {
    ...commonFontStyle(500, 14, colors.white),
  },
  timecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
    paddingBottom: hp(38),
    marginTop: hp(4),
  },
  btn: {
    ...commonFontStyle(600, 16, colors.white),
  },
  world: {
    resizeMode: 'contain',
    width: wp(24),
    height: wp(24),
  },
});
