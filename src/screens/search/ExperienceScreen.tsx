import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {AppStyles} from '../../theme/appStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomHeader, ExperienceCard, ProfileCard} from '../../component';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {navigateTo} from '../../utils/commonFunction';
import {SCREEN_NAMES, SCREENS} from '../../navigation/screenNames';
import {useRoute} from '@react-navigation/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import AddToListBottomSheet from '../../component/common/AddToListBottomSheet';

let data = ['View All', 'Hosts', 'Half Day', 'Full Day', '< 4 hours'];

const ExperienceScreen = () => {
  const [select, setSelect] = useState('View All');
  const {params} = useRoute();
    const bottomSheetAddListRef = useRef<BottomSheetModal>(null);

  const handlePresentAddlistPress = useCallback(() => {
    bottomSheetAddListRef.current?.present();
  }, []);
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
        {params?.submit ? (
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
                renderItem={({item, index}) => (
                  <ProfileCard followButton={false} ishire={false} />
                )}
              />
              <Text style={[styles.localTitle, {paddingHorizontal: 0}]}>
                {'Guided Tours'}
              </Text>
              <FlatList
                data={[1, 2]}
                contentContainerStyle={{gap: wp(8)}}
                renderItem={({item, index}) => (
                  <ExperienceCard
                    onFavsPress={() => {
                      navigateTo(SCREENS.Favorites);
                    }}
                    onAddPress={() => {
                      handlePresentAddlistPress();
                    }}
                    onBookPress={() => {}}
                  />
                )}
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
            <Text style={styles.earntitle}>{'Earn with Togolist'}</Text>
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
        )}
      </ScrollView>
       <AddToListBottomSheet
                bottomSheetModalRef={bottomSheetAddListRef}
                maxDynamicContentSize
                guidedTours
                // handleSheetChanges={e => handleSheetChanges(e)}
              />
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
 width: 22,
    height: 22,
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
    paddingVertical: hp(16),
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
