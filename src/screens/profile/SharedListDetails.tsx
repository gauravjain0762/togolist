import {
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
import {
  Button,
  CommonSheet,
  CustomHeader,
  OptionBar,
  PlacesCard,
  SearchBar,
  ShareBottomSheet,
  SharedCard,
} from '../../component';
import {IMAGES} from '../../assets/Images';
import {colors} from '../../theme/colors';
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
import {SwipeListView} from 'react-native-swipe-list-view';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {API} from '../../utils/apiConstant';
import AddToListBottomSheet from '../../component/common/AddToListBottomSheet';
import {useRoute} from '@react-navigation/native';
import CustomTabBar from '../../component/common/CustomTabBar';
import {useScrollHideAnimation} from '../../hook/useScrollHideAnimation';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const cards = [
  {
    id: 1,
    title: 'Samuri Japanese Restaurant',
    location: '979 Lomas Santa Fe Dr, Solana Beach...',
    lists: 31,
    image: 'https://source.unsplash.com/600x400/?egypt,pyramids',
    onPress: () => navigateTo(SCREENS.EventDetails),
  },
  {
    id: 2,
    title: 'Mt. Hood Timber Lodge',
    location: 'National park in California',
    lists: 23,
    image: 'https://source.unsplash.com/600x400/?unesco,heritage',
  },
  {
    id: 3,
    title: 'Samuri Japanese Restaurant',
    location: '979 Lomas Santa Fe Dr, Solana Beach...',
    lists: 6,
    image: 'https://source.unsplash.com/600x400/?london,big-ben',
  },
  {
    id: 4,
    title: 'Mt. Hood Timber Lodge',
    location: 'National park in California',
    lists: 11,
    image: 'https://source.unsplash.com/600x400/?peru,mountains',
  },
  {
    id: 1,
    title: 'Samuri Japanese Restaurant',
    location: '979 Lomas Santa Fe Dr, Solana Beach...',
    lists: 31,
    image: 'https://source.unsplash.com/600x400/?egypt,pyramids',
    onPress: () => navigateTo(SCREENS.EventDetails),
  },
  {
    id: 2,
    title: 'Mt. Hood Timber Lodge',
    location: 'National park in California',
    lists: 23,
    image: 'https://source.unsplash.com/600x400/?unesco,heritage',
  },
];

const SharedListDetails = () => {
  const {animatedStyle, scrollHandler, isVisible} = useScrollHideAnimation(
    80,
    10,
  );

  const {params} = useRoute();
  const exploreCard = params?.exploreCard;
  const headerTitle = params?.headerTitle;
  const [select, setSelect] = useState('List View');
  const [showCard, setShowCard] = useState(false);

  const bottomSheetModalQuickAddRef = useRef<BottomSheetModal>(null);
  const handlePresentModalQuickAddPress = useCallback(() => {
    bottomSheetModalQuickAddRef.current?.present();
  }, []);

  const bottomSheetAddListRef = useRef<BottomSheetModal>(null);

  const handlePresentAddlistPress = useCallback(() => {
    bottomSheetAddListRef.current?.present();
  }, []);
  const handlePresentAddlistClose = useCallback(() => {
    bottomSheetAddListRef.current?.close();
    bottomSheetModalRef.current?.close();
  }, []);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const TouchableOpacityVal = useSharedValue(100);
  const handlePress = () => {
    TouchableOpacityVal.value = SCREEN_HEIGHT;
  };
  const TouchableStyle = useAnimatedStyle(() => ({
    height: withSpring(TouchableOpacityVal.value),
  }));

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
        }}
      />
      <View style={AppStyles.flex1}>
        <View style={styles.containter}>
          <View style={styles.info}>
            <View>
              <Text style={styles.graytitle}>
                {headerTitle ? headerTitle : 'North America'}
              </Text>
              <Text style={styles.title}>{'Fav Food Spots'}</Text>
            </View>
            {select !== 'Map View' && (
              <View style={styles.network}>
                <View style={styles.infoRow}>
                  {/* <Text style={styles.text}>San Diego</Text>
                <Text style={styles.separator}>|</Text> */}
                  <Text style={styles.text}>5 Places</Text>
                  <Text style={styles.separator}>|</Text>
                  <Image source={IMAGES.world} style={styles.icon} />
                  <Text style={[styles.text, styles.textWithIcon]}>Public</Text>
                </View>
              </View>
            )}
          </View>
          {/* <SearchBar
            container={{marginHorizontal: 0}}
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
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => setSelect('Map View')}>
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
            <Image source={IMAGES.location_exo} style={styles.icon1} />
          </View>
          {/* {showCard && <OptionBar container={styles.optioncontainer} />} */}
          {select == 'List View' && (
            <Animated.ScrollView
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              onScroll={scrollHandler}>
              <SwipeListView
                data={cards}
                nestedScrollEnabled
                ItemSeparatorComponent={() => (
                  <View style={styles.liastseparator} />
                )}
                showsVerticalScrollIndicator={false}
                renderItem={(data, rowMap) => {
                  return (
                    <View style={styles.rowFront}>
                      <PlacesCard
                        onCardPress={() => {
                          // data?.item?.onPress && data?.item?.onPress();
                          navigateTo(SCREENS.EventDetails, {
                            showEvent: exploreCard,
                            item: data?.item,
                            data: cards,
                            onGoBack: data => {
                              setSelect(data);
                            },
                          });
                        }}
                        onLongPress={() => {
                          handlePresentModalQuickAddPress();
                        }}
                        id={data?.item?.id}
                        title={data?.item?.title}
                        location={data?.item?.location}
                        likeCount={data?.item.lists}
                        locationIcon
                        locationStyle={styles.location}
                      />
                    </View>
                  );
                }}
                disableRightSwipe
                swipeToOpenPercent={50}
                rightOpenValue={-(SCREEN_WIDTH * 0.82)}
                ListFooterComponent={() => {
                  if (exploreCard) {
                    return null;
                  }
                  return (
                    <Button
                      leftImg={IMAGES.addlist}
                      type="outline"
                      title="Add a new place"
                      BtnStyle={styles.btn}
                      titleStyle={styles.btnText}
                      onPress={() => handlePresentModalPress()}
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
                )}
                leftOpenValue={75}
                onRowOpen={(rowKey, rowMap, toValue) => {
                  if (toValue < 0) {
                    console.log('Swiped left');
                    setShowCard(true);
                  } else {
                    console.log('Swiped right');
                  }
                }}
                onRowClose={(rowKey, rowMap) => {
                  setShowCard(false);
                }}
              />
              {/* <AnimatedTouchable
                onPress={handlePress}
                style={[styles.animatedView, TouchableStyle]}>
                <Animated.Text>hello</Animated.Text>
              </AnimatedTouchable> */}
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
          <View style={{marginBottom: isVisible ? 70 : 0}}>
            <View
              style={[
                AppStyles.row,
                {marginBottom: hp(4), justifyContent: 'space-between'},
              ]}>
              <Button
                type="outline"
                BtnStyle={styles.QuickAdd}
                leftImgStyle={styles.leftImgStyle}
                titleStyle={styles.titleStyle1}
                leftImg={IMAGES.newList}
                title="Add to list"
                onPress={() => {
                  handlePresentAddlistPress();
                }}
              />
              <Button
                type="outline"
                BtnStyle={styles.QuickAdd}
                leftImgStyle={styles.leftImgStyle1}
                titleStyle={styles.titleStyle1}
                leftImg={IMAGES.been}
                title="Been There"
                onPress={() => {
                  navigateTo(SCREENS.BeenThere);
                }}
              />
              <Button
                type="outline"
                leftImg={IMAGES.Heart}
                titleStyle={styles.titleStyle1}
                leftImgStyle={styles.leftImgStyle3}
                BtnStyle={styles.QuickAdd}
                title="Favs"
                onPress={() => {
                  navigateTo(SCREENS.Favorites);
                }}
              />
            </View>
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

      <AddToListBottomSheet
        bottomSheetModalRef={bottomSheetAddListRef}
        maxDynamicContentSize={true}
        isVisible={isVisible}
        handleSheetChanges={e => handleSheetChanges(e)}
      />
      <Animated.View style={[AppStyles.actionBar, animatedStyle]}>
        <CustomTabBar />
      </Animated.View>
    </SafeAreaView>
  );
};

export default SharedListDetails;

const styles = StyleSheet.create({
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
  containter: {
    paddingHorizontal: wp(8),
    flex: 1,
  },
  info: {
    paddingHorizontal: wp(16),
    // marginTop: hp(10),
    gap: hp(8),
  },
  title: {
    ...commonFontStyle(700, 32, colors.black),
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
  text: {
    ...commonFontStyle(500, 18, colors._999999),
  },
  separator: {
    marginHorizontal: 6,
    ...commonFontStyle(500, 18, colors._999999),
  },
  textWithIcon: {
    marginLeft: 4,
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
    width: wp(19),
    height: wp(24),
    resizeMode: 'contain',
  },
  travel: {
    ...commonFontStyle(400, 16, colors.black),
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
    paddingLeft: wp(14),
    paddingRight: wp(8),
  },
  subtext: {
    marginVertical: 12,
    ...commonFontStyle(600, 15, '#999999'),
  },
  graytitle: {
    ...commonFontStyle(700, 32, colors._999999),
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
  Listcontainer: {},
  liastseparator: {
    height: hp(8),
  },
  location: {
    ...commonFontStyle(600, 12, colors.white),
    marginTop: 0,
  },
  optioncontainer: {
    marginBottom: hp(8),
  },

  rowFront: {
    overflow: 'hidden',
    borderRadius: 10,
    // marginHorizontal: 20,
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
    // marginHorizontal: 20,
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
    // flex:1,
    width: SCREEN_WIDTH * 0.3,
    gap: 4,
    borderRadius: 12,
    paddingVertical: hp(7),
  },
  QuickAdd1: {
    flex: 1,
    gap: 4,
    borderRadius: 12,
    height: hp(35),
    paddingVertical: hp(9),
  },
  leftImgStyle: {
    width: wp(14),
    height: wp(21),
    resizeMode: 'contain',
    tintColor: '#BD2332',
  },
  leftImgStyle1: {
    width: wp(21),
    height: wp(21),
    resizeMode: 'contain',
  },
  leftImgStyle3: {
    width: wp(21),
    height: wp(21),
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
  animatedView: {
    backgroundColor: 'white',
    height: hp(100),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.black,
  },
});
