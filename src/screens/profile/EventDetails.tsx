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
import {IMAGES} from '../../assets/Images';
import {Button, CustomHeader, LinearView} from '../../component';
import {SCREEN_WIDTH, commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import HeaderTextIcon from '../../component/common/HeaderTextIcon';
import TravelCard from '../../component/common/TravelCard';
import {SwiperData} from '../../utils/constents';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {SharedElement} from 'react-native-shared-element';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import AddToListBottomSheet from '../../component/common/AddToListBottomSheet';
import {navigationRef} from '../../navigation/RootContainer';
import CustomTabBar from '../../component/common/CustomTabBar';
import {useScrollHideAnimation} from '../../hook/useScrollHideAnimation';
import Reanimated from 'react-native-reanimated';

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

// const cards = [
//   {
//     id: 1,
//     title: 'Samuri Japanese Restaurant',
//     location: '979 Lomas Santa Fe Dr, Solana Beach...',
//     lists: 31,
//     image: 'https://source.unsplash.com/600x400/?egypt,pyramids',
//     onPress: () => navigateTo(SCREENS.EventDetails),
//   },
//   {
//     id: 2,
//     title: 'Mt. Hood Timber Lodge',
//     location: 'National park in California',
//     lists: 23,
//     image: 'https://source.unsplash.com/600x400/?unesco,heritage',
//   },
//   {
//     id: 3,
//     title: 'Samuri Japanese Restaurant',
//     location: '979 Lomas Santa Fe Dr, Solana Beach...',
//     lists: 6,
//     image: 'https://source.unsplash.com/600x400/?london,big-ben',
//   },
//   {
//     id: 4,
//     title: 'Mt. Hood Timber Lodge',
//     location: 'National park in California',
//     lists: 11,
//     image: 'https://source.unsplash.com/600x400/?peru,mountains',
//   },
// ];

const EventDetails = ({route}) => {
  const {animatedStyle, scrollHandler, isVisible} = useScrollHideAnimation(
    80,
    10,
  );
  const {item: initialItem, data: cards, onGoBack, showEvent} = route.params; // Get the single item passed

  const navigation = useNavigation();

  const flatListRef = useRef(null);

  const bottomSheetAddListRef = useRef<BottomSheetModal>(null);

  const handlePresentAddlistPress = useCallback(() => {
    bottomSheetAddListRef.current?.present();
  }, []);
  const handlePresentAddlistClose = useCallback(() => {
    bottomSheetAddListRef.current?.close();
  }, []);

  // Find the initial index of the passed item within the hardcoded data
  const initialIndex = cards.findIndex(
    dataItem => dataItem.id === initialItem.id,
  ); //

  // Use a state to control FlatList visibility after scrolling
  const [flatListReady, setFlatListReady] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const listOfComments = !showComments ? [1] : [1, 2, 3, 4];

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
          <View style={AppStyles.row}>
            <Text style={styles.platform}>{item?.platform}</Text>
            <Image
              source={IMAGES.mdi_instagram}
              style={{
                width: wp(17),
                height: wp(17),
                resizeMode: 'contain',
              }}
            />
          </View>
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
          {marginBottom: isVisible ? 10 : 0},
        ]}>
        <TouchableOpacity
          onPress={() => {
            onGoBack && onGoBack('Map View');
            navigationRef.goBack();
          }}>
          <Image
            source={IMAGES.map1}
            style={{width: 17, height: 17, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {cards.map((_, index) => {
            return <View key={index} style={getDotStyle(index)} />;
          })}
        </View>
        <TouchableOpacity
          onPress={() => {
            onGoBack && onGoBack('List View');
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
        backImg={IMAGES.back1}
        showBack={true}
        backIconStyle={styles.back}
        showSearch={false}
        moreImg={IMAGES.more_icon}
        moreIconStyle={styles.more}
        headerStyle={styles.header}
      />

      {initialIndex !== -1 && ( // Only render FlatList if initial item is found
        <FlatList
          ref={flatListRef}
          data={cards}
          renderItem={({item}) => {
            return (
              //       <Reanimated.ScrollView
              // showsVerticalScrollIndicator={false}
              // style={{flex: 1}}
              // onScroll={scrollHandler}>
              <Reanimated.ScrollView
                onScroll={scrollHandler}
                showsVerticalScrollIndicator={false}
                style={styles.scroll}>
                {/* <SharedElement id={`item.${item?.id}.image`}> */}
                <ImageBackground
                  source={IMAGES.bbq}
                  imageStyle={styles.placeimges}
                  style={styles.place}>
                  {/* <SharedElement id={item?.title}> */}
                  <Text style={styles.placeTitle}>{item?.title}</Text>
                  {/* </SharedElement> */}
                  <View style={styles.location}>
                    <Image source={IMAGES.wordWide} style={styles.pin} />
                    {/* <SharedElement id={item?.location}> */}
                    <Text style={styles.address}>{item?.location}</Text>
                    {/* </SharedElement> */}
                  </View>
                  <View style={styles.timecontainer}>
                    <Text style={styles.time}>{'May 10'}</Text>
                    <Image source={IMAGES.arrow} style={styles.arrow} />
                    <Text style={styles.time}>{'May 11'}</Text>
                  </View>
                </ImageBackground>
                {/* </SharedElement> */}
                <View style={[AppStyles.row, styles.eventContainor]}>
                  <View style={[AppStyles.row, styles.eventrow]}>
                    <Image source={IMAGES.world} style={styles.eventicon} />
                    <Text style={styles.graylabel}>{'Public Event'}</Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={[AppStyles.row, styles.eventrow]}>
                    <Image source={IMAGES.follower} style={[styles.followe]} />
                    <Text style={styles.graylabel}>{'1.2K Follows'}</Text>
                  </View>
                </View>
                {!showEvent ? (
                  <Button
                    titleStyle={styles.btn}
                    BtnStyle={styles.event}
                    title="Follow Event"
                  />
                ) : (
                  <View style={{height: 16}} />
                )}
                <View style={[AppStyles.row, styles.features]}>
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
                      navigateTo(SCREENS.BeenThere);
                    }}
                    style={[styles.optionItem]}>
                    <Image style={styles.check} source={IMAGES.been} />
                    <Text style={[styles.optionText]}>{'Been There'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      navigateTo(SCREENS.Favorites);
                    }}
                    style={[styles.optionItem]}>
                    <Image style={styles.fav} source={IMAGES.fav} />
                    <Text style={[styles.optionText]}>{'Favs'}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button}>
                    <Image
                      source={IMAGES.canlder}
                      style={{
                        width: wp(18),
                        height: wp(18),
                        resizeMode: 'contain',
                        tintColor: colors.black,
                      }}
                    />
                    <Text style={styles.buttonText}>Event</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.emoji}>🧑‍🍳</Text>
                    <Text style={styles.buttonText}>Food</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.container}>
                  <LinearView containerStyle={styles.linearview}>
                    <Text style={styles.review}>
                      Fashion Valley is an upscale, open-air shopping mall in
                      Mission Valley in San Diego, California. The shopping
                      center hosts 1,720,533 sq ft of leasable floor area,
                      making it the largest mall in San Diego and one of the...
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
                        <Text style={styles.day}>
                          {'Saturday May 10, 2025'}
                        </Text>
                        <Text style={styles.addlabel}>{'10am - 9pm'}</Text>
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
                      <Text style={styles.value}>{'calibbqfestival.com'}</Text>
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
                      {listOfComments?.map(() => {
                        return (
                          <>
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
                              You know it’s a good California burrito when you
                              don’t need to as for guac because it’s already
                              included. Best Cali burrito in SD imo. Their
                              machaca burrito is killer too.
                            </Text>
                          </>
                        );
                      })}

                      <View style={styles.separator} />

                      {/* Comments */}
                      <TouchableOpacity
                        onPress={() => {
                          setShowComments(!showComments);
                        }}
                        style={[
                          styles.row,
                          {
                            justifyContent: 'space-between',
                            paddingVertical: hp(12),
                          },
                        ]}>
                        <Text style={styles.commentLink}>
                          {showComments
                            ? 'Show less comments'
                            : 'View all comments'}
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
                        marginTop: 16,
                        gap: wp(15),
                      }}
                      // style={{marginTop: hp(16)}}
                      renderItem={({item}) => (
                        <TravelCard
                          {...item}
                          BGStyle={[styles.bg, {height: hp(150)}]}
                        />
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
                        marginTop: 16,
                        gap: wp(15),
                      }}
                      // style={{marginTop: hp(16)}}
                      renderItem={({item}) => <SocialCard {...item} />}
                    />
                  </LinearView>
                </View>
                {/* <View style={{height: 180}} /> */}
              </Reanimated.ScrollView>
              //  </Reanimated.ScrollView>
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
      )}

      {renderPaginationDots()}
      <AddToListBottomSheet
        bottomSheetModalRef={bottomSheetAddListRef}
        maxDynamicContentSize={true}
        handleSheetChanges={e => handleSheetChanges(e)}
        isVisible={isVisible}
      />
      {isVisible && <SafeAreaView edges={['top']} />}
      <Reanimated.View style={[AppStyles.actionBar, animatedStyle]}>
        <CustomTabBar />
      </Reanimated.View>
    </SafeAreaView>
  );
};

