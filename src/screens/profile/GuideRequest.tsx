import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {AppStyles} from '../../theme/appStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';
import {Fs, commonFontStyle, hp, wp} from '../../theme/fonts';
import {Button, CustomHeader, GradientBtn, LinearView} from '../../component';
import {IMAGES} from '../../assets/Images';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';

const GuideRequest = () => {
  return (
    <SafeAreaView style={[AppStyles.flex, styles.mainContainer]}>
      <CustomHeader
       showBack={true}
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
          source={IMAGES.intro4}
          resizeMode="cover"
          imageStyle={styles.img}
          style={styles.slide1}>
          <Text style={styles.title}>{'Guide Request'}</Text>
          <Text style={styles.text}>
            {'Travel like a local with Togolist guide requests.'}
          </Text>
        </ImageBackground>
        <LinearView>
          <Text style={styles.container}>{'Request a guide.'}</Text>
          <ImageBackground
            style={styles.request}
            imageStyle={styles.requestImg}
            source={IMAGES.intro1}>
            <Text style={[styles.title, {fontSize: Fs(24)}]}>
              {'Guide to Toronto'}
            </Text>
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
              title="Request Published"
            />
          </ImageBackground>
        </LinearView>
        <LinearView>
          <Text style={styles.container}>{'How it Works.'}</Text>
          <View style={styles.perkscontainer}>
            <View style={styles.perksList}>
              <Image source={IMAGES.perks1} style={styles.perksicon} />
              <View style={styles.right}>
                <Text style={styles.perks}>{'Free Requests'}</Text>
                <Text style={styles.perksinfo}>
                  {'Unlimited free requests. Pay only for bookings.'}
                </Text>
              </View>
            </View>
            <View style={styles.perksList}>
              <Image source={IMAGES.perks2} style={styles.perksicon} />
              <View style={styles.right}>
                <Text style={styles.perks}>{'Select a Guide'}</Text>
                <Text style={styles.perksinfo}>
                  {
                    'Guides apply to your request so you can find the perfect match.'
                  }
                </Text>
              </View>
            </View>
            <View style={styles.perksList}>
              <Image source={IMAGES.perks3} style={styles.perksicon} />
              <View style={styles.right}>
                <Text style={styles.perks}>{'Secure'}</Text>
                <Text style={styles.perksinfo}>
                  {
                    'Only key travel details including dates and location are shared to ensure privacy.'
                  }
                </Text>
              </View>
            </View>
            <View style={styles.perksList}>
              <Image source={IMAGES.perks4} style={styles.perksicon} />
              <View style={styles.right}>
                <Text style={styles.perks}>{'On The Go'}</Text>
                <Text style={styles.perksinfo}>
                  {'Connect with guides anywhere in th world'}
                </Text>
              </View>
            </View>
          </View>
        </LinearView>
        <LinearView>
          <Text style={styles.container}>{'FAQs'}</Text>
          <View style={styles.questioncontainor}>
            <View>
              <Text style={styles.question}>{'How do requests work?'}</Text>
            </View>
            <View>
              <Text style={styles.question}>{'How much does it cost?'}</Text>
            </View>
            <View>
              <Text style={styles.question}>{'Who can respond?'}</Text>
            </View>
          </View>
        </LinearView>
        <GradientBtn BtnStyle={styles.bottombtn} title="Coming Soon..." />
      </ScrollView>
    </SafeAreaView>
  );
};

export default GuideRequest;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.white,
  },
  back: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
  scroll: {
    flex: 1,
    paddingHorizontal: wp(16),
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
  text: {
    ...commonFontStyle(700, 20, colors.white),
    textAlign: 'center',
    paddingHorizontal: wp(26),
  },
  title: {
    ...commonFontStyle(700, 40, colors.white),
    textAlign: 'center',
  },
  container: {
    ...commonFontStyle(700, 24, colors._1B1515),
    paddingHorizontal: wp(24),
    marginTop: hp(24),
  },
  btn: {
    paddingVertical: hp(8),
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
  headertitle: {
    ...commonFontStyle(600, 17, colors._787878),
    marginLeft: 0,
  },
  marker: {
    resizeMode: 'contain',
    width: wp(14),
    height: wp(14),
    tintColor: colors.white,
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
