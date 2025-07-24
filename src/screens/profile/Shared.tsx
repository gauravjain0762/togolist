import {
  // Animated,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {colors} from '../../theme/colors';
import {
  Button,
  CommonSheet,
  CustomHeader,
  OptionBar,
  SearchBar,
  ShareBottomSheet,
  SharedCard,
} from '../../component';
import Animated from 'react-native-reanimated';

import {IMAGES} from '../../assets/Images';
import {
  Fs,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  commonFontStyle,
  hp,
  wp,
} from '../../theme/fonts';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {API} from '../../utils/apiConstant';
import {SwipeListView} from 'react-native-swipe-list-view';
import {SharedElement} from 'react-native-shared-element';
import AddToListBottomSheet from '../../component/common/AddToListBottomSheet';
import {useRoute} from '@react-navigation/native';
import DuplicateListBottomSheet from '../../component/common/DuplicateListBottomSheet';
import CustomTabBar from '../../component/common/CustomTabBar';
import {useScrollHideAnimation} from '../../hook/useScrollHideAnimation';

const cards = [
  {
    title: 'Fav Food Spots',
    location: 'Egypt',
    lists: 31,
    image: 'https://source.unsplash.com/600x400/?egypt,pyramids',
    onPress: () => navigateTo(SCREENS.SharedListDetails),
  },
  {
    title: 'Things to Do',
    location: 'Worldwide',
    lists: 23,
    image: 'https://source.unsplash.com/600x400/?unesco,heritage',
  },
  {
    title: 'Hiking',
    location: 'London',
    lists: 6,
    image: 'https://source.unsplash.com/600x400/?london,big-ben',
  },
  {
    title: 'Best Coffee Spots',
    location: 'Peru',
    lists: 11,
    image: 'https://source.unsplash.com/600x400/?peru,mountains',
  },
  {
    title: 'Hiking',
    location: 'London',
    lists: 6,
    image: 'https://source.unsplash.com/600x400/?london,big-ben',
  },
  {
    title: 'Best Coffee Spots',
    location: 'Peru',
    lists: 11,
    image: 'https://source.unsplash.com/600x400/?peru,mountains',
  },
];

const Shared = () => {
  const {animatedStyle, scrollHandler, isVisible} = useScrollHideAnimation(
    80,
    10,
  );
  const {params} = useRoute();
  const exploreCard = params?.exploreCard;
  const headerTitle = params?.headerTitle;
  const [select, setSelect] = useState('List View');
  const [saveValue, setSaveValue] = useState(false);

  const bottomSheetModalQuickAddRef = useRef<BottomSheetModal>(null);
  const handlePresentModalQuickAddPress = useCallback(() => {
    bottomSheetModalQuickAddRef.current?.present();
  }, []);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetAddListRef = useRef<BottomSheetModal>(null);

  const handlePresentAddlistPress = useCallback(() => {
    bottomSheetAddListRef.current?.present();
  }, []);
  const handlePresentAddlistClose = useCallback(() => {
    bottomSheetModalQuickAddRef.current?.close();
    bottomSheetAddListRef.current?.close();
    bottomSheetModalRef.current?.close();
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    //  bottomSheetModalRef.current?.close();
  }, []);

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={[AppStyles.flex, styles.mainContainer]}>
      <CustomHeader
        showBack={true}
        backImg={IMAGES.back1}
        backIconStyle={styles.back}
        showSearch={false}
        moreImg={IMAGES.more_icon}
        moreIconStyle={styles.more}
        headerStyle={styles.header}
        onMorePress={() => {
          handlePresentModalPress();
          // handlePresentAddlistPress();
        }}
      />
      <View style={AppStyles.flex1}>
        <View style={styles.containter}>
          {select == 'Map View' ? (
            <View style={styles.info}>
              <View style={styles.network}>
                <View style={styles.infoRow}>
                  <Text style={styles.title}>
                    {headerTitle ? headerTitle : 'North America'}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setSaveValue(!saveValue);
                  }}
                  style={styles.bookmarkRow}>
                  <Image
                    source={IMAGES.save_cion}
                    style={[
                      styles.icon,
                      {
                        width: wp(16),
                        height: wp(16),
                        tintColor: saveValue ? '#BD2332' : '#3C3C4399',
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.text,
                      {color: saveValue ? '#BD2332' : '#3C3C4399'},
                    ]}>
                    1.2K
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.info}>
              {/* <SharedElement id={`item.${title}.city`}> */}
              <Text style={styles.title}>
                {headerTitle ? headerTitle : 'North America'}
              </Text>
              {/* </SharedElement> */}
              <View style={styles.userinfo}>
                <Image source={IMAGES.Avatar_icon} style={styles.user} />
                <Text style={styles.username}>{'@raydaily'}</Text>
              </View>
              <View style={styles.network}>
                <View style={styles.infoRow}>
                  <Image source={IMAGES.location_exo} style={styles.icon1} />
                  <Text style={[styles.text, styles.textWithIcon]}>
                    5 Lists
                  </Text>
                  <Text style={styles.separator}>|</Text>
                  <Image source={IMAGES.world} style={styles.icon} />
                  <Text style={[styles.text, styles.textWithIcon]}>Public</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setSaveValue(!saveValue);
                  }}
                  style={styles.bookmarkRow}>
                  <Image
                    source={IMAGES.save_cion}
                    style={[
                      styles.icon,
                      {
                        width: wp(16),
                        height: wp(16),
                        tintColor: saveValue ? '#BD2332' : '#3C3C4399',
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.text,
                      {color: saveValue ? '#BD2332' : '#3C3C4399'},
                    ]}>
                    1.2K
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.travel}>
                {'Travel around North America.'}
              </Text>
            </View>
          )}

          {/* <SearchBar
            container={{marginHorizontal: 8}}
            searchImg={IMAGES.search1}
          /> */}
          <View style={styles.select}>
            <TouchableOpacity onPress={() => setSelect('List View')}>
              <Text
                style={[
                  styles.subtext,
                  {
                    fontSize: Fs(18),
                    color:
                      select == 'List View' ? colors._BD2332 : colors._99999,
                  },
                ]}>
                List View
              </Text>
            </TouchableOpacity>
            <Text style={[styles.subtext, {fontSize: Fs(18)}]}>{'|'}</Text>
            <TouchableOpacity onPress={() => setSelect('Map View')}>
              <Text
                style={[
                  styles.subtext,
                  {
                    fontSize: Fs(18),
                    color:
                      select == 'Map View' ? colors._BD2332 : colors._99999,
                  },
                ]}>
                Map View
              </Text>
            </TouchableOpacity>
          </View>
          {select == 'List View' && (
            <Animated.ScrollView  showsVerticalScrollIndicator={false}  style={{flex: 1}} onScroll={scrollHandler}>
              <SwipeListView
                data={cards}
                scrollEnabled
                nestedScrollEnabled
                scrollEventThrottle={16}
                // onScroll={scrollHandler}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                  <View style={styles.liastseparator} />
                )}
                renderItem={(data, rowMap) => {
                  return (
                    <View style={styles.rowFront}>
                      <SharedCard
                        onCardPress={() => {
                          navigateTo(SCREENS.SharedListDetails);
                          navigateTo(SCREENS.SharedListDetails, {
                            exploreCard: exploreCard,
                            headerTitle: headerTitle,
                          });
                          // data?.item?.onPress && data?.item?.onPress();
                        }}
                        onLongPress={() => {
                          handlePresentModalQuickAddPress();
                        }}
                        title={data?.item?.title}
                        likeCount={data?.item?.lists}
                        // account
                        address
                        place
                        listCount={data?.item?.lists}
                        exploreCard={exploreCard}
                      />
                    </View>
                  );
                }}
                disableRightSwipe
                swipeToOpenPercent={50}
                rightOpenValue={-(SCREEN_WIDTH * 0.82)}
                ListFooterComponent={() => {
                  if(exploreCard){
                    return null
                  }
                  return (
                    <Button
                      leftImg={IMAGES.addlist}
                      type="outline"
                      title="Add a new list"
                      BtnStyle={styles.btn}
                      titleStyle={styles.btnText}
                      onPress={() => {
                        navigateTo(SCREENS.CreateListScreen);
                      }}
                    />
                  );
                }}
                renderHiddenItem={(data, rowMap) => (
                  <OptionBar
                    container={styles.optioncontainer}
                    onAddListPress={() => {
                      handlePresentAddlistPress();
                    }}
                    onBeentherePress={() => {
                      navigateTo(SCREENS.BeenThere);
                    }}
                  />

                  // <View style={styles.rowBack}>
                  //   <TouchableOpacity style={styles.backButton}>
                  //     <Image source={IMAGES.restore} style={styles.restore} />
                  //     <Text style={styles.backText}>Restore</Text>
                  //   </TouchableOpacity>
                  //   <TouchableOpacity
                  //     style={[styles.backButton, {marginTop: hp(4)}]}>
                  //     <Image source={IMAGES.remove} style={styles.remove} />
                  //     <Text style={styles.backText}>Delete</Text>
                  //   </TouchableOpacity>
                  // </View>
                )}
                leftOpenValue={75}
              />
            </Animated.ScrollView>
          )}
          {select == 'Map View' && (
            <MapView
              style={AppStyles.flex1}
              provider={PROVIDER_GOOGLE}
              key={API.MAP_KEY}
              region={{
                latitude: 51.5065313072,
                longitude: -0.1888825778,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            />
          )}
        </View>
      </View>
      <CommonSheet
        title="Quick Add"
        maxDynamicContentSize={270}
        bottomSheetModalRef={bottomSheetModalQuickAddRef}
        children={
          <View style={{gap: 4, marginBottom: isVisible ? 70 : 0}}>
            <Button
              type="outline"
              BtnStyle={styles.QuickAdd}
              leftImgStyle={styles.leftImgStyle}
              titleStyle={styles.titleStyle1}
              leftImg={IMAGES.newList}
              title="Duplicate List"
              onPress={() => {
                handlePresentAddlistClose();
                handlePresentAddlistPress();
              }}
            />
            <Button
              type="outline"
              leftImg={IMAGES.Send}
              titleStyle={styles.titleStyle1}
              leftImgStyle={styles.leftImgStyle2}
              BtnStyle={styles.QuickAdd1}
              title="Share"
            />
          </View>
        }
      />
      <ShareBottomSheet
        maxDynamicContentSize={SCREEN_HEIGHT * 0.9}
        bottomSheetModalRef={bottomSheetModalRef}
        handleSheetChanges={e => handleSheetChanges(e)}>
        {isVisible && <View style={{height: 80}} />}
      </ShareBottomSheet>
      <DuplicateListBottomSheet
        bottomSheetModalRef={bottomSheetAddListRef}
        handleSheetChanges={e => handleSheetChanges(e)}
        exploreCard={exploreCard}
        isVisible={isVisible}
      />
      <Animated.View style={[AppStyles.actionBar, animatedStyle]}>
        <CustomTabBar />
      </Animated.View>
    </SafeAreaView>
  );
};

