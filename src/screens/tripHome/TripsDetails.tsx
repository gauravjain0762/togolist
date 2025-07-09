import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {SCREEN_WIDTH, commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {
  Button,
  CustomHeader,
  LinearView,
  ProgressRingChart,
} from '../../component';
import {IMAGES} from '../../assets/Images';
import ReactNativeModal from 'react-native-modal';
import {PieChart} from 'react-native-gifted-charts';
import {BlurView} from '@react-native-community/blur';

const TripsDetails = () => {
  const [proModel, setProModel] = useState(false);
  const pieData = [
    {
      label: 'Wilding',
      pieData: [
        {value: 20, color: '#D9D9D9'},
        {value: 12, color: '#D9D9D9'},
        {value: 58, color: '#BD2332'},
      ],
      image: IMAGES.profile1,
      initialAngle: -0.7,
    },
    {
      label: 'Paradise Seeker',
      pieData: [
        {value: 20, color: '#BD2332'},
        {value: 12, color: '#D9D9D9'},
        {value: 58, color: '#D9D9D9'},
      ],
      image: IMAGES.profile2,
      initialAngle: -0.7,
    },
    {
      label: 'Urban Explorer',
      pieData: [
        {value: 20, color: '#D9D9D9'},
        {value: 12, color: '#BD2332'},
        {value: 58, color: '#D9D9D9'},
      ],
      image: IMAGES.profile3,
      initialAngle: -0.7,
    },
  ];

  const pieData2 = [
    {
      label: 'Prospector',
      pieData: [
        {value: 10, color: '#BD2332'},
        {value: 10, color: '#BD2332'},
        {value: 10, color: '#BD2332'},
        {value: 10, color: '#BD2332'},
        {value: 10, color: '#BD2332'},
        {value: 10, color: '#BD2332'},
        {value: 10, color: '#BD2332'},
        {value: 10, color: '#BD2332'},
        {value: 10, color: '#D9D9D9'},
        {value: 10, color: '#D9D9D9'},
      ],
      image: IMAGES.badges1,
      initialAngle: 0,
      info: 'You’ve been to 10+ hidden gems!',
    },
    {
      label: 'Weekend Warrior',
      pieData: [
        {value: 60, color: '#BD2332'},
        {value: 40, color: '#D9D9D9'},
      ],
      image: IMAGES.badges2,
      initialAngle: 0,
      info: 'Went on 50+ weekend trips!',
    },
    {
      label: 'Grand Tour',
      pieData: [
        {value: 14.28, color: '#D9D9D9'},
        {value: 14.28, color: '#BD2332'},
        {value: 14.28, color: '#BD2332'},
        {value: 14.28, color: '#BD2332'},
        {value: 14.28, color: '#D9D9D9'},
        {value: 14.28, color: '#D9D9D9'},
        {value: 14.28, color: '#D9D9D9'},
      ],
      image: IMAGES.badges3,
      initialAngle: 0,
      info: 'Visited every continent.',
    },
    {
      label: 'Social Nomad',
      pieData: [
        {value: 20, color: '#D9D9D9'},
        {value: 20, color: '#BD2332'},
        {value: 20, color: '#D9D9D9'},
        {value: 20, color: '#D9D9D9'},
        {value: 20, color: '#D9D9D9'},
      ],
      image: IMAGES.badges4,
      initialAngle: 0,
      info: 'Traveled with 5+ friends.',
    },
    {
      label: 'Islander',
      pieData: [{value: 100, color: '#D9D9D9'}],
      image: IMAGES.profile2,
      initialAngle: 0,
      info: 'You’ve gone to 25+ islands!',
    },
    {
      label: 'Polar Explorer',
      pieData: [{value: 100, color: '#D9D9D9'}],
      image: IMAGES.badges5,
      initialAngle: 0,
      info: 'Been to both ends of the earth!',
    },
  ];

  useEffect(() => {
    // setProModel(true);
  }, []);

  return (
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer]}>
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
          <View style={[styles.statsRow,{marginTop:4,marginBottom:4}]}>
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
        <LinearView containerStyle={[styles.card, {gap: hp(0)}]}>
          <View style={[styles.row,{}]}>
            <Text style={styles.title}>Profile</Text>
            <Image source={IMAGES.send} style={styles.send} />
          </View>

          <View style={[styles.profileRow,{marginTop:16}]}>
            {pieData.map((label, i) => (
              <View key={i} style={styles.profileCircle}>
                <ProgressRingChart
                  initialAngle={label?.initialAngle}
                  centerLabelComponent={
                    <Image
                      resizeMode="contain"
                      style={styles.icons}
                      source={label?.image}
                    />
                  }
                  pieData={label?.pieData}
                />
                <Text style={styles.profileLabel}>{label?.label}</Text>
              </View>
            ))}
          </View>
          <Text style={[styles.howTravel,{marginTop:20,marginBottom:4}]}>{'How You Travel'}</Text>
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
            <TouchableOpacity
              onPress={() => setProModel(!proModel)}
              style={styles.row}>
              <Text style={styles.customize}>Customize goals</Text>
              <Image source={IMAGES.rightArrow} style={styles.right} />
            </TouchableOpacity>
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
        <LinearView containerStyle={[styles.card, {paddingHorizontal: 0}]}>
          <View style={[styles.row, AppStyles.P16]}>
            <Text style={styles.title}>Badges</Text>
            <Image source={IMAGES.send} style={styles.send} />
          </View>
          <View style={styles.badgeGrid}>
            <FlatList
              data={pieData2}
              numColumns={3}
              columnWrapperStyle={{
                flexWrap: 'wrap',
                gap: wp(6),
                justifyContent: 'space-between',
                marginTop: hp(16),
              }}
              renderItem={({item, index}) => (
                <View key={index} style={styles.profileCircle}>
                  <ProgressRingChart
                    initialAngle={item?.initialAngle}
                    centerLabelComponent={
                      <Image
                        resizeMode="contain"
                        style={styles.icons}
                        source={item?.image}
                      />
                    }
                    pieData={item?.pieData}
                  />
                  <Text style={styles.profileLabel}>{item?.label}</Text>
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
    {proModel &&  <BlurView
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={3}
        reducedTransparencyFallbackColor="white"
      />}
      <ReactNativeModal isVisible={proModel}>
        <View style={styles.model}>
          <Text style={styles.proheader}>{'Togolist Pro'}</Text>
          <Text style={styles.info}>
            {
              'Upgrade to pro to access premium features, track your stats and get customized deals! '
            }
          </Text>
          <Button
            title="Try Pro"
            onPress={() => setProModel(!proModel)}
            BtnStyle={styles.btn}
          />
        </View>
      </ReactNativeModal>
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
    // marginHorizontal: wp(16),
    borderRadius: wp(12),
    padding: wp(24),
    justifyContent: 'center',
  },
  title: {...commonFontStyle(700, 24, colors._1B1515)},
  subtitle: {...commonFontStyle(400, 12, colors._99999), alignSelf: 'center'},
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: wp(20),
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
    flex: 1,
  },
  circleOuter: {
    width: wp(50),
    height: wp(50),
    borderRadius: wp(25),
    borderWidth: 5,
    borderColor: colors.red,
    marginBottom: hp(8),
  },
  profileLabel: {...commonFontStyle(600, 12, colors._BD2332), marginTop: hp(4)},
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
    maxWidth: (SCREEN_WIDTH / 3) * 0.8,
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
  model: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: wp(16),
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp(10),
  },
  info: {
    ...commonFontStyle(400, 16, colors._444444),
    textAlign: 'center',
  },
  proheader: {
    ...commonFontStyle(700, 24, colors._BD2332),
  },
  btn: {
    paddingVertical: hp(8),
    paddingHorizontal: wp(17),
    borderRadius: 10,
    elevation: 2,
  },
  icons: {
    width: wp(20),
    height: wp(20),
  },
});
