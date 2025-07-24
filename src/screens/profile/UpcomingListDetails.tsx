import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
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
import {
  commonFontStyle,
  hp,
  SCREEN_HEIGHT,
  sharedTransition,
  wp,
} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {
  Button,
  Checklist,
  CommonSheet,
  CustomHeader,
  InviteFriendsSheet,
  LinearView,
  SearchBar,
  ShareTripSheet,
} from '../../component';
import RenderPrivacyOption from '../../component/createNew/RenderPrivacyOption';
import CustomBtn from '../../component/common/CustomBtn';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import TogolistPro from '../../component/common/TogolistPro';
import CategoryCard from '../../component/trip/CategoryCard';
import {useNavigation, useRoute} from '@react-navigation/native';
import HeaderTextIcon from '../../component/common/HeaderTextIcon';
import ReactNativeModal from 'react-native-modal';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import {SwipeListView} from 'react-native-swipe-list-view';
import {SharedElement} from 'react-native-shared-element';
import {navigationRef} from '../../navigation/RootContainer';
import Reanimated from 'react-native-reanimated';
import {useScrollHideAnimation} from '../../hook/useScrollHideAnimation';
import CustomTabBar from '../../component/common/CustomTabBar';

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

const cards = [
  {
    id: 1,
    title: 'Canada Expereince',
    lists: 31,
    image: 'https://source.unsplash.com/600x400/?egypt,pyramids',
  },
  {
    id: 2,
    title: 'Europe Adventure',
    location: 'National park in California',
    lists: 23,
    image: 'https://source.unsplash.com/600x400/?unesco,heritage',
  },
];

const {width} = Dimensions.get('window');