export default Shared;

const styles = StyleSheet.create({
  optioncontainer: {
    marginBottom: hp(8),
  },
  mainContainer: {
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
    width: 22,
    height: 22,
  },
  header: {
    paddingHorizontal: wp(16),
  },
  title: {
    ...commonFontStyle(700, 32, colors.black),
  },
  containter: {
    flex: 1,
    paddingHorizontal: wp(8),
  },
  info: {
    paddingHorizontal: wp(16),
    // marginTop: hp(10),
    gap: hp(8),
  },
  user: {
    resizeMode: 'contain',
    width: wp(24),
    height: wp(24),
  },
  username: {
    ...commonFontStyle(500, 15, colors.black),
  },
  userinfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(7),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookmarkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    ...commonFontStyle(500, 18, colors._999999),
  },
  separator: {
    marginHorizontal: 6,
    ...commonFontStyle(500, 18, colors._999999),
  },
  textWithIcon: {
    marginLeft: wp(4),
  },
  network: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'contain',
  },
  icon1: {
    width: wp(16),
    height: wp(20),
    resizeMode: 'contain',
  },
  travel: {
    ...commonFontStyle(400, 16, colors.black),
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
    paddingHorizontal: wp(14),
  },
  subtext: {
    marginVertical: 12,
    ...commonFontStyle(600, 15, '#999999'),
  },
  Listcontainer: {
    paddingHorizontal: 20,
  },
  liastseparator: {
    height: hp(8),
  },
  btn: {
    marginTop: hp(16),
    paddingVertical: hp(4),
    marginHorizontal: 2,
    borderRadius: 14,
  },
  btnText: {
    ...commonFontStyle(700, 18, '#BD2332'),
  },

  rowFront: {
    overflow: 'hidden',
    borderRadius: 10,
    // marginHorizontal: 16,
  },

  rowBack: {
    alignItems: 'center',
    backgroundColor: colors._BD2332,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 30,
    paddingHorizontal: hp(28),
    gap: wp(30),
    overflow: 'hidden',
    // marginTop: 12,
    marginHorizontal: 20,
  },
  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: hp(6),
  },
  backText: {
    ...commonFontStyle(500, 10, colors.white),
  },
  restore: {
    width: wp(23),
    height: wp(23),
    resizeMode: 'contain',
  },
  remove: {
    width: wp(18),
    height: wp(18),
    resizeMode: 'contain',
  },

  QuickAdd: {
    flex: 1,
    gap: 4,
    borderRadius: 12,
    paddingVertical: hp(7.5),
  },
  QuickAdd1: {
    flex: 1,
    gap: 4,
    borderRadius: 12,
    height: hp(35),
    paddingVertical: hp(7),
  },
  leftImgStyle: {
    width: wp(14),
    height: wp(20),
    resizeMode: 'contain',
    tintColor: '#BD2332',
  },
  leftImgStyle1: {
    width: wp(21),
    height: wp(18),
    resizeMode: 'contain',
  },
  leftImgStyle2: {
    width: wp(21),
    height: wp(21),
    resizeMode: 'contain',
  },
  titleStyle1: {
    ...commonFontStyle(500, 14, '#BD2332'),
  },
});
