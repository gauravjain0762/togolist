import {
  FlatList,
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
import {CustomHeader, ExperienceCard, ProfileCard} from '..';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';

let data = ['View All', 'Hosts', 'Half Day', 'Full Day', '< 4 hours'];

const TripPlanner = () => {
  const [select, setSelect] = useState('View All');
  const [host, sethost] = useState(false);

  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader
        backImg={IMAGES.back1}
        backIconStyle={styles.back}
        showSearch={false}
        showBack={true}
        moreImg={IMAGES.more_icon}
        moreIconStyle={styles.more}
        headerStyle={styles.header}
        title={'Trip Planner'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        style={AppStyles.flex1}>
        <View style={styles.titleHeader}>
          <Text style={styles.title}>{'Experiences'}</Text>
          <Text style={styles.location}>{'Toronto, Canada'}</Text>
        </View>
        <View>
          <FlatList
            data={data}
            horizontal
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => setSelect(item)}
                style={[
                  styles.btn,
                  {
                    borderColor:
                      select == item ? colors._BD2332 : colors._D9D9D9,
                  },
                ]}>
                <Text
                  style={[
                    styles.btnText,
                    {color: select == item ? colors._BD2332 : colors._99999},
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <Text style={styles.localTitle}>{'Local Hosts'}</Text>
        {host ? (
          <View style={styles.container}>
            <View style={styles.list}>
              <FlatList
                data={[1, 2, 3, 4]}
                numColumns={2}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  gap: wp(8),
                }}
                contentContainerStyle={{gap: wp(16)}}
                renderItem={({item, index}) => <ProfileCard />}
              />
              <Text style={styles.localTitle}>{'Experiences'}</Text>
              <FlatList
                data={[1, 2]}
                contentContainerStyle={{gap: wp(8)}}
                renderItem={({item, index}) => <ExperienceCard />}
              />
            </View>
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
              <TouchableOpacity style={styles.hostbtn}>
                <Text style={styles.hosttitle}>{'Become a Host'}</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        ) : (
          <ImageBackground
            imageStyle={styles.earnImg}
            source={IMAGES.requestHost_bg}
            style={styles.earnBg}>
            <Text style={styles.earntitle}>{'Hosts Pending'}</Text>
            <Text style={styles.discription}>
              {
                'Submit a request for Togolist to connect with local hosts from your destination.'
              }
            </Text>
            <TouchableOpacity
              onPress={() => sethost(!host)}
              style={styles.hostbtn}>
              <Text style={styles.hosttitle}>{'Request a Host'}</Text>
            </TouchableOpacity>
          </ImageBackground>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TripPlanner;

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
  titleHeader: {
    paddingHorizontal: wp(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(11),
  },
  title: {
    ...commonFontStyle(700, 24, colors.black),
  },
  location: {
    ...commonFontStyle(400, 14, colors._787878),
  },
  listContainer: {
    paddingHorizontal: wp(16),
    marginBottom: hp(16),
    marginTop: hp(30),
  },
  separator: {
    width: wp(8),
  },
  btn: {
    borderWidth: 1,
    borderColor: colors._D9D9D9,
    borderRadius: 10,
    paddingHorizontal: wp(6),
    paddingVertical: hp(6),
  },
  btnText: {
    ...commonFontStyle(600, 14, colors._99999),
  },
  localTitle: {
    ...commonFontStyle(600, 18, colors.black),
    paddingHorizontal: wp(22),
    paddingVertical: hp(16),
  },
  earntitle: {
    ...commonFontStyle(700, 24, colors.white),
  },
  earnImg: {
    borderRadius: 20,
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
  earnBg: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(16),
    gap: hp(8),
    marginHorizontal: hp(16),
    flex: 1,
    resizeMode: 'cover',
  },
  list: {
    flex: 1,
  },
  container: {
    paddingHorizontal: wp(16),
    flexGrow: 1,
  },
  moreImge: {
    borderRadius: 20,
    flex: 1,
  },
  moreBg: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(600),
    marginTop: hp(16),
    paddingHorizontal: wp(16),
    gap: hp(8),
  },
  lookingTitle: {
    ...commonFontStyle(700, 24, colors.white),
  },
});