const UpcomingListDetails = ({route}) => {
  const {animatedStyle, scrollHandler, isVisible} = useScrollHideAnimation(
    80,
    10,
  );
  const [privacy, setPrivacy] = useState<'public' | 'private'>('public');
  const {params} = useRoute();
  const [showTogolistPro, setShowTogolistPro] = useState(true);

  const {item: initialItem} = route.params; // Get the single item passed
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

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const bottomSheetInviteModalRef = useRef<BottomSheetModal>(null);
  const handlePresentInviteModalPress = useCallback(() => {
    bottomSheetInviteModalRef.current?.present();
  }, []);

  const bottomSheetUploadModalRef = useRef<BottomSheetModal>(null);
  const handlePresentUploadModalPress = useCallback(() => {
    bottomSheetUploadModalRef.current?.present();
  }, []);

  const bottomSheetUrlModalRef = useRef<BottomSheetModal>(null);
  const handlePresentUrlModalPress = useCallback(() => {
    bottomSheetUrlModalRef.current?.present();
  }, []);

  const bottomSheetShareModalRef = useRef<BottomSheetModal>(null);
  const handlePresentShareModalPress = useCallback(() => {
    bottomSheetShareModalRef.current?.present();
  }, []);

  const [step, setStep] = useState(1);
  const [upload, setUpload] = useState(false);
  const [references, setReferences] = useState(false);
  const [uploadModel, setUploadModel] = useState(false);

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
      <View style={[styles.paginationContainer,{marginBottom: isVisible ? 18 : 0}]}>
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
          {cards.map((_, index) => {
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
    <SafeAreaView style={[AppStyles.mainWhiteContainer]}>
      <CustomHeader
        backImg={IMAGES.back1}
        backIconStyle={styles.back}
        showSearch={false}
        showBack={true}
        moreImg={IMAGES.more_icon}
        onMorePress={() => handlePresentInviteModalPress()}
        moreIconStyle={styles.more}
        headerStyle={styles.header}
        title={params?.pastTrips ? 'Past Trips' : 'Trips'}
      />

      {initialIndex !== -1 && ( // Only render FlatList if initial item is found
      
          <FlatList
            ref={flatListRef}
            data={cards}
            renderItem={({item}) => {
              return (
                <Reanimated.ScrollView
                        onScroll={scrollHandler}
                  showsVerticalScrollIndicator={false}
                  style={styles.scroll}
                  contentContainerStyle={{gap: hp(8)}}>
                  <ImageBackground
                    source={IMAGES.bbq}
                    imageStyle={styles.placeimges}
                    style={styles.place}>
                    <SharedElement id={item?.title}>
                      <Text style={styles.placeTitle}>{item?.title}</Text>
                    </SharedElement>
                    <View style={styles.location}>
                      <Text style={styles.address}>{'Starts in 60 Days'}</Text>
                    </View>
                    <View style={styles.timecontainer}>
                      <Text style={styles.time}>{'May 10'}</Text>
                      <Image source={IMAGES.arrow} style={styles.arrow} />
                      <Text style={styles.time}>{'May 11'}</Text>
                    </View>
                  </ImageBackground>
                  {showTogolistPro ? (
                    <TogolistPro
                      cardStyle={{marginBottom: hp(8), marginTop: 8}}
                      onClosePress={() => {
                        setShowTogolistPro(false);
                      }}
                    />
                  ) : (
                    <View style={{marginBottom: 0}} />
                  )}

                  <TouchableOpacity
                    onPress={() => handlePresentShareModalPress()}>
                    <LinearView
                      linearViewStyle={{borderRadius: 10}}
                      containerStyle={styles.shareRow}>
                      <Text style={styles.notificationtitle}>
                        {'Share trip'}
                      </Text>
                      <TouchableOpacity>
                        <Image
                          source={IMAGES.send}
                          style={styles.notification}
                        />
                      </TouchableOpacity>
                    </LinearView>
                  </TouchableOpacity>
                  <View style={AppStyles.row}>
                    <Text style={[styles.Tripphoto, {flex: 1}]}>
                      {'Trip Togolists'}
                    </Text>
                    <TouchableOpacity>
                      <Image source={IMAGES.add_icon} style={styles.addicon} />
                    </TouchableOpacity>
                  </View>

                  {/* <SwipeListView
                  data={categories}
                  // contentContainerStyle={{paddingHorizontal: 20}}
                  showsVerticalScrollIndicator={false}
                  renderItem={(data, rowMap) => {
                    return (
                      <View style={styles.rowFront}>
                        <CategoryCard
                          onCardPress={() => {
                            navigateTo(SCREENS.ThingsTogolistsScreen, {
                              isBack: true,
                            });
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
                  rightOpenValue={-170}
                  renderHiddenItem
                  renderHiddenItem={(data, rowMap) => (
                    <View style={styles.rowBack}>
                      <TouchableOpacity style={styles.backButton}>
                        <Image source={IMAGES.restore} style={styles.restore} />
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
                /> */}
                  <FlatList
                    data={categories}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => {
                      return (
                        <CategoryCard
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
                        onPress={() =>
                          navigateTo(SCREENS.CollaboratorsScreen, {
                            FriendsGoing: true,
                          })
                        }>
                        <Image
                          source={IMAGES.addIcon}
                          style={[styles.avatar1]}
                        />
                      </TouchableOpacity>
                    </View>
                  </LinearView>
                  <LinearView containerStyle={styles.ItineraryCard}>
                    <View style={styles.Itineraryheader}>
                      <Text style={styles.Itinerarytitle}>Itinerary</Text>
                      <Image source={IMAGES.edit_icon} style={styles.edit} />
                    </View>

                    {/* Day List */}
                    {['Day 01', 'Day 02', 'Day 03'].map((day, index) => (
                      <View key={index}>
                        <TouchableOpacity style={styles.dayRow}>
                          <View style={styles.daterow}>
                            <Text style={styles.dayText}>{day}</Text>
                            <Image
                              source={IMAGES.rightArrow}
                              style={{
                                width: wp(24),
                                height: wp(24),
                                tintColor: colors.black,
                              }}
                              resizeMode="contain"
                            />
                          </View>
                          <Text style={styles.addText}>Add</Text>
                        </TouchableOpacity>
                        <View style={styles.separator} />
                      </View>
                    ))}

                    {/* Add Day Button */}
                    {/* <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>＋ Add Day</Text>
            </TouchableOpacity> */}
                    <Button
                      title="Add Day"
                      leftImg={IMAGES.add_location}
                      BtnStyle={styles.addButton}
                      leftImgStyle={styles.addImg}
                      type="outline"
                    />
                  </LinearView>
                  <LinearView containerStyle={styles.rainRow}>
                    <Text>{'Travel Easy'}</Text>
                    <Button
                      title="Find Itineraries"
                      BtnStyle={styles.bucketBtn}
                      titleStyle={{...commonFontStyle(600, 12, colors.white)}}
                    />
                  </LinearView>
                  <LinearView containerStyle={styles.ExperiencesContainer}>
                    <View style={styles.experienceinfo}>
                      <Text style={styles.experience}>{'Experiences'}</Text>
                      <Text style={styles.local}>{'Explore Like a Local'}</Text>
                      <Text style={styles.info}>
                        {
                          'Make the most of your trip with premade itineraries and guided tours.'
                        }
                      </Text>
                    </View>
                    <Button
                      onPress={() => navigateTo(SCREENS.TripPlanner)}
                      title="Find Locals"
                      BtnStyle={styles.btn}
                    />
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
                      <TouchableOpacity
                        onPress={() => setUploadModel(!uploadModel)}>
                        <Image
                          source={IMAGES.add_icon}
                          style={styles.addicon}
                        />
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
                        <Text style={styles.Budgettitle}>Budget</Text>
                        <Image source={IMAGES.info} style={styles.infoIcon} />
                      </View>
                      <Image source={IMAGES.edit_icon} style={styles.edit} />
                    </View>
                    {[
                      ['Flights', '$0'],
                      ['Hotel', '$0'],
                      ['Food', '$0'],
                      ['Tickets', '$0'],
                      ['Total', '$0'],
                    ].map(([label, value], i) => (
                      <>
                        {i === 4 && (
                          <View
                            style={[styles.devider, {marginVertical: hp(4)}]}
                          />
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
                  <LinearView containerStyle={styles.photos}>
                    <HeaderTextIcon
                      headerStyle={styles.phototitle}
                      title={'References'}
                      showAddIcon={true}
                      showDown={false}
                      titleStyle={commonFontStyle(700, 24, colors._1B1515)}
                      onAddPress={() => handlePresentUrlModalPress()}
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
                        Save reference links to relevant social media posts,
                        blogs & more...
                      </Text>
                    )}
                  </LinearView>
                  <LinearView containerStyle={styles.rainRow}>
                    <Text>{'Need a rain check?'}</Text>
                    <Button
                      title="Convert to Bucket List"
                      BtnStyle={styles.bucketBtn}
                      titleStyle={{...commonFontStyle(600, 12, colors.white)}}
                    />
                  </LinearView>
                  <LinearView containerStyle={styles.notificationRow}>
                    <Text style={styles.notificationtitle}>
                      {'Turn on trip notifications '}
                    </Text>
                    <TouchableOpacity>
                      <Image source={IMAGES.bell} style={styles.notification} />
                    </TouchableOpacity>
                  </LinearView>
                    {/* <View style={{height: Platform.OS ? 0 : 90}} /> */}
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
        
      )}

      {renderPaginationDots()}

      <CommonSheet
        title="Cover Image"
        bottomSheetModalRef={bottomSheetModalRef}
        maxDynamicContentSize={
          isVisible ? SCREEN_HEIGHT * 0.785 : SCREEN_HEIGHT * 0.75
        }
        children={
          <View style={[styles.container, {marginBottom: isVisible ? 80 : 0}]}>
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
        bottomSheetModalRef={bottomSheetUploadModalRef}
        maxDynamicContentSize={
          isVisible ? SCREEN_HEIGHT * 0.785 : SCREEN_HEIGHT * 0.75
        }
        title="Add Upload"
        children={
          <View style={[styles.sheet, {marginBottom: isVisible ? 70 : 0}]}>
            <Button
              title="From Photo Library"
              onPress={() => (
                setUpload(!upload), bottomSheetUploadModalRef.current?.dismiss()
              )}
              leftImg={IMAGES.upload}
              leftImgStyle={{
                width: wp(24),
                height: wp(24),
                resizeMode: 'contain',
              }}
              BtnStyle={{backgroundColor: colors.primary}}
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
              titleStyle={styles.BtnTitle}
              onPress={() => bottomSheetUploadModalRef.current?.dismiss()}
            />
            <Button
              title="From Files"
              type="outline"
              leftImg={IMAGES.file}
              leftImgStyle={{
                width: wp(24),
                height: wp(24),
                resizeMode: 'contain',
                tintColor: colors.black,
              }}
              BtnStyle={styles.uploadBtn}
              titleStyle={styles.BtnTitle}
              onPress={() => bottomSheetUploadModalRef.current?.dismiss()}
            />
          </View>
        }
      />
      <CommonSheet
        bottomSheetModalRef={bottomSheetUrlModalRef}
        maxDynamicContentSize={
          isVisible ? SCREEN_HEIGHT * 0.33 : SCREEN_HEIGHT * 0.33
        }
        title="Add Social Link"
        children={
          <View style={[styles.sheet, {marginBottom: isVisible ? 80 : 0}]}>
            <View style={styles.inputContainer}>
              <Image source={IMAGES.link} style={styles.link} />
              <TextInput placeholder="Paste link..." style={styles.linkInput} />
            </View>
            <Button
              title="Done"
              onPress={() => (
                bottomSheetUrlModalRef.current?.dismiss(),
                setReferences(!references)
              )}
            />
          </View>
        }
      />
      <InviteFriendsSheet
        isVisible={isVisible}
        bottomSheetModalRef={bottomSheetInviteModalRef}
      />
      <ReactNativeModal style={styles.uploadModel} isVisible={uploadModel}>
        <View style={styles.modelContainer}>
          <Image source={IMAGES.doc} style={styles.doc} />
          <Text style={styles.uploadinfo}>
            {
              'Add trip photos and documents such as tickets, flight & hotel details to stay organized in one place.'
            }
          </Text>
          <Button
            title="Done"
            onPress={() => (
              setUploadModel(!uploadModel), handlePresentUploadModalPress()
            )}
            type="outline"
            BtnStyle={styles.DoneBtn}
          />
        </View>
      </ReactNativeModal>
      <ShareTripSheet  isVisible={isVisible} bottomSheetModalRef={bottomSheetShareModalRef} />

      {isVisible && <SafeAreaView edges={['top']} />}
      <Reanimated.View style={[AppStyles.actionBar, animatedStyle]}>
        <CustomTabBar />
      </Reanimated.View>
    </SafeAreaView>
  );
};

export default UpcomingListDetails;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    paddingVertical: 20,
    flex: 1,
    marginHorizontal: wp(16),
    marginBottom: hp(20),
  },
  title: {
    ...commonFontStyle(700, 32, '#FFFFFF99'),
    marginBottom: Platform.OS == 'ios' ? 15 : 4,

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
    width: 22,
    height: 22,
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
  scroll: {
    width: width,
    // flex: 1,
    // paddingHorizontal: wp(16),
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
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
    // borderWidth: 1,
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
  achievementLabel: {...commonFontStyle(500, 16, colors._444444)},
  achievementValue: {...commonFontStyle(400, 16, colors._444444)},
  achievementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(12),
    // marginTop: hp(12),
  },
  totalLabel: {...commonFontStyle(600, 13, colors.primary)},
  totalValue: {...commonFontStyle(400, 16, colors._444444)},
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
  },
  notificationtitle: {
    ...commonFontStyle(400, 16, colors._444444),
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(18),
    paddingVertical: hp(16),
  },
  ExperiencesContainer: {
    padding: 10,
  },
  experience: {
    ...commonFontStyle(700, 24, colors.black),
  },
  local: {
    ...commonFontStyle(700, 18, colors._444444),
    marginTop: hp(10),
  },
  info: {
    ...commonFontStyle(400, 16, colors._444444),
  },
  btn: {
    marginTop: hp(10),
  },
  experienceinfo: {
    padding: wp(8),
  },
  sheet: {
    gap: hp(16),
    paddingVertical: hp(16),
  },
  uploadBtn: {
    borderColor: colors._1B1515,
    paddingVertical: hp(16),
  },
  BtnTitle: {
    ...commonFontStyle(700, 15, colors._1B1515),
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
  uploadModel: {},
  doc: {
    width: wp(32),
    height: wp(32),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  uploadinfo: {
    ...commonFontStyle(400, 16, colors._444444),
    textAlign: 'center',
  },
  DoneBtn: {
    alignSelf: 'center',
    paddingHorizontal: wp(16),
    paddingVertical: hp(8),
  },
  modelContainer: {
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    borderRadius: 20,
    flex: 0,
    marginHorizontal: wp(34),
    paddingHorizontal: wp(34),
    paddingVertical: hp(40),
    gap: hp(16),
    alignItems: 'center',
  },
  shareRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: hp(14),
    paddingHorizontal: wp(18),
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
    paddingHorizontal: hp(16),
    gap: wp(30),
    overflow: 'hidden',
    marginTop: 12,
    // marginLeft:30
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

  // Styles for the pagination dots
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // position: 'absolute',
    // bottom: 30, // Position at the bottom
    // alignSelf: 'center', // Center horizontally
    marginHorizontal: 20,
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
