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
import {IMAGES} from '../../assets/Images';
import {commonFontStyle, hp, SCREEN_HEIGHT, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {
  Button,
  Checklist,
  CommonSheet,
  CustomHeader,
  LinearView,
  SearchBar,
} from '../../component';
import RenderPrivacyOption from '../../component/createNew/RenderPrivacyOption';
import CustomBtn from '../../component/common/CustomBtn';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import TogolistPro from '../../component/common/TogolistPro';
import CategoryCard from '../../component/trip/CategoryCard';
import {useNavigation, useRoute} from '@react-navigation/native';
import HeaderTextIcon from '../../component/common/HeaderTextIcon';
import {SharedElement} from 'react-native-shared-element';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';

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

const {width} = Dimensions.get('window');

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

const PastTripDetails = ({route}: any) => {
  const {item: initialItem, data: cards} = route.params; // Get the single item passed
  const navigation = useNavigation();

  const flatListRef = useRef(null);

  // Find the initial index of the passed item within the hardcoded data
  const initialIndex = cards.findIndex(
    dataItem => dataItem.id === initialItem.id,
  ); //

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

  const [privacy, setPrivacy] = useState<'public' | 'private'>('public');
  const {params} = useRoute();
  const [showTogolistPro, setShowTogolistPro] = useState(true);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const bottomSheetModalRefShare = useRef<BottomSheetModal>(null);
  const handlePresentModalSharePress = useCallback(() => {
    bottomSheetModalRefShare.current?.present();
  }, []);

  const [step, setStep] = useState(2);
  const [upload, setUpload] = useState(false);
  const [references, setReferences] = useState(false);

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
      <View style={styles.paginationContainer}>
        <Image
          source={IMAGES.map1}
          style={{width: 17, height: 17, resizeMode: 'contain'}}
        />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {cards.map((_, index) => {
            return <View key={index} style={getDotStyle(index)} />;
          })}
        </View>
        <Image
          source={IMAGES.menu1}
          style={{width: 17, height: 17, resizeMode: 'contain'}}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader
        backImg={IMAGES.back1}
        backIconStyle={styles.back}
        showBack={true}
        showSearch={false}
        moreImg={IMAGES.more_icon}
        moreIconStyle={styles.more}
        headerStyle={styles.header}
        title={params?.pastTrips ? 'Past Trips' : 'Trips'}
      />
      {/* {step == 2 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[AppStyles.P16, {gap: hp(8)}]}>
          
        </ScrollView>
      )} */}

      {initialIndex !== -1 && ( // Only render FlatList if initial item is found
        <FlatList
          ref={flatListRef}
          data={cards}
          showsVerticalScrollIndicator={false}
          
          contentContainerStyle={[{gap: hp(8)}]}
          renderItem={({item}) => {
            return (
              <ScrollView
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[{gap: hp(8)}]}>
                <ImageBackground
                  source={IMAGES.trips_bg}
                  imageStyle={styles.placeimges}
                  style={styles.place}>
                  <SharedElement id={item?.title}>
                    <Text style={styles.placeTitle}>{item?.title}</Text>
                  </SharedElement>
                  <View style={styles.location}>
                    <SharedElement id={item?.location}>
                      <Text style={styles.address}>{'Starts in 60 Days'}</Text>
                    </SharedElement>
                  </View>
                  <View style={styles.timecontainer}>
                    <Text style={styles.time}>{'May 10'}</Text>
                    <Image source={IMAGES.arrow} style={styles.arrow} />
                    <Text style={styles.time}>{'May 11'}</Text>
                  </View>
                </ImageBackground>
                {showTogolistPro ? (
                  <TogolistPro
                    cardStyle={{marginBottom: 10,marginTop:6}}
                    onClosePress={() => {
                      setShowTogolistPro(false);
                    }}
                  />
                ) : (
                  <View style={{marginBottom: 8}} />
                )}

                <LinearView containerStyle={styles.notificationRow}>
                  <Text style={styles.notificationtitle}>{'Share trip '}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      handlePresentModalSharePress();
                    }}>
                    <Image source={IMAGES.share1} style={styles.notification} />
                  </TouchableOpacity>
                </LinearView>
                <View style={[AppStyles.row, {marginTop: 0}]}>
                  <Text style={[styles.Tripphoto, {flex: 1}]}>
                    {'Trip Togolists'}
                  </Text>
                  <TouchableOpacity>
                    <Image source={IMAGES.add_icon} style={styles.addicon} />
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={categories}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => {
                    return (
                      <CategoryCard
                        // onCardPress={() => {
                        //   navigateTo(SCREENS.BucketListDetails);
                        // }}
                        onCardPress={() => {
                          navigateTo(SCREENS.ThingsTogolistsScreen, {
                            isBack: true,
                          });
                        }}
                        title={item?.title}
                        Togolist={item?.category}
                        Lists
                        listCount={item?.places}
                        showAddList={true}
                      />
                    );
                  }}
                />
                <LinearView>
                  <Text style={styles.headerTitle}>{'People'}</Text>
                  <View style={[styles.row, styles.people]}>
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
                      <Image source={IMAGES.addIcon} style={[styles.avatar1]} />
                    </TouchableOpacity>
                  </View>
                </LinearView>

                <LinearView>
                  <Text style={styles.headerTitle}>{'Notes'}</Text>
                  <View style={[styles.infoContainor]}>
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
                    <View style={styles.userheader}>
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
                      What is everyone’s preference for area for our
                      accommodation?
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
                    <Text style={styles.todoTitle}>{'To Do List'}</Text>
                  </View>
                  <View>
                    <Checklist
                      data={[
                        {
                          id: '1',
                          label: 'Things to do for the trip...',
                          checked: false,
                        },
                      ]}
                    />
                  </View>
                </LinearView>
                <LinearView>
                  <View style={styles.photoContainor}>
                    <View style={styles.uploadRow}>
                      <Text style={styles.uploadTitle}>{'Uploads'}</Text>
                      <Image source={IMAGES.info} style={styles.infoIcon} />
                    </View>
                    <TouchableOpacity onPress={() => setUpload(!upload)}>
                      <Image source={IMAGES.add_icon} style={styles.addicon} />
                    </TouchableOpacity>
                  </View>
                  {upload ? (
                    <FlatList
                      data={[1, 2, 3, 4]}
                      numColumns={2}
                      contentContainerStyle={{gap: wp(15), padding: wp(20)}}
                      columnWrapperStyle={{
                        gap: wp(15),
                        justifyContent: 'space-between',
                      }}
                      renderItem={({item, index}) => (
                        <Image source={IMAGES.bg1} style={styles.upload} />
                      )}
                    />
                  ) : (
                    <Text style={styles.description}>
                      {'Photos, flight & hotel info & other docs...'}
                    </Text>
                  )}
                </LinearView>
                <LinearView containerStyle={[styles.Budgatecard]}>
                  <View style={[styles.budgaterow, {marginBottom: hp(18)}]}>
                    <View style={styles.uploadRow}>
                      <Text style={styles.Budgettitle}>Spending</Text>
                      <Image source={IMAGES.info} style={styles.infoIcon} />
                    </View>
                    <Image source={IMAGES.edit_icon} style={styles.edit} />
                  </View>
                  {[
                    ['Flights', '$0'],
                    ['Hotel', '$0'],
                    ['Food', '$0'],
                    ['Tickets', '$0'],
                    ['New item', '$0'],
                    ['Total', '$0'],
                  ].map(([label, value], i) => (
                    <>
                      {i === 5 && (
                        <View
                          style={[styles.devider, {marginVertical: hp(4)}]}
                        />
                      )}
                      <View style={styles.achievementRow} key={i}>
                        <Text
                          style={[
                            styles.achievementLabel,
                            i === 4 && styles.totalLabel1,
                            i === 5 && styles.totalLabel,
                          ]}>
                          {label}
                        </Text>
                        <Text
                          style={[
                            styles.achievementValue,
                            i === 4 && styles.totalValue1,
                            i === 5 && styles.totalValue,
                          ]}>
                          {value}
                        </Text>
                      </View>
                    </>
                  ))}
                </LinearView>
                <LinearView containerStyle={styles.photos}>
                  <HeaderTextIcon
                    headerStyle={styles.phototitle}
                    title={'References'}
                    showAddIcon={true}
                    showDown={false}
                    titleStyle={commonFontStyle(700, 24, colors._1B1515)}
                    onAddPress={() => setReferences(!references)}
                  />
                  {references ? (
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
                  ) : (
                    <Text
                      style={[
                        styles.description,
                        {padding: 0, paddingTop: hp(16)},
                      ]}>
                      Save reference links to relevant social media posts, blogs
                      & more...
                    </Text>
                  )}
                </LinearView>
                {/* <LinearView containerStyle={styles.rainRow}>
            <Text>{'Need a rain check?'}</Text>
            <Button
              title="Convert to Bucket List"
              BtnStyle={styles.bucketBtn}
              titleStyle={{...commonFontStyle(600, 12, colors.white)}}
            />
          </LinearView> */}
              </ScrollView>
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
      <CommonSheet
        title="Cover Image"
        bottomSheetModalRef={bottomSheetModalRef}
        children={
          <View style={styles.container}>
            <Button
              BtnStyle={styles.photo}
              title="From Photo Library"
              leftImg={IMAGES.upload}
            />
            <Button
              BtnStyle={styles.file}
              title="From Files"
              type="outline"
              leftImg={IMAGES.file}
              titleStyle={styles.Fieltitle}
            />
            <SearchBar
              container={styles.search}
              searchImg={IMAGES.search1}
              placeholder={'Search Unsplash'}
            />
            <FlatList
              numColumns={3}
              columnWrapperStyle={{flexWrap: 'wrap', gap: wp(8)}}
              contentContainerStyle={{gap: hp(8)}}
              data={new Array(9).fill(null)}
              renderItem={({item, index}) => (
                <Image source={IMAGES.bg} style={styles.bg} />
              )}
            />
          </View>
        }
      />

      <CommonSheet
        bottomSheetModalRef={bottomSheetModalRefShare}
        maxDynamicContentSize={SCREEN_HEIGHT * 0.75}
        children={
          <>
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
          </>
        }
        title="Share Trip"
      />
    </SafeAreaView>
  );
};

export default PastTripDetails;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    paddingVertical: 20,

    flex: 1,
    marginHorizontal: wp(16),
  },
  title: {
    ...commonFontStyle(700, 32, '#FFFFFF99'),
    marginBottom: hp(15),
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: wp(5),
  },
  card1: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    paddingVertical: hp(16),
  },
  cardText: {
    ...commonFontStyle(500, 16, '#3C3C4399'),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    paddingVertical: hp(16),
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
  icon: {
    height: wp(24),
    width: wp(24),
    resizeMode: 'contain',
    marginRight: 5,
  },
  icon1: {
    height: wp(22),
    width: wp(22),
    resizeMode: 'contain',
    marginRight: 5,
    tintColor: '#3C3C4399',
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
  header: {
    paddingHorizontal: wp(16),
  },
  privacyContainer: {
    position: 'absolute',
    paddingHorizontal: 24,
    bottom: 100,
    width: '100%',
  },
  button: {
    position: 'absolute',
    paddingHorizontal: wp(80),
    bottom: 24,
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: 14,
  },
  buttonText: {
    ...commonFontStyle(700, 18, colors.primary1),
  },
  photo: {
    backgroundColor: colors.primary,
    paddingVertical: hp(16),
    gap: wp(12),
  },
  file: {
    borderColor: colors.black,
    paddingVertical: hp(12),
  },
  Fieltitle: {
    ...commonFontStyle(700, 15, colors.black),
  },
  container: {
    gap: hp(16),
  },
  search: {
    marginVertical: hp(0),
  },
  bg: {
    flex: 1,
    height: hp(150),
    borderRadius: 20,
  },
  placeimges: {
    borderRadius: 20,
  },
  placeTitle: {
    ...commonFontStyle(700, 32, colors.white),
  },
  place: {
    width: 'auto',
    resizeMode: 'contain',
    height: hp(555),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(4),
    marginTop: hp(12),
  },
  address: {
    ...commonFontStyle(600, 14, colors.white),
  },
  pin: {
    resizeMode: 'contain',
    width: wp(24),
    height: wp(24),
    tintColor: colors.white,
  },
  timecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
    paddingBottom: hp(38),
    marginTop: hp(4),
  },
  time: {
    ...commonFontStyle(500, 14, colors.white),
  },
  arrow: {
    resizeMode: 'contain',
    width: wp(12),
    height: wp(12),
  },
  addicon: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'contain',
  },
  Tripphoto: {
    ...commonFontStyle(700, 24, colors._1B1515),
  },
  headerTitle: {
    ...commonFontStyle(700, 24, colors.black),
    padding: wp(18),
  },
  avatar: {
    width: wp(48),
    height: wp(48),
    borderRadius: 48,
  },
  avatar1: {
    width: wp(48),
    height: wp(48),
    borderRadius: 48,
    borderWidth: 2,
    left: wp(-20),
  },
  people: {
    alignSelf: 'flex-start',
    paddingBottom: hp(18),
  },
  infoContainor: {
    paddingHorizontal: wp(20),
  },
  label: {
    ...commonFontStyle(600, 16, colors._444444),
  },
  postbtn: {
    backgroundColor: colors._AE1927,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    marginHorizontal: wp(20),
    marginBottom: hp(18),
    marginTop: hp(6),
  },
  btntxt: {
    ...commonFontStyle(600, 12, colors.white),
    paddingHorizontal: wp(22),
    paddingVertical: hp(8),
  },
  horizontal_divider: {
    height: 1,
    backgroundColor: '#1B151533',
    marginVertical: hp(12),
  },
  container1: {
    // padding: 16,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 12,
    // margin: 16,
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
  message_icon: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'contain',
  },
  userheader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(10),
  },
  photoContainor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp(20),
    paddingHorizontal: wp(20),
  },
  todoTitle: {
    ...commonFontStyle(700, 24, colors._1B1515),
  },
  ItineraryTitle: {
    ...commonFontStyle(700, 24, colors._1B1515),
  },
  ItineraryContainor: {
    paddingHorizontal: wp(16),
  },
  ItineraryCard: {
    padding: wp(20),
    margin: wp(10),
  },
  Itineraryheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Itinerarytitle: {
    ...commonFontStyle(700, 24, colors.black),
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(16),
    marginTop: hp(16),
  },
  dayText: {
    ...commonFontStyle(700, 20, colors.black),
  },
  addText: {
    ...commonFontStyle(500, 16, colors._99999),
  },
  separator: {
    height: 1,
    backgroundColor: '#1B151533',
    marginVertical: hp(2),
  },
  addButtonText: {
    ...commonFontStyle(600, 14, colors.primary),
  },
  addButton: {
    paddingVertical: hp(15),
    marginTop: hp(16),
    gap: wp(12),
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
  },
  addImg: {
    width: wp(20),
    height: wp(20),
    resizeMode: 'contain',
  },
  daterow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
  },
  edit: {
    width: wp(21),
    height: wp(21),
    resizeMode: 'contain',
  },
  infoIcon: {
    width: wp(10),
    height: wp(10),
    resizeMode: 'contain',
    top: -5,
    left: 6,
  },
  uploadRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadTitle: {
    ...commonFontStyle(700, 24, colors._1B1515),
  },
  description: {
    ...commonFontStyle(400, 16, colors._444444),
    padding: wp(20),
  },
  upload: {
    flex: 1,
    height: hp(150),
    resizeMode: 'cover',
    borderRadius: 20,
  },
  devider: {
    height: hp(0.5),
    backgroundColor: '#3C3C4399',
    flex: 1,
  },
  achievementLabel: {...commonFontStyle(400, 16, colors._444444)},
  achievementValue: {...commonFontStyle(400, 16, colors._444444)},
  achievementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(12),
    // marginTop: hp(12),
  },
  totalLabel: {...commonFontStyle(600, 13, colors.primary)},
  totalLabel1: {...commonFontStyle(500, 16, '#3C3C4399')},
  totalValue: {...commonFontStyle(600, 16, colors._444444)},
  totalValue1: {...commonFontStyle(400, 16, colors._444444)},
  Budgatecard: {
    marginHorizontal: wp(16),
    borderRadius: wp(12),
    padding: wp(16),
    justifyContent: 'center',
  },
  budgaterow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Budgettitle: {
    ...commonFontStyle(700, 24, colors.black),
  },
  photos: {
    padding: wp(20),
  },
  phototitle: {
    marginTop: 0,
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
  bucketBtn: {
    paddingVertical: hp(8),
    paddingHorizontal: wp(12),
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  rainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(10),
    paddingHorizontal: wp(18),
  },
  notification: {
    width: wp(18),
    height: wp(18),
    resizeMode: 'contain',
    tintColor: colors.black,
  },
  notificationtitle: {
    ...commonFontStyle(600, 16, colors.black),
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(18),
    paddingVertical: hp(10),
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

  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position: 'absolute',
    // bottom: 30, // Position at the bottom
    // alignSelf: 'center', // Center horizontally
    marginHorizontal: 16,
    marginVertical: 10,
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
