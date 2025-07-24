import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {commonFontStyle, hp, SCREEN_WIDTH, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import {IMAGES} from '../../assets/Images';
import {navigationRef} from '../../navigation/RootContainer';
import {SCREENS} from '../../navigation/screenNames';
import CustomHeader from '../../component/common/CustomHeader';
import {LinearView, Loader} from '../../component';
import {useGetDashboardQuery} from '../../api/dashboardApi';
import {navigateTo} from '../../utils/commonFunction';
import CustomBtn from '../../component/common/CustomBtn';
import TogolistPro from '../../component/common/TogolistPro';
import CardImage from '../../component/common/CardImage';
import CardImageText from '../../component/common/CardImageText';
import HeaderTextIcon from '../../component/common/HeaderTextIcon';
import CardBottomText from '../../component/common/CardBottomText';
import CardImageBtn from '../../component/common/CardImageBtn';
import Calendar from '../../component/common/Calendar';
import TravelCard from '../../component/common/TravelCard';
import TravelCardLock from '../../component/common/TravelCardLock';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useNavigation} from '@react-navigation/native';

type Props = {};

const mockData = [
  {
    title: 'Aesthetics',
    location: 'World Wide',
    image: 'https://via.placeholder.com/300x200?text=Aesthetics',
    users: [
      {avatar: 'https://randomuser.me/api/portraits/men/1.jpg'},
      {avatar: 'https://randomuser.me/api/portraits/women/2.jpg'},
      {avatar: 'https://randomuser.me/api/portraits/men/3.jpg'},
      {avatar: 'https://randomuser.me/api/portraits/women/4.jpg'},
      {avatar: 'https://randomuser.me/api/portraits/men/5.jpg'},
    ],
  },
  {
    title: 'Tropical Explorations',
    location: 'South America',
    image: 'https://via.placeholder.com/300x200?text=Tropical',
    users: [{avatar: 'https://randomuser.me/api/portraits/men/1.jpg'}],
  },
  {
    title: 'Golf Courses',
    location: 'South America',
    image: 'https://via.placeholder.com/300x200?text=Golf',
    users: [{avatar: 'https://randomuser.me/api/portraits/men/1.jpg'}],
  },
  {
    title: 'Vibes',
    location: 'South America',
    image: 'https://via.placeholder.com/300x200?text=Vibes',
    users: [{avatar: 'https://randomuser.me/api/portraits/men/1.jpg'}],
  },
  {
    title: 'Golf Courses',
    location: 'South America',
    image: 'https://via.placeholder.com/300x200?text=Golf',
    users: [{avatar: 'https://randomuser.me/api/portraits/men/1.jpg'}],
  },
  {
    title: 'Vibes',
    location: 'South America',
    image: 'https://via.placeholder.com/300x200?text=Vibes',
    users: [{avatar: 'https://randomuser.me/api/portraits/men/1.jpg'}],
  },
];

const events = [
  {
    id: 1,
    date: 'April 23',
    title: 'BBQ Festival',
    location: 'San Diego',
    attendees: '428',
    image: 'https://your-cdn.com/bbq.jpg',
    isPrivate: false,
  },
  {
    id: 2,
    date: 'May 2',
    title: 'Jazz Night',
    location: 'San Diego',
    attendees: '752',
    image: 'https://your-cdn.com/jazz.jpg',
    isPrivate: true,
  },
  {
    id: 3,
    date: 'May 10',
    title: 'Lafayette',
    location: 'San Diego',
    attendees: '103',
    image: 'https://your-cdn.com/lafayette.jpg',
    isPrivate: false,
  },
  {
    id: 4,
    date: 'May 26',
    title: 'CRSSD',
    location: 'San Diego',
    attendees: '1.2K',
    image: 'https://your-cdn.com/crssd.jpg',
    isPrivate: true,
  },
];

const UpcommingEvents = [
  {
    id: 1,
    date: 'April 23',
    title: 'Canada Expereince',
    image: 'https://your-cdn.com/bbq.jpg',
    isPrivate: false,
  },
  {
    id: 2,
    date: 'May 2',
    title: 'Europe Adventure',
    image: 'https://your-cdn.com/jazz.jpg',
    isPrivate: true,
  },
];

