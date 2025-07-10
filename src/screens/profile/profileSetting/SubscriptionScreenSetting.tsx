import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../../theme/appStyles';
import {CustomHeader, LinearView} from '../../../component';
import {colors} from '../../../theme/colors';
import {commonFontStyle, hp, wp} from '../../../theme/fonts';
import {IMAGES} from '../../../assets/Images';

type Props = {};

const features = [
  {
    icon: IMAGES.Tracking,
    title: 'Tracking',
    desc: 'Organize and automatically map past travels using your photo metadata.',
  },
  {
    icon: IMAGES.Monetize,
    title: 'Monetize',
    desc: 'Earn from listings. Free users keep 70% from each sale.',
  },
  {
    icon: IMAGES.Verified,
    title: 'Verified',
    desc: 'Showcase exclusive badges like “Verified” on your profile to highlight your travel expertise and inspire others.',
  },
  {
    icon: IMAGES.Planning,
    title: 'Planning',
    desc: 'Organize map out your upcoming trips.',
  },
  {
    icon: IMAGES.Reminders,
    title: 'Reminders',
    desc: 'Get reminders for upcoming trips to build excitement.',
  },
  {
    icon: IMAGES.Sharing,
    title: 'Sharing',
    desc: 'Share travel lists and follow curated lists from friends and influencers.',
  },
  {
    icon: IMAGES.my_location,
    title: 'Location-Based Recs',
    desc: 'Discover nearby attractions and dining options.',
  },
  {
    icon: IMAGES.explore,
    title: 'Explore Page',
    desc: 'Browse public Togolists from other users.',
  },
  {
    icon: IMAGES.notifications,
    title: 'Notifications',
    desc: 'Receive essential notifications for saved trips and list updates.',
  },
];

const features1 = [
  {
    icon: IMAGES.assignment_turned_in,
    title: 'Brand Partners',
    desc: 'Access our network of top restaurants, hotels and rewards programs. ',
  },
  {
    icon: IMAGES.notification_add,
    title: 'Experts',
    desc: 'Get personalized alerts for deals and events.',
  },
  {
    icon: IMAGES.workspace_premium,
    title: 'Personalized Recommendations',
    desc: 'Receive AI-driven suggestions tailored to your interests.',
  },
];

const plans1 = [
  {
    id: 'annual',
    title: 'Annual',
    subText: '$240',
    subTextYear: ' $49.99/year',
    price: '$6/month',
    showStrike: true,
  },
  {
    id: 'monthly',
    title: 'Monthly',
    subText: '',
    price: '$10/month',
    showStrike: false,
  },
];

const SubscriptionScreenSetting = (props: Props) => {
  const [selected, setSelected] = useState('annual');

  return (
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader  showBack={true} title="Settings" showSearch={false} showMore={false} />
      <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal: 16, flex: 1}}>
        <LinearView>
          <View style={{padding: 24}}>
            <Text style={styles.header}>Subscription</Text>
            <Text style={styles.header1}>Account Type</Text>
            <Text style={styles.proBadge}>Free User</Text>
            {features.map((item, index) => (
              <View key={index} style={styles.item}>
                <View style={styles.iconContainer}>
                  <Image source={item.icon} style={styles.icon} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </LinearView>
        <LinearView
          colors={['#BD2332', '#7D1721']}
          linearViewStyle={{marginTop: 8, marginBottom: 20}}>
          <View style={{padding: 16}}>
            <Text style={styles.headerText}>Togolist Pro</Text>
            <Text style={styles.headerText1}>
              {'Get the most out of Togolist with\na pro account. '}
            </Text>
            <View style={styles.planToggle}>
              {plans1.map((plan, index) => (
                <TouchableOpacity
                  key={plan.id}
                  style={[styles.row, {marginBottom: index == 0 ? 20 : 0}]}
                  onPress={() => setSelected(plan.id)}
                  activeOpacity={0.8}>
                  {/* Left Radio + Label */}
                  <View style={styles.left}>
                    <View style={styles.radioOuter}>
                      {selected === plan.id && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                    <View style={styles.textWrap}>
                      <Text style={styles.title1}>{plan.title}</Text>
                      {plan.subText ? (
                        <Text
                          style={[
                            styles.subText,
                            plan.showStrike && styles.strikeThrough,
                          ]}>
                          {plan.subText}{' '}
                          <Text style={{textDecorationLine: 'none'}}>
                            {plan.subTextYear}
                          </Text>
                        </Text>
                      ) : null}
                    </View>
                  </View>

                  {/* Right Price */}
                  <Text style={styles.price}>{plan.price}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {features1.map((item, index) => (
              <View key={index} style={styles.item}>
                <View style={styles.iconContainer2}>
                  <Image source={item.icon} style={styles.icon} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.title2}>{item.title}</Text>
                  <Text style={styles.description2}>{item.desc}</Text>
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.subscribeBtn}>
              <Text style={styles.subscribeText}>
                Subscribe for $49.99 / year
              </Text>
            </TouchableOpacity>
          </View>
        </LinearView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubscriptionScreenSetting;

const styles = StyleSheet.create({
  heading: {
    ...commonFontStyle(700, 24, colors.black),
    marginBottom: 20,
  },

  header: {
    ...commonFontStyle(700, 24, colors.black),
    marginBottom: 16,
  },
  header1: {
    ...commonFontStyle(600, 16, colors.black),
    textAlign: 'center',
  },
  proBadge: {
    backgroundColor: colors.white,
    // paddingHorizontal: 8,
    // paddingVertical: 4,
    borderRadius: 8,
    ...commonFontStyle(500, 14, colors.primary1),
    borderWidth: 1,
    borderColor: colors.primary1,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 10,
    paddingVertical: 3,
    paddingHorizontal: 12,
    marginBottom: 8,
  },

  item: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  iconContainer: {
    width: wp(44),
    height: wp(44),
    borderRadius: 15,
    backgroundColor: '#363636',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
    ...commonFontStyle(700, 16, colors.black),
  },
  description: {
    ...commonFontStyle(600, 12, '#787878'),
  },

  planToggle: {
    marginTop: 8,
    borderRadius: 16,
    padding: 16,
    backgroundColor: colors.white,
  },
  subscribeBtn: {
    marginTop: 20,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  subscribeText: {
    ...commonFontStyle(700, 16, colors.primary1),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 14,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.black,
  },
  textWrap: {
    flexDirection: 'column',
  },
  title1: {
    ...commonFontStyle(700, 16, colors.black),
  },
  subText: {
    ...commonFontStyle(600, 12, '#444444'),
    marginTop: 2,
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
  },
  price: {
    ...commonFontStyle(700, 16, "#787878"),
  },
  headerText: {
    ...commonFontStyle(700, 18, colors.white),
    marginBottom: 4,
  },
  headerText1: {
    ...commonFontStyle(400, 16, colors.white),
  },

  iconContainer2: {
    width: wp(44),
    height: wp(44),
    borderRadius: 15,
    backgroundColor: '#00000040',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title2: {
    marginBottom: 4,
    ...commonFontStyle(700, 16, colors.white),
  },
  description2: {
    ...commonFontStyle(600, 12, colors.white),
  },
});
