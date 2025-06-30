import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {Button, CustomHeader, LinearView} from '../../component';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {navigateTo} from '../../utils/commonFunction';
import {SCREEN_NAMES} from '../../navigation/screenNames';

const NotificationDetails = () => {
  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader
        backImg={IMAGES.back1}
         showBack={true}
        backIconStyle={styles.back}
        showSearch={false}
        moreImg={IMAGES.more_icon}
        moreIconStyle={styles.more}
        headerStyle={styles.header}
        title="Trips"
      />
      <ScrollView
        contentContainerStyle={styles.Scrollcontainer}
        style={styles.scroll}
        showsVerticalScrollIndicator={false}>
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
        <LinearView containerStyle={styles.valueContainer}>
          <Text style={styles.headerTitle}>{'About'}</Text>
          <TextInput
            style={styles.valueinput}
            multiline
            placeholder="Looking for a guide to show us around Toronto! Interests are sports, breweries and shopping."
          />
        </LinearView>
        <LinearView containerStyle={styles.valueContainer}>
          <Text style={styles.headerTitle}>{'Details'}</Text>
          {/* WHEN */}
          <Text style={styles.label}>When</Text>
          <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <Text style={styles.dateText}>April 3–5, 2025</Text>
            <View style={[styles.row, {gap: wp(4)}]}>
              {/* <TouchableOpacity style={styles.tag}>
                <Text style={styles.tagText}>Fixed</Text>
              </TouchableOpacity> */}
              <TouchableOpacity style={[styles.tag, styles.redBorder]}>
                <Text style={styles.tagTextRed}>Dates Flexible</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          {/* LENGTH OPTIONS */}
          <Text style={styles.label}>Interests</Text>
          <View style={styles.rowWrap}>
            {['Breweries', 'Sports', 'Shopping'].map((item, index) => (
              <TouchableOpacity key={index} style={styles.disabledTag}>
                <Text style={styles.disabledText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.divider} />

          {/* LENGTH OPTIONS */}
          <Text style={styles.label}>Tags</Text>
          <View style={styles.rowWrap}>
            {['Full Day', 'Half Day', 'Small Group'].map((item, index) => (
              <TouchableOpacity key={index} style={styles.disabledTag}>
                <Text style={styles.disabledText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </LinearView>
        <Button
          onPress={() =>
            navigateTo(SCREEN_NAMES.ExperienceScreen, {submit: true})
          }
          title="Apply to be a Guide"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationDetails;

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
    marginTop: hp(18),
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
  },
  valueinput: {
    ...commonFontStyle(400, 14, colors._5A5757),
  },
  valueContainer: {
    padding: wp(16),
    gap: hp(10),
  },
  title: {
    ...commonFontStyle(700, 20, colors.black),
    marginBottom: hp(12),
  },
  label: {
    ...commonFontStyle(600, 16, colors._444444),
  },
  dateText: {
    ...commonFontStyle(600, 18, colors._BD2332),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tag: {
    borderRadius: wp(10),
    borderColor: colors._D9D9D9,
    borderWidth: 1,
    padding: wp(6),
  },
  redBorder: {
    borderWidth: 1,
    borderColor: colors._BD2332,
    backgroundColor: 'transparent',
  },
  tagText: {
    ...commonFontStyle(600, 14, colors._99999),
  },
  tagTextRed: {
    ...commonFontStyle(500, 13, colors._BD2332),
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(6),
  },
  disabledTag: {
    paddingVertical: hp(5),
    paddingHorizontal: wp(12),
    borderRadius: wp(18),
    borderWidth: 1,
    borderColor: colors._D9D9D9,
  },
  disabledText: {
    ...commonFontStyle(600, 14, colors._99999),
  },
  actionText: {
    ...commonFontStyle(600, 18, colors._BD2332),
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#1B151533',
    marginVertical: hp(8),
  },
  Scrollcontainer: {
    gap: hp(8),
  },
});