const ProfileScreen = (props: Props) => {
  const [selectedTab, setSelectedTab] = useState('Lists');
  const [searchShow, setSearchShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Favorites');
  const [showTogolistPro, setShowTogolistPro] = useState(true);
  const [showTogolistPro1, setShowTogolistPro1] = useState(true);

  const [showPersonal, setShowPersonal] = useState(true);
  const [showCollections, setShowCollections] = useState(true);
  const [showCalendar, setShowCalendar] = useState(true);
  const [showSavedCollections, setShowSavedCollections] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(true);
  const [showPast, setShowPast] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchBarAnim] = useState(new Animated.Value(0)); // 0 = hidden, 1 = visible

  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollOffsetY = useRef(0);

  useEffect(() => {
    Animated.timing(searchBarAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowSearchBar(false));
  }, []);

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: true,
      listener: event => {
        const currentOffset = event.nativeEvent.contentOffset.y;

        if (currentOffset > scrollOffsetY.current && currentOffset > 50) {
          // Scrolling down
          Animated.timing(searchBarAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start(() => setShowSearchBar(false));
        } else if (currentOffset < scrollOffsetY.current - 5) {
          // Scrolling up
          setShowSearchBar(true);
          Animated.timing(searchBarAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }).start();
        }

        scrollOffsetY.current = currentOffset;
      },
    },
  );

  const searchBarTranslateY = searchBarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-60, 0], // Adjust height as needed
  });

  const searchBarOpacity = searchBarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      setSelectedTab('Lists');
      // Do something, like scroll to top or reset list
    });

    return unsubscribe;
  }, [navigation]);

  const categories = [
    {
      key: 'Favorites',
      icon: (
        <Image
          source={IMAGES.favorite}
          style={{
            width: 20,
            height: 26,
            resizeMode: 'contain',
          }}
        />
      ),
      onPress: () => navigateTo(SCREENS.Favorites),
    },
    {
      key: 'Been There',
      icon: (
        <Image
          source={IMAGES.been}
          style={{
            width: 20,
            height: 26,
            resizeMode: 'contain',
          }}
        />
      ),
      onPress: () => navigateTo(SCREENS.BeenThere),
    },
    {
      key: 'Shared',
      icon: (
        <Image
          source={IMAGES.share1}
          style={{
            width: 20,
            height: 26,
            resizeMode: 'contain',
            tintColor: '#BD2332',
          }}
        />
      ),
      onPress: () => navigateTo(SCREENS.Shared),
    },
  ];
  const tabs = [
    {
      key: 'Lists',
      icon: (
        <Image
          source={IMAGES.lists_icon}
          style={{
            width: 20,
            height: 26,
            tintColor: selectedTab === 'Lists' ? colors.black : colors.gray,
            resizeMode: 'contain',
          }}
        />
      ),
    },
    {
      key: 'Saved',
      icon: (
        <Image
          source={IMAGES.save_cion}
          style={{
            width: 20,
            height: 26,
            tintColor: selectedTab === 'Saved' ? colors.black : colors.gray,
            resizeMode: 'contain',
          }}
        />
      ),
    },
    {
      key: 'Listings',
      icon: (
        <Image
          source={IMAGES.list1}
          style={{
            width: 20,
            height: 26,
            tintColor: selectedTab === 'Listings' ? colors.black : colors.gray,
            resizeMode: 'contain',
          }}
        />
      ),
    },
    {
      key: 'Going',
      icon: (
        <Image
          source={IMAGES.go}
          style={{
            width: 20,
            height: 26,
            tintColor: selectedTab === 'Going' ? colors.black : colors.gray,
            resizeMode: 'contain',
          }}
        />
      ),
    },
  ];

  const ListView = ({subText, value}) => {
    return (
      <View style={styles.statItem}>
        <Text style={commonFontStyle(700, 24, colors.black)}>{value}</Text>
        <Text style={commonFontStyle(500, 14, colors.gray)}>{subText}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={[AppStyles.mainWhiteContainer]}>
      {/* <CustomHeader
        searchIconStyle={{
          tintColor: searchShow ? colors.primary1 : colors.black,
        }}
        showSearch={false}
        showBack={false}
        onSearchPress={() => {
          setSearchShow(!searchShow);
        }}
        headerShow="Profile"
        onMorePress={() => {
          navigateTo(SCREENS.ProfileSettingScreen);
        }}
        backIconStyle={{marginRight: wp(6)}}
      /> */}
      <View style={styles.header}>
        <Text style={styles.heading}>{'Profile'}</Text>
        <TouchableOpacity
          onPress={() => {
            navigateTo(SCREENS.ProfileSettingScreen);
          }}>
          <Image source={IMAGES.more_icon} style={[styles.moreIcon]} />
        </TouchableOpacity>
      </View>
      <Loader visible={false} />
      {showSearchBar && (
        <Animated.View
          style={{
            // position: 'absolute',
            // top: 0,
            // left: 0,
            // right: 0,
            transform: [{translateY: searchBarTranslateY}],
            opacity: searchBarOpacity,
            backgroundColor: colors.white,
            zIndex: 10,
            marginHorizontal: 16,
          }}>
          <View style={styles.searchContainer}>
            <Image source={IMAGES.search} style={styles.searchIcon} />
            <TextInput
              placeholder="Search"
              placeholderTextColor={colors.gray}
              style={styles.searchInput}
            />
          </View>
        </Animated.View>
      )}
      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        // stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        style={[AppStyles.M16, AppStyles.flex]}>
        {/* {showSearchBar ? ( */}

        {/* ) : (
          <View style={{height: 4}} />
        )} */}

        {/* <View style={styles.searchContainer}>
          <Image source={IMAGES.search} style={styles.searchIcon} />
          <TextInput
            placeholder="Search Profile"
            placeholderTextColor={colors.gray}
            style={styles.searchInput}
          />
        </View> */}

        <View style={{backgroundColor: colors.white, marginTop: 6}}>
          <View style={styles.profileContainer}>
            <View style={styles.avatarView}>
              <Image source={IMAGES.Avatar_icon} style={styles.avatar} />
            </View>
            <View style={{flex: 1, marginLeft: 12}}>
              <Text style={styles.userName}>Raymond Daily</Text>
              <Text style={styles.userSubText}>@raydaily</Text>
              <View style={styles.statsRow}>
                <ListView subText={'Followers'} value={'122'} />
                <ListView subText={'Saves'} value={'67'} />
                <ListView subText={'Listings'} value={'37K'} />
              </View>
            </View>
          </View>
          <Text style={styles.decText}>
            San Diegan that loves to travel and share with friends along the
            way.
          </Text>
          <CustomBtn
            buttonText={styles.buttonText}
            style={styles.button2}
            onPress={() => {}}
            title={'Follow'}
          />

          <LinearView
            linearViewStyle={{marginTop: hp(16)}}
            containerStyle={{paddingVertical: 20}}>
            <View style={styles.tabContainer}>
              {tabs.map(tab => (
                <TouchableOpacity
                  key={tab.key}
                  onPress={() => setSelectedTab(tab.key)}
                  style={styles.tabItem}>
                  {tab.icon}
                  <Text
                    style={[
                      commonFontStyle(
                        500,
                        14,
                        selectedTab === tab.key ? colors.black : colors.gray,
                      ),
                      {marginTop: 4},
                    ]}>
                    {' '}
                    {tab.key}{' '}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {/* <Text style={styles.description}>{'Add a description...'}</Text> */}
          </LinearView>

          {selectedTab == 'Lists' && (
            <>
              <HeaderTextIcon
                headerStyle={{marginTop: 8}}
                title={'Personal Lists'}
                show={showPersonal}
                onDownPress={() => {
                  setShowPersonal(!showPersonal);
                }}
              />
              {showPersonal && (
                <>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={styles.categoryRow}>
                    {categories.map(category => {
                      return (
                        <LinearView>
                          <TouchableOpacity
                            key={category.key}
                            onPress={() => (
                              setSelectedCategory(category.key),
                              category?.onPress && category?.onPress()
                            )}
                            style={[
                              styles.categoryButton,
                              styles.categoryButtonActive,
                            ]}>
                            {category.icon}
                            <Text
                              style={[
                                commonFontStyle(500, 14, colors.black),
                                {marginLeft: 6},
                              ]}>
                              {category.key}
                            </Text>
                          </TouchableOpacity>
                        </LinearView>
                      );
                    })}
                  </ScrollView>

                  <CardImage
                    onCardPress={() => {
                      navigateTo(SCREENS.CreatedForYou);
                    }}
                    title={'For You'}
                    Togolist
                    Worldwide
                  />
                  {/* <SwipeListView
                  data={[1]}
                  ItemSeparatorComponent={() => (
                    <View style={{height: hp(12)}} />
                  )}
                  renderItem={(data, rowMap) => (
                    <View style={styles.rowFront}>
                      <CardImage
                        onCardPress={() => {
                          navigateTo(SCREENS.CreatedForYou);
                        }}
                        title={'For You'}
                        Togolist
                        Worldwide
                      />
                    </View>
                  )}
                  disableRightSwipe
                  swipeToOpenPercent={30}
                  rightOpenValue={-150}
                  
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
                </>
              )}
              <HeaderTextIcon
                title={'Collections'}
                headerStyle={{marginTop: 8}}
                showAddIcon={true}
                show={showCollections}
                onDownPress={() => {
                  setShowCollections(!showCollections);
                }}
                onAddPress={() => {
                  navigateTo(SCREENS.CreateListScreen);
                }}
              />

              {showCollections && (
                <>
                  <FlatList
                    data={mockData}
                    numColumns={2}
                    keyExtractor={(_, index) => index.toString()}
                    columnWrapperStyle={{
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}
                    style={{marginTop: 8}}
                    renderItem={({item}) => (
                      <TravelCard
                        {...item}
                        onPress={() => {
                          navigateTo(SCREENS.Shared);
                        }}
                      />
                    )}
                  />
                  <CardImageText
                    title={'No collections yet!'}
                    subText={
                      'Start saving places to create your \nfirst collection.'
                    }
                  />
                </>
              )}

              {showTogolistPro && (
                <TogolistPro
                  onClosePress={() => {
                    setShowTogolistPro(false);
                  }}
                />
              )}
            </>
          )}
          {selectedTab == 'Saved' && (
            <>
              {/* <View style={styles.headerView}>
              <Text style={[commonFontStyle(700, 20, colors.black)]}>
                Saved Collections
              </Text>
              <Image source={IMAGES.down} style={styles.downIcon} />
            </View> */}

              <HeaderTextIcon
                title={'Saved Collections'}
                showAddIcon={false}
                show={showSavedCollections}
                onDownPress={() => {
                  setShowSavedCollections(!showSavedCollections);
                }}
              />

              {showSavedCollections && (
                <>
                  <CardBottomText title={'Explore Collections'} />

                  <FlatList
                    data={mockData}
                    numColumns={2}
                    keyExtractor={(_, index) => index.toString()}
                    columnWrapperStyle={{
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}
                    style={{marginTop: 10}}
                    renderItem={({item}) => (
                      <TravelCard
                        {...item}
                        onPress={() => {
                          navigateTo(SCREENS.Shared);
                        }}
                        BGStyle={styles.bg}
                      />
                    )}
                  />
                </>
              )}
              {showTogolistPro1 && (
                <TogolistPro
                  onClosePress={() => {
                    setShowTogolistPro1(false);
                  }}
                  cardStyle={{marginBottom: 10, marginTop: 0}}
                />
              )}
            </>
          )}
          {selectedTab == 'Listings' && (
            <>
              <CardImageBtn
                text1={'Coming Soon...'}
                text2={'Monetize Your Account'}
                text3={
                  'Create experiences & trip itineraries for account monetization opportunities'
                }
                btnText={'Learn More'}
                onBtnPress={() => {}}
              />
            </>
          )}

          {selectedTab == 'Going' && (
            <>
              <HeaderTextIcon
                title={'Calendar View'}
                show={showCalendar}
                onDownPress={() => {
                  setShowCalendar(!showCalendar);
                }}
              />
              {showCalendar && (
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Calendar />
                </View>
              )}
              <HeaderTextIcon
                title={'Upcoming '}
                show={showUpcoming}
                headerStyle={{marginTop: 16}}
                onDownPress={() => {
                  setShowUpcoming(!showUpcoming);
                }}
              />
              {showUpcoming ? (
                <>
                  <CardBottomText title={'Start Planning...'} />
                  <FlatList
                    data={UpcommingEvents}
                    numColumns={2}
                    keyExtractor={(_, index) => index.toString()}
                    columnWrapperStyle={{
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}
                    style={{marginTop: 8}}
                    renderItem={({item}) => (
                      <TravelCardLock
                        {...item}
                        onPress={() => {
                          navigateTo(SCREENS.UpcomingListDetails, {item: item});
                        }}
                      />
                    )}
                  />
                </>
              ) : (
                <View style={{height: 0}} />
              )}
              <HeaderTextIcon
                title={'Past '}
                show={showPast}
                headerStyle={{marginTop: 16}}
                onDownPress={() => {
                  setShowPast(!showPast);
                }}
              />
              {showPast && (
                <>
                  <FlatList
                    data={events}
                    numColumns={2}
                    keyExtractor={(_, index) => index.toString()}
                    columnWrapperStyle={{
                      justifyContent: 'space-between',
                      marginBottom: 8,
                    }}
                    style={{marginTop: 8}}
                    renderItem={({item}) => (
                      <TravelCardLock
                        {...item}
                        onPress={() => {
                          navigateTo(SCREENS.EventDetails, {
                            item: item,
                            data: events,
                          });
                        }}
                      />
                    )}
                  />
                  <CardImageText
                    // title={'No collections yet!'}
                    subText={
                      'Nothing yet! Find activities or start planning trips to view your goings history!'
                    }
                  />
                </>
              )}
            </>
          )}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    marginHorizontal: wp(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 10,
  },
  heading: {
    ...commonFontStyle(600, 17, colors.black),
    // flex: 1,
  },
  moreIcon: {
    width: 22,
    height: 22,
    tintColor: colors.black,
  },

  searchIcon: {
    width: 18,
    height: 18,
    tintColor: colors.gray,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS == 'ios' ? 8 : 0,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#959595',
  },
  searchInput: {
    flex: 1,
    ...commonFontStyle(400, 16, colors.black),
    marginLeft: 8,
  },
  profileContainer: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  avatar: {
    width: wp(106),
    height: wp(106),
    borderRadius: wp(106),
  },
  avatarView: {
    width: wp(124),
    height: wp(124),
    borderRadius: wp(300),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#21212126',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    flex: 1,
    marginHorizontal: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  decText: {
    marginTop: 8,
    ...commonFontStyle(500, 14, '#8B8B8B'),
  },
  userName: {
    ...commonFontStyle(700, 20, colors.black),
  },
  userSubText: {
    ...commonFontStyle(500, 14, colors.gray),
    marginTop: 8,
  },
  button2: {
    height: 31,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
    marginHorizontal: 0,
    marginTop: 16,
  },
  buttonText: {
    ...commonFontStyle(600, 12, colors.white),
  },
  chipText1: {
    ...commonFontStyle(700, 20, colors.white),
    marginBottom: 4,
  },
  chipText2: {
    ...commonFontStyle(700, 20, colors.white),
    textAlign: 'center',
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: '#7878800D',
    borderRadius: 12,
    // paddingVertical: 20,
  },
  tabContainer1: {
    backgroundColor: '#7878800D',
    borderRadius: 20,
    marginTop: 18,
    overflow: 'hidden',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },

  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 4,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
  },
  categoryButtonActive: {
    // backgroundColor: '#f1f1f1',
  },
  downIcon: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    marginLeft: 8,
  },
  forIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  forIcon1: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  addIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 8,
  },

  collocation_bg: {
    width: wp(370),
    height: wp(370),
    marginTop: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  card: {
    borderRadius: 24,
    padding: 20,
    alignSelf: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: hp(50),
  },
  closeIcon: {
    position: 'absolute',
    top: 12,
    right: 30,
    zIndex: 1,
  },
  content: {
    paddingRight: 80, // space for button
  },
  title1: {
    ...commonFontStyle(700, 18, colors.white),
  },
  subtitle: {
    marginVertical: 8,
    ...commonFontStyle(400, 16, colors.white),
  },
  tryProButton: {
    position: 'absolute',
    right: 0,
    bottom: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  tryProText: {
    ...commonFontStyle(600, 12, '#444444'),
  },

  rowFront: {
    overflow: 'hidden',
    borderRadius: 10,
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
  bg: {
    width: (SCREEN_WIDTH - 40) / 2,
    flex: 1,
  },
});
