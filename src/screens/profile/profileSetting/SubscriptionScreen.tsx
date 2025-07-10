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
import EditPicture from '../../../component/common/EditPicture';
import ImagePickerModal from '../../../component/profile/ImagePickerModal';

type Props = {};

const plans = [
  {
    title: 'Free',
    isCurrent: true,
    price: '',
    description:
      'Perfect for casual travelers and creators just getting started. List, plan, and explore without limits.',
  },
  {
    title: 'Pro',
    isCurrent: false,
    price: '$20/month or $49.99/year',
    description:
      'Built for serious travelers and creators. Unlock powerful tools, earn more, and get seen.',
  },
];

const featureList = [
  {label: 'Unlimited Listings', free: true, pro: true},
  {label: 'Unlimited Lists', free: true, pro: true},
  {label: 'Unlimited Trips', free: true, pro: true},
  {label: 'Pro Earnings (85%)', free: false, pro: true},
  {label: 'AI-Assisted Trip Planning', free: false, pro: true},
  {label: 'Track Travel Stats', free: false, pro: true},
  {label: 'Boosted Listing Visibility', free: false, pro: true},
  {label: '100% Ad-Free', free: false, pro: true},
];

const plans1 = [
  {
    id: 'annual',
    title: 'Annual',
    subText: '$240',
    subTextYear: ' $49/year',
    price: '$4.20/month',
    showStrike: true,
  },
  {
    id: 'monthly',
    title: 'Monthly',
    subText: '',
    price: '$20/month',
    showStrike: false,
  },
];

const SubscriptionScreen = (props: Props) => {
  const [userEdit, setUserEdit] = useState(false);
  const [actionSheet, setActionSheet] = useState(false);
  const [selected, setSelected] = useState('annual');

  const [useData, setUserData] = useState({
    name: 'Emily',
    useName: 'Emily',
    location: 'Toronto, Canada',
  });

  const handlePress = (id: string) => {
    console.log(`Pressed: ${id}`);
    // Navigate or trigger logic based on `id`
  };

  return (
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader  showBack={true} title="Settings" showSearch={false} showMore={false} />
      <ScrollView style={{marginHorizontal: 16, flex: 1}} showsVerticalScrollIndicator={false}>
        <LinearView>
          <View style={{padding: 16}}>
            <Text style={styles.heading}>Subscription</Text>
            {plans.map((plan, index) => (
              <View key={index} style={styles.planContainer}>
                <View style={styles.headerRow}>
                  <Text style={[commonFontStyle(700, 20, colors.black)]}>
                    {plan.title}
                  </Text>
                  {plan.isCurrent ? (
                    <View style={styles.currentBadge}>
                      <Text style={styles.badgeText}>Current</Text>
                    </View>
                  ) : (
                    <Text style={styles.priceText}>{plan.price}</Text>
                  )}
                </View>
                <Text style={styles.description}>{plan.description}</Text>
              </View>
            ))}
          </View>
        </LinearView>
        <View style={{height: hp(8)}} />
        <LinearView>
          <View style={{padding: 16}}>
            <Text style={styles.header}>
              Try Pro free for 7 days.{'\n'}Cancel anytime.
            </Text>

            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={[styles.featureTitle, {flex: 2}]}>Features</Text>
                <Text style={styles.columnLabel}>Free</Text>
                <Text style={styles.columnLabel}>Pro</Text>
              </View>

              {featureList.map((feature, idx) => (
                <View key={idx} style={styles.row}>
                  <Text style={[styles.featureLabel, {flex: 2}]}>
                    {feature.label}
                  </Text>
                  <View style={styles.iconWrap}>
                    <Image
                      source={
                        feature.free ? IMAGES.right_icon : IMAGES.close_icon
                      }
                      style={{width: wp(20), height: wp(20)}}
                    />
                  </View>
                  <View style={styles.iconWrap}>
                    <Image
                      source={
                        feature.pro ? IMAGES.right_icon : IMAGES.close_icon
                      }
                      style={{width: wp(20), height: wp(20)}}
                    />
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.planToggle}>
              {plans1.map(plan => (
                <TouchableOpacity
                  key={plan.id}
                  style={styles.row}
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
                      <Text style={styles.title}>{plan.title}</Text>
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

            <TouchableOpacity style={styles.subscribeBtn}>
              <Text style={styles.subscribeText}>
                Subscribe for $49.99 / year
              </Text>
            </TouchableOpacity>
          </View>
        </LinearView>
        <View style={{height: hp(90)}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  heading: {
    ...commonFontStyle(700, 24, colors.black),
    marginBottom: 20,
    marginTop: 8,
  },
  planContainer: {
    marginBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  currentBadge: {
    borderWidth: 1,
    borderColor: colors.primary1,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: colors.white,
  },
  badgeText: {
    ...commonFontStyle(500, 14, colors.primary1),
  },
  priceText: {
    ...commonFontStyle(500, 14, colors.primary1),
  },
  description: {
    marginTop: 10,
    lineHeight: 22,
    ...commonFontStyle(500, 16, colors.black),
  },

  header: {
    ...commonFontStyle(600, 20, colors.primary1),
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 16,
  },
  table: {
    borderRadius: 12,
    padding: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  featureTitle: {
    ...commonFontStyle(600, 20, colors.primary1),
  },
  columnLabel: {
    flex: 1,
    ...commonFontStyle(600, 16, colors.black),
    textAlign: 'center',
  },
  featureLabel: {
    ...commonFontStyle(500, 16, colors.black),
  },
  iconWrap: {
    flex: 1,
    alignItems: 'center',
  },
  planToggle: {
    marginTop: 20,
    borderRadius: 16,
    padding: 10,
    backgroundColor: '#7878800D',
  },
  subscribeBtn: {
    marginTop: 20,
    backgroundColor: colors.primary1,
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  subscribeText: {
    ...commonFontStyle(600, 16, colors.white),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
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
  title: {
    ...commonFontStyle(700, 16, colors.black),
  },
  subText: {
    ...commonFontStyle(600, 12, "#444444"),
    marginTop: 2,
  },
  strikeThrough: {
    textDecorationLine: 'line-through',
  },
  price: {
    ...commonFontStyle(700, 16, colors.black),
  },
});
