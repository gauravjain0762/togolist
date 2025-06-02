import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {CustomHeader, LinearView} from '../../component';
import {IMAGES} from '../../assets/Images';
import {SCREEN_WIDTH, commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import Swiper from 'react-native-swiper';
import {SwiperData} from '../../utils/constents';

const FoodPlace = () => {
  const slides = useMemo(() => {
    // This will only re-compute if `data` changes.
    return SwiperData?.map((item, index) => (
      <Image
        source={item?.images} // Ensure `item.images` is a valid image source
        resizeMode="cover"
        key={item?.name || `slide-${index}`} // Use a unique and stable key
        style={styles.slider}
      />
    ));
  }, [SwiperData]);

  return (
    <SafeAreaView style={[AppStyles.flex, styles.maincontainer]}>
      <CustomHeader
        backImg={IMAGES.back1}
        backIconStyle={styles.back}
        showSearch={false}
        moreImg={IMAGES.more}
        moreIconStyle={styles.more}
        headerStyle={styles.header}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text style={styles.title}>La Perla Cocina</Text>
          <View style={styles.locationContainer}>
            <Image
              source={IMAGES.location}
              style={{width: wp(24), height: wp(24), resizeMode: 'contain'}}
            />
            <Text style={styles.locationText}>
              7007 Friars Rd. San Diego, CA
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Image
                source={IMAGES.location}
                style={{width: wp(18), height: wp(18), resizeMode: 'contain'}}
              />
              <Text style={styles.buttonText}>Place</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.emoji}>🧑‍🍳</Text>
              <Text style={styles.buttonText}>Food</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sliderContainer}>
            <Swiper
              paginationStyle={styles.paginationStyle}
              dotColor={colors._BD2332_0_3}
              activeDotColor={colors._BD2332}
              style={styles.wrapper}>
              {slides}
            </Swiper>
          </View>
          <View style={[AppStyles.row, styles.features]}>
            <TouchableOpacity style={[styles.optionItem]}>
              <Image style={styles.check} source={IMAGES.been} />
              <Text style={[styles.optionText]}>{'Been There'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionItem]}>
              <Image style={styles.add} source={IMAGES.newList} />
              <Text style={[styles.optionText]}>{'Add to list'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionItem]}>
              <Image style={styles.fav} source={IMAGES.fav} />
              <Text style={[styles.optionText]}>{'Favs'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.BusinessInfoBar}>
            {/* HOURS */}
            <View style={styles.infoBlock}>
              <Text style={styles.label}>HOURS</Text>
              <Text style={styles.openText}>OPEN</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* RANK */}
            <View style={styles.infoBlock}>
              <Text style={styles.label}>RANK</Text>
              <View style={styles.inlineRow}>
                <Image
                  source={IMAGES.top}
                  style={{width: wp(17), height: hp(24), resizeMode: 'contain'}}
                />
                <Text style={styles.rankText}>Top</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* LIST ADDS */}
            <View style={styles.infoBlock}>
              <Text style={styles.label}>LIST ADDS</Text>
              <View style={styles.inlineRow}>
                <Image
                  source={IMAGES.newList}
                  resizeMode="contain"
                  style={{
                    width: wp(18),
                    height: hp(25),
                    tintColor: colors.black,
                  }}
                />
                <Text style={styles.listCount}>276</Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* DISTANCE */}
            <View style={styles.infoBlock}>
              <Text style={styles.label}>DISTANCE</Text>
              <View style={styles.inlineRow}>
                <Image
                  source={IMAGES.distance}
                  resizeMode="contain"
                  style={{width: wp(20), height: wp(20)}}
                />
                <Text style={styles.distance}>14 mi</Text>
              </View>
            </View>
          </View>
          <LinearView containerStyle={styles.linearview}>
            <Text style={styles.review}>
              Fashion Valley is an upscale, open-air shopping mall in Mission
              Valley in San Diego, California. The shopping center hosts
              1,720,533 sq ft of leasable floor area, making it the largest mall
              in San Diego and one of the...
            </Text>
            <View style={styles.footer}>
              <Text style={styles.review}>{'4.5'}</Text>
              <View style={AppStyles.row}>
                <Image
                  source={IMAGES.star}
                  style={styles.star}
                  resizeMode="contain"
                />
                <Image
                  source={IMAGES.star}
                  style={styles.star}
                  resizeMode="contain"
                />
                <Image
                  source={IMAGES.star}
                  style={styles.star}
                  resizeMode="contain"
                />
                <Image
                  source={IMAGES.star}
                  style={styles.star}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.googlereview}>{'16k Google reviews'}</Text>
            </View>
          </LinearView>
          <LinearView>
            <Text style={styles.headerTitle}>{'Hours'}</Text>
            <View style={[AppStyles.row, styles.dateContainor]}>
              <View>
                <Text style={styles.day}>{'9:00am - 8:00pm'}</Text>
                <Text style={styles.Open}>{'Open'}</Text>
              </View>
              <TouchableOpacity>
                <Image source={IMAGES.dropdown} style={styles.down} />
              </TouchableOpacity>
            </View>
          </LinearView>
          <LinearView>
            <Text style={styles.headerTitle}>{'Details'}</Text>
            <View style={styles.infoContainor}>
              <Text style={styles.fildlabel}>{'Phone'}</Text>
              <Text style={styles.value}>{'+1 (888) 888-8080'}</Text>
              <View style={styles.horizontal_divider} />
            </View>
            <View style={styles.infoContainor}>
              <Text style={styles.fildlabel}>{'Website'}</Text>
              <Text style={styles.value}>{'calibbqfestival.com'}</Text>
              <View style={styles.horizontal_divider} />
            </View>
            <View style={[styles.infoContainor, styles.website]}>
              <Text style={styles.fildlabel}>{'Website'}</Text>
              <Text style={[styles.value, {color: colors.black}]}>
                {'7007 Friars Rd San Diego, CA 90000 United States'}
              </Text>
            </View>
          </LinearView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FoodPlace;

