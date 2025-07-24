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
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {Button, CommonSheet, CustomHeader, LinearView} from '../../component';
import {IMAGES} from '../../assets/Images';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  commonFontStyle,
  hp,
  wp,
} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import Swiper from 'react-native-swiper';
import {SwiperData} from '../../utils/constents';
import HeaderTextIcon from '../../component/common/HeaderTextIcon';
import TravelCard from '../../component/common/TravelCard';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import Reanimated from 'react-native-reanimated';
import CustomTabBar from '../../component/common/CustomTabBar';
import {useScrollHideAnimation} from '../../hook/useScrollHideAnimation';
import {navigationRef} from '../../navigation/RootContainer';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import AddToListBottomSheet from '../../component/common/AddToListBottomSheet';

const {width} = Dimensions.get('window');

const photos = [
  {
    image: 'https://via.placeholder.com/300x200?text=Aesthetics',
  },
  {
    image: 'https://via.placeholder.com/300x200?text=Tropical',
  },
  {
    image: 'https://via.placeholder.com/300x200?text=Golf',
  },
  {
    image: 'https://via.placeholder.com/300x200?text=Vibes',
  },
];

const reference = [
  {
    image: 'https://via.placeholder.com/300x200?text=Tropical',
    platform: 'Instagram',
  },
  {
    image: 'https://via.placeholder.com/300x200?text=Tropical',
    platform: 'TikTok',
  },
];

