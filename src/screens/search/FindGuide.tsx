import {
  FlatList,
  ImageBackground,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {CustomHeader, ExploreProfileCard, LinearView} from '../../component';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';

const FindGuide = () => {
  const [isFilter, setIsFilter] = useState(false);

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

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
        title="Explore"
      />
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>Find a Guide</Text>
        <TouchableOpacity>
          <Text style={styles.headerText1}>Toronto, Canada</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerRow}>
        <Text style={styles.headerDate}>April 3-5, 2025</Text>
        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setIsFilter(!isFilter);
          }}>
          <Text style={styles.headerText2}>Filters</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {isFilter && (
          <LinearView containerStyle={[styles.valueContainer]}>
            <Text style={styles.label}>When</Text>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <Text style={styles.dateText}>April 3–5, 2025</Text>
              <View style={[styles.row, {gap: wp(4)}]}>
                <TouchableOpacity style={styles.tag}>
                  <Text style={styles.tagText}>Fixed</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tag, styles.redBorder]}>
                  <Text style={styles.tagTextRed}>Dates Flexible</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.divider} />

            {/* LENGTH OPTIONS */}
            <Text style={styles.label}>Select Length Options</Text>
            <View style={styles.rowWrap}>
              {['Multiday', 'Full Day', 'Half Day', 'Half Day'].map(
                (item, index) => (
                  <TouchableOpacity key={index} style={styles.disabledTag}>
                    <Text style={styles.disabledText}>{item}</Text>
                  </TouchableOpacity>
                ),
              )}
            </View>

            {/* GROUP SIZE */}
            <Text style={styles.label}>Group Size</Text>
            <Text style={styles.actionText}>4-6 Guests</Text>

            <View style={styles.divider} />

            {/* INTERESTS */}
            <Text style={styles.label}>Interests (Max 3)</Text>
            <Text style={styles.actionText}>Set Interests</Text>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() => setIsFilter(!isFilter)}
                style={styles.applyBtn}>
                <Text style={styles.btnText}>Apply Filters</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.reset}>Reset All</Text>
              </TouchableOpacity>
            </View>
          </LinearView>
        )}
      </View>

      <View style={styles.container}>
        <FlatList
          data={[1, 2, 3, 4]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{gap: wp(4), paddingVertical: hp(10)}}
          renderItem={({item, index}) => {
            return index == 2 ? (
              <>
                <ImageBackground
                  imageStyle={styles.moreImge}
                  source={IMAGES.bg}
                  style={styles.moreBg}>
                  <Text style={styles.lookingTitle}>{'Looking for More?'}</Text>
                  <Text style={styles.discription}>
                    {
                      'Submit a request for TogoList to connect with local hosts from your destination.'
                    }
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigateTo(SCREENS.RequestHost)}
                    style={styles.hostbtn}>
                    <Text style={styles.hosttitle}>{'Become a Host'}</Text>
                  </TouchableOpacity>
                </ImageBackground>
                <ExploreProfileCard />
              </>
            ) : (
              <ExploreProfileCard />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default FindGuide;

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
    width: 22,
    height: 22,
  },
  header: {
    paddingHorizontal: wp(16),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: wp(22),
  },

  headerText: {
    ...commonFontStyle(700, 24, colors._1B1515),
    flex: 1,
  },
  headerText1: {
    ...commonFontStyle(400, 14, colors._787878),
  },
  headerDate: {
    ...commonFontStyle(600, 18, colors._5A5757),
    flex: 1,
  },
  headerText2: {
    ...commonFontStyle(600, 14, colors._444444),
  },
  container: {
    paddingHorizontal: wp(12),
    flex: 1,
  },
  moreImge: {
    borderRadius: 20,
    flex: 1,
  },
  moreBg: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(143),
    marginBottom: hp(10),
    paddingHorizontal: wp(16),
    gap: hp(8),
  },
  lookingTitle: {
    ...commonFontStyle(700, 24, colors.white),
  },
  discription: {
    ...commonFontStyle(700, 16, colors.white),
    textAlign: 'center',
  },
  hostbtn: {
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  hosttitle: {
    ...commonFontStyle(600, 12, colors._444444),
    paddingVertical: hp(8),
    paddingHorizontal: wp(12),
  },
  valueContainer: {
    paddingHorizontal: wp(16),
    paddingTop: hp(16),
    gap: hp(10),
    paddingVertical: hp(16),
    // marginHorizontal: wp(12),
  },
  headerTitle: {
    ...commonFontStyle(700, 24, colors.black),
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
  filterContainer: {
    paddingHorizontal: wp(12),
  },
  btnText: {
    ...commonFontStyle(600, 12, colors._444444),
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  applyBtn: {
    backgroundColor: colors.white,
    paddingVertical: hp(8),
    paddingHorizontal: wp(12),
    borderRadius: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  reset: {
    ...commonFontStyle(600, 12, colors._444444),
  },
});