const styles = StyleSheet.create({
  maincontainer: {
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
  header: {
    paddingHorizontal: wp(16),
  },
  container: {
    padding: wp(16),
    backgroundColor: colors.white,
    gap: hp(10),
    flex: 1,
  },
  title: {
    ...commonFontStyle(700, 32, colors.black),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp(4),
  },
  locationText: {
    ...commonFontStyle(600, 14, colors._999999),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: wp(10),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: hp(10),
    paddingHorizontal: wp(16),
    borderWidth: 1,
    borderColor: '#1B151533',
  },
  buttonText: {
    marginLeft: 6,
    ...commonFontStyle(600, 15, colors.black),
  },
  emoji: {
    fontSize: 18,
  },
  sliderContainer: {
    height: hp(500),
  },
  paginationStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    left: wp(SCREEN_WIDTH / 2 - 80),
    right: wp(SCREEN_WIDTH / 2 - 80),
    paddingVertical: hp(6),
    borderRadius: 100,
    bottom: hp(30),
  },
  wrapper: {},
  slider: {
    flex: 1,
    width: SCREEN_WIDTH,
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
  BusinessInfoBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hp(8),
  },
  infoBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: hp(4),
  },
  label: {
    ...commonFontStyle(600, 12, colors._999999),
  },
  openText: {
    ...commonFontStyle(700, 14, 'green'),
  },
  rankText: {
    ...commonFontStyle(600, 14, 'crimson'),
  },
  listCount: {
    ...commonFontStyle(600, 14, colors.black),
  },
  distance: {
    ...commonFontStyle(600, 14, colors.black),
  },
  divider: {
    height: '70%',
    width: 1,
    backgroundColor: colors.lightGray,
    marginHorizontal: 6,
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },
  linearview: {
    padding: wp(20),
  },
  review: {
    ...commonFontStyle(500, 16, colors.black),
  },
  star: {
    width: wp(24),
    height: wp(24),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginTop: hp(10),
  },
  googlereview: {
    ...commonFontStyle(500, 14, colors._787878),
  },
  headerTitle: {
    ...commonFontStyle(700, 24, colors.black),
    padding: wp(18),
    paddingBottom: hp(4),
  },
  down: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'contain',
  },
  day: {
    ...commonFontStyle(600, 18, colors.black),
  },
  Open: {
    ...commonFontStyle(600, 18, '#26C243'),
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
  fildlabel: {
    ...commonFontStyle(600, 16, colors._444444),
  },
});