const FoodPlace = () => {
  const flatListRef = useRef(null);

  const {animatedStyle, scrollHandler, isVisible} = useScrollHideAnimation(
    80,
    10,
  );
  const slides = useMemo(() => {
    // This will only re-compute if `data` changes.
    return SwiperData?.map((item, index) => (
      <Image
        source={item?.images} // Ensure `item.images` is a valid image source
        resizeMode="cover"
        key={item?.name || `slide-${index}`} // Use a unique and stable key
        style={styles.slider}
      />
    ));
  }, [SwiperData]);

  const SocialCard = useCallback(
    item => {
      return (
        <ImageBackground
          resizeMode="cover"
          style={styles.socialImg}
          imageStyle={{borderRadius: 25}}
          source={IMAGES.bg}>
          <Text style={styles.platform}>{item?.platform}</Text>
          <Text style={styles.post}>{'Post by @emily '}</Text>
        </ImageBackground>
      );
    },
    [reference],
  );

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetUploadModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentUploadModalPress = useCallback(() => {
    bottomSheetUploadModalRef.current?.present();
  }, []);

  const bottomSheetAddListRef = useRef<BottomSheetModal>(null);

  const handlePresentAddlistPress = useCallback(() => {
    bottomSheetAddListRef.current?.present();
  }, []);

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
          {marginBottom: isVisible ? 18 : 0},
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
    <SafeAreaView style={[AppStyles.flex, styles.maincontainer]}>
      <CustomHeader
        showBack={true}
        backImg={IMAGES.back1}
        backIconStyle={styles.back}
        showSearch={false}
        moreImg={IMAGES.more_icon}
        moreIconStyle={styles.more}
        headerStyle={styles.header}
      />

      {true && ( // Only render FlatList if initial item is found

          <FlatList
            ref={flatListRef}
            data={[1, 2]}
            renderItem={({item}) => {
              return (
                <Reanimated.ScrollView
                        onScroll={scrollHandler}
                  style={styles.scroll}
                  showsVerticalScrollIndicator={false}>
                  <View style={styles.container}>
                    <Text style={styles.title}>La Perla Cocina</Text>
                    <View style={styles.locationContainer}>
                      <Image
                        source={IMAGES.location}
                        style={{
                          width: wp(24),
                          height: wp(24),
                          resizeMode: 'contain',
                        }}
                      />
                      <Text style={styles.locationText}>
                        7007 Friars Rd. San Diego, CA
                      </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.button}>
                        <Image
                          source={IMAGES.location}
                          style={{
                            width: wp(18),
                            height: wp(18),
                            resizeMode: 'contain',
                          }}
                        />
                        <Text style={styles.buttonText}>Place</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={styles.button}>
                        <Text style={styles.emoji}>🧑‍🍳</Text>
                        <Text style={styles.buttonText}>Food</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.sliderContainer}>
                      <Swiper
                        nestedScrollEnabled
                        paginationStyle={styles.paginationStyle}
                        dotColor={colors._BD2332_0_3}
                        activeDotColor={colors._BD2332}
                        style={styles.wrapper}>
                        {slides}
                      </Swiper>
                    </View>
                    <View style={[AppStyles.row, styles.features]}>
                      <TouchableOpacity
                        onPress={() => {
                          navigateTo(SCREENS.BeenThere);
                        }}
                        style={[styles.optionItem]}>
                        <Image style={styles.check} source={IMAGES.been} />
                        <Text style={[styles.optionText]}>{'Been There'}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          handlePresentAddlistPress();
                        }}
                        style={[styles.optionItem]}>
                        <Image style={styles.add} source={IMAGES.newList} />
                        <Text style={[styles.optionText]}>{'Add to list'}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          navigateTo(SCREENS.Favorites);
                        }}
                        style={[styles.optionItem]}>
                        <Image style={styles.fav} source={IMAGES.favorite} />
                        <Text style={[styles.optionText]}>{'Favs'}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.BusinessInfoBar}>
                      {/* HOURS */}
                      <View style={styles.infoBlock}>
                        <Text style={styles.label}>HOURS</Text>
                        <Text style={styles.openText}>OPEN</Text>
                      </View>

                      {/* Divider */}
                      <View style={styles.divider} />

                      {/* RANK */}
                      <View style={styles.infoBlock}>
                        <Text style={styles.label}>RANK</Text>
                        <View style={styles.inlineRow}>
                          <Image
                            source={IMAGES.top}
                            style={{
                              width: wp(17),
                              height: hp(24),
                              resizeMode: 'contain',
                            }}
                          />
                          <Text style={styles.rankText}>Top</Text>
                        </View>
                      </View>

                      <View style={styles.divider} />

                      {/* LIST ADDS */}
                      <View style={styles.infoBlock}>
                        <Text style={styles.label}>LIST ADDS</Text>
                        <View style={styles.inlineRow}>
                          <Image
                            source={IMAGES.newList}
                            resizeMode="contain"
                            style={{
                              width: wp(18),
                              height: hp(25),
                              tintColor: colors.black,
                            }}
                          />
                          <Text style={styles.listCount}>276</Text>
                        </View>
                      </View>

                      <View style={styles.divider} />

                      {/* DISTANCE */}
                      <View style={styles.infoBlock}>
                        <Text style={styles.label}>DISTANCE</Text>
                        <View style={styles.inlineRow}>
                          <Image
                            source={IMAGES.distance}
                            resizeMode="contain"
                            style={{width: wp(20), height: wp(20)}}
                          />
                          <Text style={styles.distance}>14 mi</Text>
                        </View>
                      </View>
                    </View>
                    <LinearView containerStyle={styles.linearview}>
                      <Text style={styles.review}>
                        Fashion Valley is an upscale, open-air shopping mall in
                        Mission Valley in San Diego, California. The shopping
                        center hosts 1,720,533 sq ft of leasable floor area,
                        making it the largest mall in San Diego and one of
                        the...
                      </Text>
                      <View style={styles.footer}>
                        <Text style={styles.review}>{'4.5'}</Text>
                        <View style={AppStyles.row}>
                          <Image
                            source={IMAGES.star}
                            style={styles.star}
                            resizeMode="contain"
                          />
                          <Image
                            source={IMAGES.star}
                            style={styles.star}
                            resizeMode="contain"
                          />
                          <Image
                            source={IMAGES.star}
                            style={styles.star}
                            resizeMode="contain"
                          />
                          <Image
                            source={IMAGES.star}
                            style={styles.star}
                            resizeMode="contain"
                          />
                        </View>
                        <Text style={styles.googlereview}>
                          {'16k Google reviews'}
                        </Text>
                      </View>
                    </LinearView>
                    <LinearView>
                      <Text style={styles.headerTitle}>{'Hours'}</Text>
                      <View style={[AppStyles.row, styles.dateContainor]}>
                        <View>
                          <Text style={styles.day}>{'9:00am - 8:00pm'}</Text>
                          <Text style={styles.Open}>{'Open'}</Text>
                        </View>
                        <TouchableOpacity>
                          <Image source={IMAGES.dropdown} style={styles.down} />
                        </TouchableOpacity>
                      </View>
                    </LinearView>
                    <LinearView>
                      <Text style={styles.headerTitle}>{'Details'}</Text>
                      <View style={styles.infoContainor}>
                        <Text style={styles.fildlabel}>{'Phone'}</Text>
                        <Text style={styles.value}>{'+1 (888) 888-8080'}</Text>
                        <View style={styles.horizontal_divider} />
                      </View>
                      <View style={styles.infoContainor}>
                        <Text style={styles.fildlabel}>{'Website'}</Text>
                        <Text style={styles.value}>
                          {'calibbqfestival.com'}
                        </Text>
                        <View style={styles.horizontal_divider} />
                      </View>
                      <View style={[styles.infoContainor, styles.website]}>
                        <Text style={styles.fildlabel}>{'Website'}</Text>
                        <Text style={[styles.value, {color: colors.black}]}>
                          {'7007 Friars Rd San Diego, CA 90000 United States'}
                        </Text>
                      </View>
                    </LinearView>
                    <LinearView>
                      <Text style={styles.headerTitle}>{'Recs & Tips'}</Text>
                      <View style={styles.card}>
                        <View style={styles.horizontal_divider} />
                        {/* User post */}
                        <View
                          style={[
                            styles.row,
                            {justifyContent: 'space-between'},
                          ]}>
                          <View style={styles.row}>
                            <Image
                              source={{uri: 'https://i.pravatar.cc/40'}}
                              style={styles.avatar}
                            />
                            <Text style={styles.username}>@emily</Text>
                          </View>
                          {/* Like section */}
                          <View
                            style={[
                              styles.row,
                              {justifyContent: 'flex-end', gap: wp(4)},
                            ]}>
                            <Image
                              source={IMAGES.favorite}
                              resizeMode="contain"
                              style={styles.fav}
                            />
                            <Text style={styles.likeText}>100</Text>
                          </View>
                        </View>

                        <Text style={styles.contentText}>
                          You know it’s a good California burrito when you don’t
                          need to as for guac because it’s already included.
                          Best Cali burrito in SD imo. Their machaca burrito is
                          killer too.
                        </Text>

                        <View style={styles.separator} />

                        {/* Comments */}
                        <TouchableOpacity
                          style={[
                            styles.row,
                            {
                              justifyContent: 'space-between',
                              paddingVertical: hp(12),
                            },
                          ]}>
                          <Text style={styles.commentLink}>
                            View all comments
                          </Text>
                          <View style={[styles.row, {gap: wp(4)}]}>
                            <Image
                              source={IMAGES.comment}
                              style={styles.comment}
                            />
                            <Text style={styles.commentCount}>10</Text>
                          </View>
                        </TouchableOpacity>

                        <View style={styles.separator} />

                        {/* Add note */}
                        <Text style={styles.noteLabel}>Add a note</Text>
                        <TextInput
                          placeholder="Trip planning and goals of the trip..."
                          style={styles.input}
                          placeholderTextColor={colors.gray}
                        />

                        <TouchableOpacity style={styles.postButton}>
                          <Text style={styles.postText}>Post</Text>
                        </TouchableOpacity>
                      </View>
                    </LinearView>
                    <LinearView containerStyle={styles.photos}>
                      <HeaderTextIcon
                        headerStyle={styles.phototitle}
                        title={'Photos'}
                        showAddIcon={true}
                        showDown={false}
                        onAddPress={() => handlePresentUploadModalPress()}
                        titleStyle={commonFontStyle(700, 24, colors._1B1515)}
                      />
                      <FlatList
                        data={photos}
                        numColumns={2}
                        keyExtractor={(_, index) => index.toString()}
                        columnWrapperStyle={{
                          justifyContent: 'space-between',
                          marginBottom: 16,
                          gap: wp(15),
                        }}
                        style={{marginTop: hp(16)}}
                        renderItem={({item}) => (
                          <TravelCard {...item} BGStyle={styles.bg} />
                        )}
                      />
                    </LinearView>
                    <LinearView containerStyle={styles.photos}>
                      <HeaderTextIcon
                        headerStyle={styles.phototitle}
                        title={'References'}
                        showAddIcon={true}
                        showDown={false}
                        titleStyle={commonFontStyle(700, 24, colors._1B1515)}
                        onAddPress={() => handlePresentModalPress()}
                      />
                      <FlatList
                        data={reference}
                        numColumns={2}
                        keyExtractor={(_, index) => index.toString()}
                        columnWrapperStyle={{
                          justifyContent: 'space-between',
                          marginBottom: 16,
                          gap: wp(15),
                        }}
                        style={{marginTop: hp(16)}}
                        renderItem={({item}) => <SocialCard {...item} />}
                      />
                    </LinearView>
                    {/* <View style={{height: 90}} /> */}
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
            style={true ? {} : {opacity: 0}} // Hide FlatList until ready
            onScroll={Animated.event(
              // Capture scroll events for dot animation
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false}, // 'useNativeDriver: true' not supported for 'onScroll' with 'Animated.event' by default
            )}
            scrollEventThrottle={16} // Update scroll position frequently
          />
     
      )}

      {renderPaginationDots()}
      <CommonSheet
        bottomSheetModalRef={bottomSheetModalRef}
        title="Add Social Link"
        maxDynamicContentSize={
          isVisible ? SCREEN_HEIGHT * 0.33 : SCREEN_HEIGHT * 0.33
        }
        children={
          <View style={[styles.sheet, {marginBottom: isVisible ? 80 : 0}]}>
            <View style={styles.inputContainer}>
              <Image source={IMAGES.link} style={styles.link} />
              <TextInput placeholder="Paste link..." style={styles.linkInput} />
            </View>
            <Button
              title="Done"
              onPress={() => bottomSheetModalRef.current?.dismiss()}
            />
          </View>
        }
      />
      <CommonSheet
        bottomSheetModalRef={bottomSheetUploadModalRef}
        maxDynamicContentSize={
          isVisible ? SCREEN_HEIGHT * 0.33 : SCREEN_HEIGHT * 0.33
        }
        title="Upload Photos"
        children={
          <View style={[styles.sheet, {marginBottom: isVisible ? 80 : 0}]}>
            <Button
              title="From Camera Roll"
              onPress={() => bottomSheetUploadModalRef.current?.dismiss()}
              leftImg={IMAGES.upload}
              leftImgStyle={{
                width: wp(24),
                height: wp(24),
                resizeMode: 'contain',
              }}
            />
            <Button
              title="Take Photo"
              type="outline"
              leftImg={IMAGES.camera}
              leftImgStyle={{
                width: wp(24),
                height: wp(24),
                resizeMode: 'contain',
                tintColor: colors.black,
              }}
              BtnStyle={styles.uploadBtn}
              titleStyle={styles.uploadTitle}
              onPress={() => bottomSheetUploadModalRef.current?.dismiss()}
            />
          </View>
        }
      />
      <AddToListBottomSheet
        bottomSheetModalRef={bottomSheetAddListRef}
        maxDynamicContentSize={true}
        // handleSheetChanges={e => handleSheetChanges(e)}
        isVisible={isVisible}
      />

      {isVisible && <SafeAreaView edges={['top']} />}
      <Reanimated.View style={[AppStyles.actionBar, animatedStyle]}>
        <CustomTabBar />
      </Reanimated.View>
    </SafeAreaView>
  );
};

