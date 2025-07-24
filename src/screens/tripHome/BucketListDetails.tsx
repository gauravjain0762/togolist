import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {colors} from '../../theme/colors';
import {
  Button,
  CommonSheet,
  CustomHeader,
  EventBottomSheet,
  LinearView,
} from '../../component';
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, SCREEN_HEIGHT, wp} from '../../theme/fonts';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import TogolistPro from '../../component/common/TogolistPro';
import CardImageView from '../../component/trip/CardImageView';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import CategoryCard from '../../component/trip/CategoryCard';
import Checklist from '../../component/trip/Checklist';
import {SwipeListView} from 'react-native-swipe-list-view';
import CustomTabBar from '../../component/common/CustomTabBar';
import Reanimated from 'react-native-reanimated';
import {useScrollHideAnimation} from '../../hook/useScrollHideAnimation';
import {navigationRef} from '../../navigation/RootContainer';

const {width} = Dimensions.get('window');

const categories = [
  {
    title: 'Things to Do',
    category: 'Activities',
    places: 0,
    image: 'https://example.com/ferris.jpg',
    iconName: 'checkbox-outline',
  },
  {
    title: 'Places to Stay',
    category: 'Accommodations',
    places: 0,
    image: 'https://example.com/stay.jpg',
    iconName: 'home-outline',
  },
  {
    title: 'Where to Eat',
    category: 'Dinning',
    places: 0,
    image: 'https://example.com/eat.jpg',
    iconName: 'restaurant-outline',
  },
];