export default EventDetails;

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
  placeimges: {
    borderRadius: 20,
  },
  placeTitle: {
    textAlign: 'center',
    ...commonFontStyle(700, 32, colors.white),
  },
  maincontainer: {
    backgroundColor: colors.white,
  },
  place: {
    width: 'auto',
    resizeMode: 'contain',
    height: hp(555),
    marginBottom: wp(18),
    marginTop: hp(5),
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  pin: {
    resizeMode: 'contain',
    width: wp(24),
    height: wp(24),
    tintColor: colors.white,
  },
  address: {
    ...commonFontStyle(600, 14, colors.white),
  },
  scroll: {
    width: width,
    // flex: 1,
    // paddingHorizontal: wp(16),
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
  },
  eventContainor: {
    gap: wp(8),
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
  btn: {
    ...commonFontStyle(600, 16, colors.white),
  },
  event: {
    marginVertical: hp(8),
    paddingVertical: 15,
  },
  features: {
    gap: wp(4),
  },
  add: {
    width: wp(15),
    height: hp(20),
    resizeMode: 'contain',
    tintColor: '#BD2332',
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
  optionText: {
    ...commonFontStyle(500, 14, colors.primary1),
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: wp(10),
    marginTop: hp(8),
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
  dateContainor: {
    justifyContent: 'space-between',
    paddingHorizontal: wp(20),
    paddingBottom: hp(10),
    alignItems: 'flex-start',
  },
  day: {
    ...commonFontStyle(600, 18, colors._BD2332),
  },
  addlabel: {
    ...commonFontStyle(600, 18, colors.black),
  },
  down: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'contain',
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
    flex: 1,
  },
  post: {
    ...commonFontStyle(500, 10, colors.white),
  },
  slider: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
  container: {
    marginVertical: hp(8),
    gap: hp(8),
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