export default FoodPlace;

const styles = StyleSheet.create({
  maincontainer: {
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
  container: {
    padding: wp(16),
    backgroundColor: colors.white,
    gap: hp(10),
    flex: 1,
  },
  title: {
    ...commonFontStyle(700, 32, colors.black),
  },
  scroll: {
    width: width,
    // flex: 1,
    // paddingHorizontal: wp(16),
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: 20,
    flex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp(4),
  },
  locationText: {
    ...commonFontStyle(600, 14, colors._999999),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: wp(10),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: hp(10),
    paddingHorizontal: wp(16),
    borderWidth: 1,
    borderColor: '#1B151533',
  },
  buttonText: {
    marginLeft: 6,
    ...commonFontStyle(600, 15, colors.black),
  },
  emoji: {
    fontSize: 18,
  },
  sliderContainer: {
    height: hp(500),
  },
  paginationStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    left: wp(SCREEN_WIDTH / 2 - 80),
    right: wp(SCREEN_WIDTH / 2 - 80),
    paddingVertical: hp(6),
    borderRadius: 100,
    bottom: hp(30),
  },
  wrapper: {},
  slider: {
    flex: 1,
    width: SCREEN_WIDTH,
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
    tintColor: colors.primary1,
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
  BusinessInfoBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hp(8),
  },
  infoBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: hp(4),
  },
  label: {
    ...commonFontStyle(600, 12, colors._999999),
  },
  openText: {
    ...commonFontStyle(700, 14, 'green'),
  },
  rankText: {
    ...commonFontStyle(600, 14, 'crimson'),
  },
  listCount: {
    ...commonFontStyle(600, 14, colors.black),
  },
  distance: {
    ...commonFontStyle(600, 14, colors.black),
  },
  divider: {
    height: '70%',
    width: 1,
    backgroundColor: colors.lightGray,
    marginHorizontal: 6,
  },
  inlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
  },
  linearview: {
    padding: wp(20),
  },
  review: {
    ...commonFontStyle(500, 16, colors.black),
  },
  star: {
    width: wp(24),
    height: wp(24),
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginTop: hp(10),
  },
  googlereview: {
    ...commonFontStyle(500, 14, colors._787878),
  },
  headerTitle: {
    ...commonFontStyle(700, 24, colors.black),
    padding: wp(18),
    paddingBottom: hp(4),
  },
  down: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'contain',
  },
  day: {
    ...commonFontStyle(600, 18, colors.black),
  },
  Open: {
    ...commonFontStyle(600, 18, '#26C243'),
  },
  dateContainor: {
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
    paddingBottom: hp(10),
    alignItems: 'flex-start',
  },
  content: {
    gap: hp(18),
    marginBottom: hp(20),
  },
  infoContainor: {
    paddingHorizontal: wp(20),
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
  fildlabel: {
    ...commonFontStyle(600, 16, colors._444444),
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  username: {
    ...commonFontStyle(600, 14, colors.black),
  },
  contentText: {
    ...commonFontStyle(400, 16, colors.black),
    marginVertical: hp(10),
    lineHeight: 20,
    paddingHorizontal: wp(6),
  },
  likeText: {
    ...commonFontStyle(500, 12, colors._444444),
  },
  commentLink: {
    ...commonFontStyle(500, 16, colors._444444),
  },
  commentCount: {
    ...commonFontStyle(500, 16, colors._444444),
  },
  noteLabel: {
    ...commonFontStyle(600, 16, colors._444444),
  },
  input: {
    ...commonFontStyle(400, 16, colors._787878),
  },
  postButton: {
    alignSelf: 'flex-end',
    backgroundColor: colors._BD2332,
    paddingVertical: hp(8),
    paddingHorizontal: wp(20),
    borderRadius: 8,
    marginBottom: hp(8),
  },
  postText: {
    ...commonFontStyle(600, 14, colors.white),
  },
  card: {
    padding: wp(10),
    paddingHorizontal: wp(16),
  },
  comment: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'contain',
  },
  photos: {
    padding: wp(20),
  },
  phototitle: {
    marginTop: 0,
  },
  bg: {
    width: (SCREEN_WIDTH - 95) / 2,
    flex: 1,
  },
  socialImg: {
    height: hp(181),
    flex: 1,
    justifyContent: 'space-between',
    borderRadius: 15,
    paddingHorizontal: 11,
    paddingVertical: hp(12),
  },
  platform: {
    ...commonFontStyle(600, 11, colors.white),
  },
  post: {
    ...commonFontStyle(500, 10, colors.white),
  },
  sheet: {
    gap: hp(16),
    paddingVertical: hp(16),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(12),
    paddingHorizontal: wp(24),
    paddingVertical: hp(10),
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 12,
  },
  link: {
    width: wp(16),
    height: wp(16),
  },
  linkInput: {
    ...commonFontStyle(400, 16, colors._787878),
  },
  uploadBtn: {
    borderColor: colors._1B1515,
  },
  uploadTitle: {
    ...commonFontStyle(700, 15, colors.black),
  },

  // Styles for the pagination dots
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position: 'absolute',
    // : 10, // Position at the bottom
    // alignSelf: 'center', // Center horizontally
    marginHorizontal: 20,
    marginTop: 8,
    backgroundColor: colors.white,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
    backgroundColor: '#D3D3D3',
  },
  inactiveDot: {
    backgroundColor: '#D3D3D3',
  },
  activeDot: {
    backgroundColor: '#000', // black for active dot
    width: 10,
    height: 10,
  },
  mainDot: {
    backgroundColor: '#E3E3E3',
    width: 8,
    height: 8,
  },
  secondDot: {
    backgroundColor: '#BEBEBE',
    width: 8,
    height: 8,
  },
  thirdDot: {
    backgroundColor: '#CDCDCD',
    width: 8,
    height: 8,
  },
});