const BucketListDetails = () => {
  const {animatedStyle, scrollHandler, isVisible} = useScrollHideAnimation(
    80,
    10,
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [showTogolistPro, setShowTogolistPro] = useState(true);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const flatListRef = useRef(null);

  // Find the initial index of the passed item within the hardcoded data
  let initialIndex = 1;

  // Use a state to control FlatList visibility after scrolling
  const [flatListReady, setFlatListReady] = useState(false);

  useEffect(() => {
    // Only scroll if initialIndex is found and FlatListRef exists
    if (flatListRef.current && initialIndex !== -1) {
      // Small timeout to allow shared element transition to start
      const timer = setTimeout(() => {
        flatListRef.current.scrollToIndex({
          index: initialIndex,
          animated: false,
        });
        setFlatListReady(true); // Mark FlatList as ready
      }, 50); // Adjust delay as needed
      return () => clearTimeout(timer);
    }
  }, [initialIndex]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const listener = scrollX.addListener(({value}) => {
      const index = Math.round(value / width);
      setActiveIndex(index);
    });

    return () => scrollX.removeListener(listener);
  }, []);

  const getDotStyle = (index: number) => {
    const distance = Math.abs(index - activeIndex);

    // Shrink size and opacity with distance from activeIndex
    const size = 8 - distance * 1.2; // main: 8, second: 6.8, third: 5.6, etc.
    const clampedSize = Math.max(size, 2); // minimum size
    const opacity = 1 - distance * 0.15; // main: 1, then reduce

    return {
      width: clampedSize,
      height: clampedSize,
      borderRadius: clampedSize / 2,
      marginHorizontal: 6.5,
      backgroundColor: `#E3E3E3`,
    };
  };

  const scrollX = useRef(new Animated.Value(0)).current; // Animated value for scroll position
  const renderPaginationDots = () => {
    const dotPosition = Animated.divide(scrollX, width); // Calculate active dot position
    return (
      <View
        style={[
          styles.paginationContainer,
          {marginBottom: isVisible ? 0 : 0},
        ]}>
        <TouchableOpacity
          onPress={() => {
            navigationRef.goBack();
          }}>
          <Image
            source={IMAGES.map1}
            style={{width: 17, height: 17, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {[1, 2].map((_, index) => {
            return <View key={index} style={getDotStyle(index)} />;
          })}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigationRef.goBack();
          }}>
          <Image
            source={IMAGES.menu1}
            style={{width: 17, height: 17, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={[AppStyles.flex, styles.container]}>
      <CustomHeader
        title={'Trip'}
        backImg={IMAGES.back1}
        backIconStyle={styles.back}
        showSearch={false}
        showBack={true}
        // moreImg={IMAGES.more_icon}
        // moreIconStyle={styles.more}
        onMorePress={() => {
          handlePresentModalPress();
        }}
      />

      {true && ( // Only render FlatList if initial item is found
        // <Reanimated.ScrollView
        //   showsVerticalScrollIndicator={false}
        //   style={{flex: 1}}
        //   onScroll={scrollHandler}>
          <FlatList
            ref={flatListRef}
            // nestedScrollEnabled
            data={[1, 3]}
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={[{gap: hp(8)}]}
            renderItem={({item}) => {
              return (
                <Reanimated.ScrollView
                         onScroll={scrollHandler}
                  // contentContainerStyle={AppStyles.flexGrow}
                  nestedScrollEnabled
                  showsVerticalScrollIndicator={false}
                  style={styles.scroll}>
                  <ImageBackground
                    source={IMAGES.bbq}
                    imageStyle={styles.placeimges}
                    style={styles.place}>
                    <Text style={styles.placeTitle}>{'Peru Explorations'}</Text>
                    <View style={styles.location}>
                      {/* <Image source={IMAGES.wordWide} style={styles.pin} /> */}
                      <Text style={styles.address}>{'Bucket List Trip'}</Text>
                    </View>
                    <View style={styles.timecontainer}>
                      <Text style={styles.time}>{'Your Rating:'}</Text>
                      {/* <Image source={IMAGES.arrow} style={styles.arrow} /> */}
                      <Text style={styles.time}>{'Top 10'}</Text>
                    </View>
                  </ImageBackground>
                  {/* <Button titleStyle={styles.btn} title="Admin Mode" /> */}
                  {/* <View style={[AppStyles.row, styles.eventContainor]}>
          <View style={[AppStyles.row, styles.eventrow]}>
            <Image source={IMAGES.world} style={styles.eventicon} />
            <Text style={styles.graylabel}>{'Public Event'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={[AppStyles.row, styles.eventrow]}>
            <Image source={IMAGES.follower} style={[styles.followe]} />
            <Text style={styles.graylabel}>{'1.2K Follows'}</Text>
          </View>
        </View> */}
                  {/* <View style={[AppStyles.row, styles.features]}>
          <TouchableOpacity style={[styles.optionItem]}>
            <Image style={styles.add} source={IMAGES.newList} />
            <Text style={[styles.optionText]}>{'Add to list'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionItem]}>
            <Image style={styles.check} source={IMAGES.been} />
            <Text style={[styles.optionText]}>{'Been There'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionItem]}>
            <Image style={styles.fav} source={IMAGES.fav} />
            <Text style={[styles.optionText]}>{'Favs'}</Text>
          </TouchableOpacity>
        </View> */}
                  {/* <View style={[AppStyles.row, styles.selectFeatures]}>
          <TouchableOpacity style={[styles.optionItem]}>
            <Image style={styles.event} source={IMAGES.event} />
            <Text style={[styles.optionText1]}>{'Event'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.optionItem]}>
            <Image style={styles.event} source={IMAGES.emoji} />
            <Text style={[styles.optionText1]}>{'Been There'}</Text>
          </TouchableOpacity>
        </View> */}
                  {showTogolistPro && (
                    <TogolistPro
                      cardStyle={{marginTop: 8}}
                      onClosePress={() => {
                        setShowTogolistPro(false);
                      }}
                    />
                  )}
                  <View style={[AppStyles.row]}>
                    <Text style={[styles.photo, {flex: 1}]}>
                      {'Trip Togolists'}
                    </Text>
                    <TouchableOpacity>
                      <Image source={IMAGES.add_icon} style={styles.addicon} />
                    </TouchableOpacity>
                  </View>

                  <SwipeListView
                    data={categories}
                    nestedScrollEnabled
                    // contentContainerStyle={{paddingHorizontal: 20}}
                    showsVerticalScrollIndicator={false}
                    renderItem={(data, rowMap) => {
                      return (
                        <View style={styles.rowFront}>
                          <CategoryCard
                            onCardPress={() => {
                              navigateTo(SCREENS.ThingsTogolistsScreen);
                            }}
                            title={data?.item?.title}
                            Togolist={data?.item?.category}
                            Lists
                            listCount={data?.item?.places}
                            showAddList={true}
                          />
                        </View>
                      );
                    }}
                    disableRightSwipe
                    swipeToOpenPercent={30}
                    rightOpenValue={-150}
                    renderHiddenItem={(data, rowMap) => (
                      <View style={styles.rowBack}>
                        <TouchableOpacity style={styles.backButton}>
                          <Image
                            source={IMAGES.restore}
                            style={styles.restore}
                          />
                          <Text style={styles.backText}>Restore</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.backButton, {marginTop: hp(4)}]}>
                          <Image source={IMAGES.remove} style={styles.remove} />
                          <Text style={styles.backText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                    leftOpenValue={75}
                  />

                  <View style={styles.content}>
                    <LinearView>
                      <Text style={styles.headerTitle}>{'Collaborators'}</Text>
                      <View style={styles.row}>
                        {[1, 3].map((user, index) => (
                          <Image
                            source={{
                              uri: 'https://randomuser.me/api/portraits/men/32.jpg',
                            }}
                            style={[
                              styles.avatar,
                              {marginLeft: index === 0 ? 20 : -10, zIndex: 1},
                            ]}
                          />
                        ))}
                        <TouchableOpacity
                          onPress={() => {
                            navigateTo(SCREENS.CollaboratorsScreen);
                          }}>
                          <Image
                            source={IMAGES.addIcon}
                            style={[styles.avatar1]}
                          />
                        </TouchableOpacity>
                      </View>
                    </LinearView>

                    <LinearView>
                      <Text style={styles.headerTitle}>{'Notes'}</Text>
                      <View style={[styles.infoContainor, {marginTop: -10}]}>
                        <TextInput
                          style={styles.label}
                          placeholder="Trip planning and goals of the trip..."
                          placeholderTextColor={'#787878'}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => handlePresentModalPress()}
                        style={styles.postbtn}>
                        <Text style={styles.btntxt}>{'Post'}</Text>
                      </TouchableOpacity>
                      <View
                        style={[
                          styles.horizontal_divider,
                          {marginTop: 0, marginHorizontal: 10},
                        ]}
                      />
                      <View style={styles.container1}>
                        {/* Top: Avatar + Name */}
                        <View style={styles.header}>
                          <Image
                            source={{
                              uri: 'https://randomuser.me/api/portraits/women/75.jpg',
                            }}
                            style={styles.avatar2}
                          />
                          <Text style={styles.username}>Emily</Text>
                        </View>

                        {/* Comment text */}
                        <Text style={styles.commentText}>
                          Good to know: Best time of year to visit is Oct – Dec.
                          Good temps for hiking and mostly dry.
                        </Text>

                        {/* Footer: Comment count + View all */}
                        <TouchableOpacity style={styles.footer}>
                          <Image
                            source={IMAGES.message_icon}
                            style={styles.message_icon}
                          />
                          <Text style={styles.commentCount}>10</Text>
                          <Text style={styles.viewAll}>View all comments</Text>
                        </TouchableOpacity>
                      </View>
                    </LinearView>
                    <LinearView>
                      <View style={styles.photoContainor}>
                        <Text style={styles.photo}>{'What to Do'}</Text>
                        <TouchableOpacity>
                          <Image
                            source={IMAGES.add_icon}
                            style={styles.addicon}
                          />
                        </TouchableOpacity>
                      </View>
                      <View>
                        <Checklist />
                      </View>
                    </LinearView>
                    <LinearView>
                      <View style={styles.photoContainor}>
                        <View style={[AppStyles.row]}>
                          <Text style={styles.photo}>{'Uploads'}</Text>
                          <Image source={IMAGES.info} style={styles.infoIcon} />
                        </View>
                        <TouchableOpacity>
                          <Image
                            source={IMAGES.add_icon}
                            style={styles.addicon}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.description}>
                        {
                          'Save reference links to relevant social media posts, blogs & more...'
                        }
                      </Text>
                    </LinearView>
                    <LinearView>
                      <View style={styles.photoContainor}>
                        <Text style={styles.photo}>{'References'}</Text>
                        <TouchableOpacity>
                          <Image
                            source={IMAGES.add_icon}
                            style={styles.addicon}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.description}>
                        {
                          'Save reference links to relevant social media posts, blogs & more...'
                        }
                      </Text>
                    </LinearView>
                    <LinearView
                      containerStyle={[AppStyles.row, {paddingRight: 20}]}>
                      <Text style={[styles.description, {flex: 1}]}>
                        {'Ready to set a date?'}
                      </Text>
                      <Button
                        BtnStyle={styles.btn}
                        titleStyle={styles.titleStyle}
                        title="Convert to Trip"
                      />
                    </LinearView>
                    <LinearView
                      containerStyle={[AppStyles.row, {paddingRight: 20}]}>
                      <Text style={[styles.description, {flex: 1}]}>
                        {'Turn on trip notifications'}
                      </Text>
                      <Image source={IMAGES.bell} style={styles.bellIcon} />
                    </LinearView>
                  </View>
                </Reanimated.ScrollView>
              );
            }}
            keyExtractor={item => item?.id}
            horizontal
            pagingEnabled // Enables snapping to full pages
            showsHorizontalScrollIndicator={false}
            // initialScrollIndex is set when component mounts via useEffect
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            style={flatListReady ? {} : {opacity: 0}} // Hide FlatList until ready
            onScroll={Animated.event(
              // Capture scroll events for dot animation
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false}, // 'useNativeDriver: true' not supported for 'onScroll' with 'Animated.event' by default
            )}
            scrollEventThrottle={16} // Update scroll position frequently
          />
        // </Reanimated.ScrollView>
      )}

      {renderPaginationDots()}
      <CommonSheet
        bottomSheetModalRef={bottomSheetModalRef}
        maxDynamicContentSize={isVisible ? SCREEN_HEIGHT * 0.8 : SCREEN_HEIGHT * 0.75}
        children={
          <View style={{marginBottom:isVisible?40 :0}}>
            <TouchableOpacity style={styles.modalBtn}>
              <Image source={IMAGES.addIcon1} style={styles.iconStyle1} />
              <Text style={styles.modalText}>Add friends</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalBtn, {marginTop: 15}]}>
              <Image source={IMAGES.pin1} style={styles.iconStyle} />
              <Text style={styles.modalText}>Copy invite link</Text>
            </TouchableOpacity>

            <View style={[AppStyles.row, {marginTop: 20, gap: 8}]}>
              <Image source={IMAGES.share1} style={styles.shareIcon} />
              <Text style={styles.shareText}>Share on social media</Text>
            </View>

            <ImageBackground
              source={IMAGES.bg1} // Replace with actual pyramid image URL
              style={[styles.containerBg]}
              imageStyle={[styles.image]}>
              <View style={[AppStyles.row]}>
                <Text style={styles.text1}>Share on social media</Text>
                <Image source={IMAGES.logo_white} style={styles.logo_white} />
              </View>
              <View>
                <Text style={styles.text2}>{'Peru Explorations'}</Text>
                <Text style={styles.text3}>{'@ray Top 10'}</Text>
              </View>
            </ImageBackground>
            <View style={{height: 30}} />
          </View>
        }
        title="Share Trip"
      />

      {isVisible && <SafeAreaView edges={['top']} />}
      <Reanimated.View style={[AppStyles.actionBar, animatedStyle]}>
        <CustomTabBar />
      </Reanimated.View>
    </SafeAreaView>
  );
};

