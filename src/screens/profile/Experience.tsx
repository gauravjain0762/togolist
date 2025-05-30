import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useMemo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {Button, CustomHeader, GradientBtn, LinearView} from '../../component';
import {IMAGES} from '../../assets/Images';
import {SCREEN_WIDTH, commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import Swiper from 'react-native-swiper';
import {SwiperData} from '../../utils/constents';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';

const Experience = () => {
  const slides = useMemo(() => {
    // This will only re-compute if `data` changes.
    // If `data` is static, this will run only once.
    return SwiperData?.map((item, index) => (
      <ImageBackground
        source={item?.images} // Ensure `item.images` is a valid image source
        resizeMode="cover"
        key={item?.name || `slide-${index}`} // Use a unique and stable key
        style={styles.slider}>
        <Text style={styles.title}>{item?.name}</Text>
        <Text style={styles.text}>{item?.info}</Text>
      </ImageBackground>
    ));
  }, [SwiperData]);

  const reviewSlider = useMemo(() => {
    return SwiperData?.map((item, index) => (
      <ImageBackground
        source={item?.images}
        resizeMode="cover"
        key={item?.name || `slide-${index}`} // Use a unique and stable key
        style={[styles.slider, {gap: hp(10)}]}>
        <Text style={styles.title}>{'10 Days in Mexico'}</Text>
        <View style={[AppStyles.Hcenter, {gap: hp(4)}]}>
          <Text style={styles.label}>{'$15 USD'}</Text>
          <Text style={styles.label}>{'Length: 10 Days'}</Text>
        </View>
        <View style={styles.acinfo}>
          <View style={styles.userinfo}>
            <Text style={styles.label}>{'By:'}</Text>
            <Image source={IMAGES.avatar} style={styles.user} />
            <Text style={styles.label}>@emily</Text>
            <Image source={IMAGES.pin} style={styles.pin} />
          </View>
          <Text style={styles.label}>
            {
              'The perfect guide to 10 days in Mexico mixing beach, adventure and play.'
            }
          </Text>
          <View
            style={[
              AppStyles.row,
              {gap: wp(8), marginTop: hp(10), marginBottom: hp(40)},
            ]}>
            <Text style={[styles.label, styles.review]}>{'Reviews (13)'}</Text>
            <View style={styles.raticontainer}>
              <Image style={styles.rating} source={IMAGES.ratingfill} />
              <Image style={styles.rating} source={IMAGES.ratingfill} />
              <Image style={styles.rating} source={IMAGES.ratingfill} />
              <Image style={styles.rating} source={IMAGES.ratingfill} />
              <Image style={styles.rating} source={IMAGES.rating} />
            </View>
          </View>
        </View>
      </ImageBackground>
    ));
  }, [SwiperData]);

  return (
    <SafeAreaView style={[AppStyles.flex, styles.mainContainer]}>
      <CustomHeader
        backImg={IMAGES.back1}
        backIconStyle={styles.back}
        showSearch={false}
        showMore={false}
        title="Profile"
        titleStyle={styles.headertitle}
      />
      <ScrollView
        contentContainerStyle={[AppStyles.flexGrow, {gap: hp(8)}]}
        showsVerticalScrollIndicator={false}
        style={styles.scroll}>
        <ImageBackground
          source={IMAGES.intro1}
          resizeMode="cover"
          imageStyle={styles.img}
          style={styles.slide1}>
          <Text style={styles.title}>{'Listings'}</Text>
          <Text style={styles.text}>
            {'Create itineraries and experiences to earn with Togolist.'}
          </Text>
        </ImageBackground>
        <LinearView>
          <Text style={styles.container}>{'Create. Explore. Connect.'}</Text>
          <View style={styles.cardrow}>
            <View style={styles.card}>
              <Image
                source={IMAGES.intro2}
                resizeMode="cover"
                style={styles.cardimg}
              />
              <Text style={styles.cardlabel}>{'Experiences'}</Text>
              <Text style={styles.info}>
                {'Share what you love by hosting unforgettable experiences.'}
              </Text>
            </View>
            <View style={styles.card}>
              <Image
                source={IMAGES.intro2}
                resizeMode="cover"
                style={styles.cardimg}
              />
              <Text style={styles.cardlabel}>{'Itineraries'}</Text>
              <Text style={styles.info}>
                {
                  'Create curated  itineraries to plan epic trips for fellow travellers.'
                }
              </Text>
            </View>
            <View style={styles.card}>
              <Image
                source={IMAGES.intro2}
                resizeMode="cover"
                style={styles.cardimg}
              />
              <Text style={styles.cardlabel}>{'Local Guide'}</Text>
              <Text style={styles.info}>
                {
                  'Apply to guide requests to share your local insights across the globe.'
                }
              </Text>
            </View>
          </View>
        </LinearView>
        <LinearView>
          <Text style={styles.container}>{'What Will You Share?'}</Text>
          <View style={styles.sliderContainer}>
            <Swiper
              paginationStyle={styles.paginationStyle}
              dotColor={colors._BD2332_0_3}
              activeDotColor={colors._BD2332}
              style={styles.wrapper}>
              {slides}
            </Swiper>
          </View>
        </LinearView>
        <LinearView>
          <Text style={styles.container}>{'List what you love.'}</Text>
          <View style={styles.sliderContainer}>
            <Swiper
              paginationStyle={styles.paginationStyle}
              dotColor={colors._BD2332_0_3}
              activeDotColor={colors._BD2332}
              style={[styles.wrapper, {height: hp(340)}]}>
              {reviewSlider}
            </Swiper>
          </View>
        </LinearView>

        <LinearView>
          <Text style={styles.container}>{'Apply to requests.'}</Text>
          <ImageBackground
            style={styles.request}
            imageStyle={styles.requestImg}
            source={IMAGES.intro4}>
            <Text style={styles.title}>{'Guide to Toronto'}</Text>
            <View style={styles.location}>
              <Image source={IMAGES.wordWide} style={styles.marker} />
              <Text style={styles.address}>{'Toronto, Canada'}</Text>
            </View>
            <Text style={styles.date}>{'April 3-5, 2025'}</Text>
            <Text style={styles.requesttitle}>
              {
                'Looking for a guide to show us around Toronto! Interests are sports, breweries and shopping.'
              }
            </Text>
            <Button
              onPress={() => navigateTo(SCREENS.GuideRequest)}
              BtnStyle={styles.btn}
              title="Apply to be a Guide"
            />
          </ImageBackground>
        </LinearView>

        <LinearView>
          <Text style={styles.container}>{'Listing Perks'}</Text>
          <View style={styles.perkscontainer}>
            <View style={styles.perksList}>
              <Image source={IMAGES.perks1} style={styles.perksicon} />
              <View style={styles.right}>
                <Text style={styles.perks}>{'Monetize'}</Text>
                <Text style={styles.perksinfo}>
                  {'Earn up to 85% from each listing sale.'}
                </Text>
              </View>
            </View>
            <View style={styles.perksList}>
              <Image source={IMAGES.perks2} style={styles.perksicon} />
              <View style={styles.right}>
                <Text style={styles.perks}>{'Get Discovered'}</Text>
                <Text style={styles.perksinfo}>
                  {'Connect with travellers across the globe.'}
                </Text>
              </View>
            </View>
            <View style={styles.perksList}>
              <Image source={IMAGES.perks3} style={styles.perksicon} />
              <View style={styles.right}>
                <Text style={styles.perks}>{'On The Go'}</Text>
                <Text style={styles.perksinfo}>
                  {'Find opportunities where ever you are.'}
                </Text>
              </View>
            </View>
            <View style={styles.perksList}>
              <Image source={IMAGES.perks4} style={styles.perksicon} />
              <View style={styles.right}>
                <Text style={styles.perks}>{'Boost Listings'}</Text>
                <Text style={styles.perksinfo}>
                  {
                    'Promote your listings both on and off Togolist to maximize your earnings.'
                  }
                </Text>
              </View>
            </View>
          </View>
        </LinearView>
        <LinearView>
          <Text style={styles.container}>{'FAQs'}</Text>
          <View style={styles.questioncontainor}>
            <View>
              <Text style={styles.question}>
                {'What kind of experiences can I host?'}
              </Text>
            </View>
            <View>
              <Text style={styles.question}>{'How do I get paid?'}</Text>
            </View>
            <View>
              <Text style={styles.question}>
                {'Can I list something for free?'}
              </Text>
            </View>
            <View>
              <Text style={styles.question}>
                {'What makes a great listing?'}
              </Text>
            </View>
          </View>
        </LinearView>
        <GradientBtn BtnStyle={styles.bottombtn} title="Coming Soon..." />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Experience;

const styles = StyleSheet.create({
  back: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
  scroll: {
    flex: 1,
    paddingHorizontal: wp(16),
  },
  headertitle: {
    ...commonFontStyle(600, 17, colors._787878),
    marginLeft: 0,
  },
  text: {
    ...commonFontStyle(700, 20, colors.white),
    textAlign: 'center',
    paddingHorizontal: wp(26),
  },
  title: {
    ...commonFontStyle(700, 40, colors.white),
    textAlign: 'center',
  },
  slide1: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp(16),
    height: hp(600),
  },
  img: {
    borderRadius: 20,
  },
  container: {
    ...commonFontStyle(700, 24, colors._1B1515),
    paddingHorizontal: wp(24),
    marginTop: hp(24),
  },
  mainContainer: {
    backgroundColor: colors.white,
  },
  cardlabel: {
    ...commonFontStyle(600, 16, colors.black),
    textAlign: 'center',
  },
  cardimg: {
    height: wp(200),
    width: 'auto',
    borderRadius: 20,
  },
  info: {
    ...commonFontStyle(600, 12, colors._787878),
    textAlign: 'center',
  },
  cardrow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: wp(8),
    paddingHorizontal: wp(16),
    marginBottom: hp(16),
    marginTop: hp(16),
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    gap: wp(8),
  },
  paginationStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    left: wp(SCREEN_WIDTH / 2 - 80),
    right: wp(SCREEN_WIDTH / 2 - 80),
    paddingVertical: hp(6),
    borderRadius: 100,
    bottom: hp(30),
  },
  wrapper: {
    height: hp(500),
  },
  sliderContainer: {
    margin: wp(16),
    flex: 1,
    borderRadius: wp(20),
    overflow: 'hidden',
  },
  slider: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp(16),
  },
  label: {
    ...commonFontStyle(600, 14, colors.white),
  },
  user: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
  userinfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },
  pin: {
    width: wp(11),
    height: wp(15),
    resizeMode: 'contain',
  },
  acinfo: {
    alignSelf: 'flex-start',
    gap: hp(10),
    paddingHorizontal: wp(15),
  },
  review: {
    ...commonFontStyle(500, 16, colors.white),
  },
  rating: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
  raticontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
  },
  request: {
    flex: 1,
    height: hp(340),
    margin: wp(16),
    justifyContent: 'center',
    paddingHorizontal: wp(20),
  },
  requestImg: {borderRadius: 20},
  address: {
    ...commonFontStyle(500, 12, colors.white),
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    justifyContent: 'center',
    marginTop: hp(2),
  },
  marker: {
    resizeMode: 'contain',
    width: wp(14),
    height: wp(14),
    tintColor: colors.white,
  },
  date: {
    marginTop: hp(10),
    textAlign: 'center',
    ...commonFontStyle(600, 18, colors.white),
  },
  requesttitle: {
    ...commonFontStyle(400, 14, colors.white),
    marginTop: hp(10),
    textAlign: 'center',
    marginBottom: hp(10),
  },
  btn: {
    paddingVertical: hp(8),
  },
  perkscontainer: {
    padding: wp(16),
    flex: 1,
  },
  perksList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(14),
    paddingHorizontal: wp(16),
    paddingVertical: hp(8),
    borderBottomWidth: 1,
    borderColor: '#7878781A',
    flex: 1,
  },
  perksicon: {
    resizeMode: 'contain',
    width: wp(44),
    height: wp(44),
  },
  perks: {
    ...commonFontStyle(600, 16, colors.black),
  },
  perksinfo: {
    ...commonFontStyle(600, 12, colors._787878),
  },
  right: {
    gap: hp(6),
    flex: 1,
  },
  question: {
    ...commonFontStyle(600, 16, colors.black),
    paddingVertical: hp(8),
    borderBottomWidth: 1,
    borderColor: '#7878781A',
  },
  questioncontainor: {
    paddingHorizontal: wp(16),
    gap: hp(8),
    marginVertical: hp(16),
  },
  bottombtn: {
    marginBottom: hp(13),
  },
});
