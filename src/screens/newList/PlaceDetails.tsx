import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {colors} from '../../theme/colors';
import {Button, CustomHeader, LinearView} from '../../component';
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
        showsVerticalScrollIndicator={false}
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
        <View style={[AppStyles.row, styles.eventContainor]}>
          <View style={[AppStyles.row, styles.eventrow]}>
            <Image source={IMAGES.world} style={styles.eventicon} />
            <Text style={styles.graylabel}>{'Public Event'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={[AppStyles.row, styles.eventrow]}>
            <Image source={IMAGES.follower} style={[styles.followe]} />
            <Text style={styles.graylabel}>{'1.2K Follows'}</Text>
          </View>
        </View>
        <View style={[AppStyles.row, styles.features]}>
          <TouchableOpacity style={[styles.optionItem]}>
            <Image style={styles.add} source={IMAGES.newList} />
            <Text style={[styles.optionText]}>{'Add to list'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionItem]}>
            <Image style={styles.check} source={IMAGES.been} />
            <Text style={[styles.optionText]}>{'Been There'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionItem]}>
            <Image style={styles.fav} source={IMAGES.fav} />
            <Text style={[styles.optionText]}>{'Favs'}</Text>
          </TouchableOpacity>
        </View>
        <View style={[AppStyles.row, styles.selectFeatures]}>
          <TouchableOpacity style={[styles.optionItem]}>
            <Image style={styles.event} source={IMAGES.event} />
            <Text style={[styles.optionText1]}>{'Event'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionItem]}>
            <Image style={styles.event} source={IMAGES.emoji} />
            <Text style={[styles.optionText1]}>{'Been There'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <LinearView>
            <Text style={styles.description}>{'Add a description...'}</Text>
          </LinearView>
          <LinearView>
            <Text style={styles.headerTitle}>{'When'}</Text>
            <View style={[AppStyles.row, styles.dateContainor]}>
              <View>
                <Text style={styles.day}>{'Saturday May 10, 2025'}</Text>
                <Text style={styles.addlabel}>{'Add Times'}</Text>
              </View>
              <TouchableOpacity>
                <Image source={IMAGES.dropdown} style={styles.down} />
              </TouchableOpacity>
            </View>
          </LinearView>
          <LinearView>
            <Text style={styles.headerTitle}>{'Details'}</Text>
            <View style={styles.infoContainor}>
              <Text style={styles.label}>{'Phone'}</Text>
              <Text style={styles.value}>{'Add'}</Text>
              <View style={styles.horizontal_divider} />
            </View>
            <View style={styles.infoContainor}>
              <Text style={styles.label}>{'Website'}</Text>
              <Text style={styles.value}>{'Add'}</Text>
              <View style={styles.horizontal_divider} />
            </View>
            <View style={[styles.infoContainor, styles.website]}>
              <Text style={styles.label}>{'Website'}</Text>
              <Text style={[styles.value, {color: colors.black}]}>
                {'7007 Friars Rd San Diego, CA 90000 United States'}
              </Text>
            </View>
          </LinearView>
          <LinearView>
            <Text style={styles.headerTitle}>{'Recs & Tips'}</Text>
            <View style={[styles.infoContainor, styles.website]}>
              <View style={[styles.horizontal_divider, {marginTop: 0}]} />
              <Text style={styles.label}>{'Add a note'}</Text>
              <Text style={[styles.value, {color: colors._787878}]}>
                {'FAQ’s'}
              </Text>
            </View>
            <TouchableOpacity style={styles.postbtn}>
              <Text style={styles.btntxt}>{'Post'}</Text>
            </TouchableOpacity>
          </LinearView>
          <LinearView containerStyle={styles.photoContainor}>
            <Text style={styles.photo}>{'Photos'}</Text>
            <TouchableOpacity>
              <Image source={IMAGES.add_icon} style={styles.addicon} />
            </TouchableOpacity>
          </LinearView>
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
  eventicon: {
    resizeMode: 'contain',
    width: wp(24),
    height: wp(24),
  },
  graylabel: {
    ...commonFontStyle(500, 18, colors._99999),
  },
  followe: {
    resizeMode: 'contain',
    width: wp(19),
    height: wp(19),
  },
  eventrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },
  divider: {
    width: wp(2),
    backgroundColor: colors._99999,
    height: '80%',
  },
  eventContainor: {
    gap: wp(8),
    marginVertical: hp(18),
  },
  optionItem: {
    borderWidth: 1,
    borderColor: colors.primary1,
    borderRadius: 12,
    paddingHorizontal: wp(12),
    paddingVertical: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: wp(4),
  },
  optionText: {
    ...commonFontStyle(500, 14, colors.primary1),
  },
  features: {
    gap: wp(4),
  },
  add: {
    width: wp(15),
    height: hp(20),
    resizeMode: 'contain',
  },
  check: {
    width: wp(22),
    height: wp(22),
    resizeMode: 'contain',
  },
  fav: {
    width: wp(21),
    height: wp(18),
    resizeMode: 'contain',
  },
  event: {
    width: wp(18),
    height: wp(18),
    resizeMode: 'contain',
  },
  selectFeatures: {
    gap: wp(10),
    marginTop: hp(18),
    marginBottom: hp(10),
  },
  optionText1: {
    ...commonFontStyle(700, 18, colors._1B1515),
  },
  description: {
    paddingVertical: hp(20),
    paddingHorizontal: wp(20),
    ...commonFontStyle(500, 16, colors.black),
  },
  headerTitle: {
    ...commonFontStyle(700, 24, colors.black),
    padding: wp(18),
  },
  down: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'contain',
  },
  day: {
    ...commonFontStyle(600, 18, colors._BD2332),
  },
  addlabel: {
    ...commonFontStyle(600, 18, colors.black),
  },
  dateContainor: {
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
    paddingBottom: hp(10),
    alignItems: 'flex-start',
  },
  content: {
    gap: hp(18),
    marginBottom: hp(20),
  },
  infoContainor: {
    paddingHorizontal: wp(20),
  },
  label: {
    ...commonFontStyle(600, 16, colors._444444),
  },
  value: {
    ...commonFontStyle(600, 18, colors._BD2332),
  },
  horizontal_divider: {
    height: 1,
    backgroundColor: '#1B151533',
    marginVertical: hp(12),
  },
  website: {
    paddingBottom: hp(10),
  },
  postbtn: {
    backgroundColor: colors._AE1927,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginHorizontal: wp(20),
    marginBottom: hp(18),
  },
  btntxt: {
    ...commonFontStyle(600, 12, colors.white),
    paddingHorizontal: wp(22),
    paddingVertical: hp(8),
  },
  addicon: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'contain',
  },
  photo: {
    ...commonFontStyle(700, 24, colors._1B1515),
  },
  photoContainor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(28),
    paddingHorizontal: wp(20),
  },
});