export default BucketListDetails;

const styles = StyleSheet.create({
  container: {
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
    width: wp(24),
    height: wp(24),
  },
  place: {
   width: 'auto',
    resizeMode: 'contain',
    height: hp(555),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  placeimges: {
    borderRadius: 20,
  },
  placeTitle: {
    ...commonFontStyle(700, 32, colors.white),
  },
  scroll: {
    // flex: 1,
    paddingHorizontal: wp(16),
    width: width,
  },
  pin: {
    resizeMode: 'contain',
    width: wp(24),
    height: wp(24),
    tintColor: colors.white,
  },
  address: {
    ...commonFontStyle(600, 14, colors.white),
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginTop: hp(12),
  },
  arrow: {
    resizeMode: 'contain',
    width: wp(12),
    height: wp(12),
  },
  time: {
    ...commonFontStyle(500, 14, colors.white),
  },
  timecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
    paddingBottom: hp(38),
    marginTop: hp(4),
  },
  btn: {
    // ...commonFontStyle(600, 16, colors.white),
    paddingVertical: hp(8),
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  titleStyle: {
    ...commonFontStyle(600, 12, colors.white),
  },
  eventicon: {
    resizeMode: 'contain',
    width: wp(24),
    height: wp(24),
  },
  graylabel: {
    ...commonFontStyle(500, 18, colors._99999),
  },
  followe: {
    resizeMode: 'contain',
    width: wp(19),
    height: wp(19),
  },
  eventrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },
  divider: {
    width: wp(2),
    backgroundColor: colors._99999,
    height: '80%',
  },
  eventContainor: {
    gap: wp(8),
    marginVertical: hp(18),
  },
  optionItem: {
    borderWidth: 1,
    borderColor: colors.primary1,
    borderRadius: 12,
    paddingHorizontal: wp(12),
    paddingVertical: hp(10),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: wp(4),
  },
  optionText: {
    ...commonFontStyle(500, 14, colors.primary1),
  },
  features: {
    gap: wp(4),
  },
  add: {
    width: wp(15),
    height: hp(20),
    resizeMode: 'contain',
  },
  check: {
    width: wp(22),
    height: wp(22),
    resizeMode: 'contain',
  },
  fav: {
    width: wp(21),
    height: wp(18),
    resizeMode: 'contain',
  },
  event: {
    width: wp(18),
    height: wp(18),
    resizeMode: 'contain',
  },
  selectFeatures: {
    gap: wp(10),
    marginTop: hp(18),
    marginBottom: hp(10),
  },
  optionText1: {
    ...commonFontStyle(700, 18, colors._1B1515),
  },
  description: {
    paddingVertical: hp(20),
    paddingHorizontal: wp(20),
    ...commonFontStyle(400, 16, '#444444'),
  },
  headerTitle: {
    ...commonFontStyle(700, 24, colors.black),
    padding: wp(18),
  },
  down: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'contain',
  },
  day: {
    ...commonFontStyle(600, 18, colors._BD2332),
  },
  addlabel: {
    ...commonFontStyle(600, 18, colors.black),
  },
  dateContainor: {
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
    paddingBottom: hp(10),
    alignItems: 'flex-start',
  },
  content: {
    gap: hp(18),
    marginVertical: hp(10),
  },
  infoContainor: {
    paddingHorizontal: wp(20),
  },
  label: {
    ...commonFontStyle(600, 16, colors._444444),
  },
  value: {
    ...commonFontStyle(600, 18, colors._BD2332),
  },
  horizontal_divider: {
    height: 1,
    backgroundColor: '#1B151533',
    marginVertical: hp(12),
  },
  website: {
    paddingBottom: hp(10),
  },
  postbtn: {
    backgroundColor: colors._AE1927,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginHorizontal: wp(20),
    marginBottom: hp(18),
  },
  btntxt: {
    ...commonFontStyle(600, 12, colors.white),
    paddingHorizontal: wp(22),
    paddingVertical: hp(8),
  },
  addicon: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'contain',
  },
  infoIcon: {
    width: wp(10),
    height: wp(10),
    resizeMode: 'contain',
    top: -5,
    left: 6,
  },
  bellIcon: {
    width: wp(17),
    height: wp(18),
    resizeMode: 'contain',
  },
  photo: {
    ...commonFontStyle(700, 24, colors._1B1515),
  },
  photoContainor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp(28),
    paddingHorizontal: wp(20),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: 12,
    marginBottom: 14,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 48,
  },
  avatar1: {
    width: 48,
    height: 48,
    borderRadius: 48,
    borderWidth: 2,
    left: -14,
  },
  extraAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    left: -10,
  },
  extraText: {
    ...commonFontStyle(700, 8, 'white'),
  },

  container1: {
    // padding: 16,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 12,
    // margin: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  message_icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  avatar2: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginRight: 5,
  },
  username: {
    ...commonFontStyle(500, 13, '#444444'),
  },
  commentText: {
    ...commonFontStyle(400, 16, '#444444'),
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentCount: {
    marginLeft: 6,
    marginRight: 8,
    ...commonFontStyle(500, 16, '#444444'),
  },
  viewAll: {
    ...commonFontStyle(500, 16, '#444444'),
  },

  modalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.black,
    paddingVertical: 17,
    paddingHorizontal: 24,
    gap: 8,
    borderRadius: 12,
  },
  modalText: {
    ...commonFontStyle(700, 18, colors.black),
  },
  iconStyle: {
    width: 16,
    height: 15,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  iconStyle1: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  shareIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  logo_white: {
    width: 16,
    height: 22,
    resizeMode: 'contain',
  },
  shareText: {
    ...commonFontStyle(700, 18, colors.primary1),
  },

  containerBg: {
    height: 370,
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
    paddingVertical: 28,
    marginTop: 12,
  },
  image: {
    borderRadius: 18,
  },
  image1: {
    borderRadius: 8,
  },
  text1: {
    ...commonFontStyle(600, 14, colors.white),
    flex: 1,
  },
  text2: {
    ...commonFontStyle(700, 24, colors.white),
  },
  text3: {
    ...commonFontStyle(600, 14, colors.white),
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
    marginTop: 12,
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

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position: 'absolute',
    // bottom: 30, // Position at the bottom
    // alignSelf: 'center', // Center horizontally
    marginHorizontal: 20,
    // marginVertical: 10,
     marginTop: 8,
  },
});
