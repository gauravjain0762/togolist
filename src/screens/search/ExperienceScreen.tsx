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
import {AppStyles} from '../../theme/appStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomHeader} from '../../component';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {navigateTo} from '../../utils/commonFunction';
import {SCREEN_NAMES} from '../../navigation/screenNames';

let data = ['View All', 'Hosts', 'Half Day', 'Full Day', '< 4 hours'];

const ExperienceScreen = () => {
  const [select, setSelect] = useState('View All');
  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader
        backImg={IMAGES.back1}
        backIconStyle={styles.back}
        showSearch={false}
        moreImg={IMAGES.more_icon}
        moreIconStyle={styles.more}
        headerStyle={styles.header}
        title="Explore"
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
            onPress={() => navigateTo(SCREEN_NAMES.RequestHost)}
            style={styles.hostbtn}>
            <Text style={styles.hosttitle}>{'Request a Host'}</Text>
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExperienceScreen;

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
  earnBg: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(16),
    marginTop: hp(16),
    gap: hp(8),
    marginHorizontal: hp(16),
    flex: 1,
    resizeMode: 'cover',
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
  localTitle: {
    ...commonFontStyle(600, 18, colors.black),
    paddingHorizontal: wp(22),
  },
});
