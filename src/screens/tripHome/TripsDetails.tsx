import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {SCREEN_WIDTH, commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {CustomHeader, LinearView} from '../../component';
import {IMAGES} from '../../assets/Images';

const TripsDetails = () => {
  return (
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader
        backImg={IMAGES.back1}
        backIconStyle={styles.back}
        showSearch={false}
        moreImg={IMAGES.more_icon}
        moreIconStyle={styles.more}
        headerStyle={styles.header}
        title="Trips"
      />
      <ScrollView
        style={{flex: 1, backgroundColor: 'white'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp(50),
          paddingHorizontal: wp(16),
          gap: hp(8),
        }}>
        {/* Travel Stats */}
        <LinearView containerStyle={[styles.card, {gap: hp(16)}]}>
          <View style={{alignSelf: 'center'}}>
            <Text style={styles.title}>Travel Stats</Text>
            <Text style={styles.subtitle}>All Time</Text>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>13</Text>
              <Text style={styles.statLabel}>Trips</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Countries</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>54</Text>
              <Text style={styles.statLabel}>Days</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>$5.2k</Text>
              <Text style={styles.statLabel}>Spending</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Continents</Text>
            </View>
          </View>
        </LinearView>

        {/* Profile */}
        <LinearView containerStyle={[styles.card, {gap: hp(16)}]}>
          <View style={styles.row}>
            <Text style={styles.title}>Profile</Text>
            <Image source={IMAGES.send} style={styles.send} />
          </View>

          <View style={styles.profileRow}>
            {['Wilding', 'Paradise Seeker', 'Urban Explorer'].map(
              (label, i) => (
                <View key={i} style={styles.profileCircle}>
                  <View style={styles.circleOuter}></View>
                  <Text style={styles.profileLabel}>{label}</Text>
                </View>
              ),
            )}
          </View>
          <Text style={styles.howTravel}>{'How You Travel'}</Text>
          <Text style={styles.howYouTravel}>
            You’re not afraid to mix it up and love a good adventure! You’re in
            the <Text style={styles.boldRed}>top 10%</Text> of traveler in the{' '}
            <Text style={styles.boldRed}>Wilding</Text> category!
          </Text>
        </LinearView>

        {/* Achievements */}
        <LinearView containerStyle={[styles.card]}>
          <View style={[styles.row, {paddingBottom: hp(16)}]}>
            <Text style={styles.title}>Achievements</Text>
            <Image source={IMAGES.send} style={styles.send} />
          </View>
          <View style={styles.achievementRow}>
            <Text style={styles.achievementLabel}>Bucket List Items</Text>
            <Text style={styles.achievementValue}>4/23</Text>
          </View>
          <View style={styles.devider} />
          <View style={styles.achievementRow}>
            <Text style={styles.achievementLabel}>Longest Trip</Text>
            <Text style={styles.achievementValue}>36 days</Text>
          </View>
          <View style={styles.devider} />

          <View style={styles.achievementRow}>
            <Text style={styles.achievementLabel}>Continents Traveled</Text>
            <Text style={styles.achievementValue}>3/7</Text>
          </View>
          <View style={styles.devider} />

          <View style={styles.achievementRow}>
            <Text style={styles.achievementLabel}>Wonders of the World</Text>
            <Text style={styles.achievementValue}>2/7</Text>
          </View>
          <View style={styles.devider} />

          <View style={styles.achievementRow}>
            <Text style={styles.achievementLabel}>US National Parks</Text>
            <Text style={styles.achievementValue}>2/45</Text>
          </View>
          <View
            style={[
              styles.row,
              {justifyContent: 'flex-start', marginTop: hp(10)},
            ]}>
            <Text style={styles.customize}>Customize goals</Text>
            <Image source={IMAGES.rightArrow} style={styles.right} />
          </View>
        </LinearView>

        {/* Countries Visited */}
        <LinearView containerStyle={[styles.card, {paddingHorizontal: wp(0)}]}>
          <View style={[styles.row, {paddingHorizontal: wp(16)}]}>
            <Text style={styles.title}>Countries Visited</Text>
            <Image source={IMAGES.send} style={styles.send} />
          </View>
          <Image source={IMAGES.world_map} style={styles.map} />
        </LinearView>

        {/* Badges */}
        <LinearView containerStyle={styles.card}>
          <View style={styles.row}>
            <Text style={styles.title}>Badges</Text>
            <Image source={IMAGES.send} style={styles.send} />
          </View>
          <View style={styles.badgeGrid}>
            <FlatList
              data={[
                {title: 'Prospector', info: 'You’ve been to 10+ hidden gems!'},
                {title: 'Weekend Warrior', info: 'Went on 50+ weekend trips!'},
                {title: 'Grand Tour', info: 'Visited every continent.'},
                {title: 'Social Nomad', info: 'Traveled with 5+ friends.'},
                {title: 'Islander', info: 'You’ve gone to 25+ islands!'},
                {
                  title: 'Polar Explorer',
                  info: 'Been to both ends of the earth!',
                },
              ]}
              numColumns={3}
              columnWrapperStyle={{
                flexWrap: 'wrap',
                gap: wp(8),
                justifyContent: 'space-between',
                marginTop: hp(16),
              }}
              renderItem={({item, index}) => (
                <View key={index} style={styles.badgeItem}>
                  <View style={styles.circleOuter}></View>
                  <Text style={styles.badgeLabel}>{item?.title}</Text>
                  <Text style={styles.badgeinfo}>{item?.info}</Text>
                </View>
              )}
            />
          </View>
        </LinearView>

        {/* Travel Buddies */}
        <LinearView containerStyle={styles.card}>
          <View style={styles.row}>
            <Text style={styles.title}>Travel Buddies</Text>
            <Image source={IMAGES.send} style={styles.send} />
          </View>
          <View style={styles.avatarRow}>
            {[1, 2, 3].map(i => (
              <Image key={i} source={IMAGES.profile} style={styles.avatar} />
            ))}
          </View>
        </LinearView>

        {/* Spending Summary */}
        <LinearView containerStyle={[styles.card]}>
          <View style={[styles.row, {marginBottom: hp(18)}]}>
            <Text style={styles.title}>Your Spending</Text>
            <Image source={IMAGES.send} style={styles.send} />
          </View>
          {[
            ['Flights', '$400'],
            ['Hotel', '$1000'],
            ['Food', '$800'],
            ['Tickets', '$150'],
            ['Total', '$2350'],
          ].map(([label, value], i) => (
            <>
              {i === 4 && (
                <View style={[styles.devider, {marginVertical: hp(4)}]} />
              )}
              <View style={styles.achievementRow} key={i}>
                <Text
                  style={[
                    styles.achievementLabel,
                    i === 4 && styles.totalLabel,
                  ]}>
                  {label}
                </Text>
                <Text
                  style={[
                    styles.achievementValue,
                    i === 4 && styles.totalValue,
                  ]}>
                  {value}
                </Text>
              </View>
            </>
          ))}
        </LinearView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TripsDetails;

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
  card: {
    marginHorizontal: wp(16),
    borderRadius: wp(12),
    padding: wp(16),
    justifyContent: 'center',
  },
  title: {...commonFontStyle(700, 24, colors._1B1515)},
  subtitle: {...commonFontStyle(400, 12, colors._99999), alignSelf: 'center'},
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {...commonFontStyle(600, 24, colors._BD2332)},
  statLabel: {...commonFontStyle(500, 12, colors._444444)},

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleOuter: {
    width: wp(50),
    height: wp(50),
    borderRadius: wp(25),
    borderWidth: 5,
    borderColor: colors.red,
    marginBottom: hp(8),
  },
  profileLabel: {...commonFontStyle(600, 12, colors._BD2332)},
  howYouTravel: {
    ...commonFontStyle(400, 16, colors.black),
    textAlign: 'center',
  },
  boldRed: {
    ...commonFontStyle(600, 12, colors.red),
  },
  achievementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(12),
    // marginTop: hp(12),
  },
  achievementLabel: {...commonFontStyle(500, 16, colors._444444)},
  achievementValue: {...commonFontStyle(600, 16, colors._BD2332)},
  customize: {
    ...commonFontStyle(600, 13, colors.primary),
  },
  map: {
    width: '100%',
    height: hp(231),
    resizeMode: 'contain',
  },
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(8),
  },
  badgeItem: {
    alignItems: 'center',
    maxWidth: (SCREEN_WIDTH / 3) * 0.7,
  },
  badgeLabel: {...commonFontStyle(400, 12, colors.black)},
  avatarRow: {
    flexDirection: 'row',
    marginTop: hp(12),
    alignSelf: 'center',
    gap: wp(8),
  },
  avatar: {
    width: wp(65),
    height: wp(65),
    borderRadius: wp(20),
  },
  totalLabel: {...commonFontStyle(600, 13, colors.primary)},
  totalValue: {...commonFontStyle(600, 16, colors._444444)},
  send: {
    width: wp(16),
    height: wp(16),
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  howTravel: {
    ...commonFontStyle(700, 14, colors._1B1515),
    alignSelf: 'center',
  },
  devider: {
    height: hp(0.5),
    backgroundColor: '#3C3C4399',
    flex: 1,
  },
  right: {
    tintColor: colors.primary,
    resizeMode: 'contain',
    width: wp(24),
    height: wp(24),
  },
  badgeinfo: {
    ...commonFontStyle(500, 12, colors._444444),
    textAlign: 'center',
  },
});
