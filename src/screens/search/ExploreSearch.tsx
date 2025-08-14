import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {
  CustomHeader,
  ExperienceCard,
  ExploreProfileCard,
  ProfileCard,
  SearchBar,
} from '../../component';
import {IMAGES} from '../../assets/Images';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppStyles} from '../../theme/appStyles';
import {Fs, commonFontStyle, hp, wp} from '../../theme/fonts';
import {colors} from '../../theme/colors';
import DiscoverNewSpotsCard from '../../component/explore/DiscoverNewSpotsCard';
import TravelCardLock from '../../component/common/TravelCardLock';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {API} from '../../utils/apiConstant';
import {navigateTo} from '../../utils/commonFunction';
import {SCREENS} from '../../navigation/screenNames';
import TravelCard from '../../component/common/TravelCard';
import AddToListBottomSheet from '../../component/common/AddToListBottomSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useScrollHideAnimation} from '../../hook/useScrollHideAnimation';
import Animated from 'react-native-reanimated';
import CustomTabBar from '../../component/common/CustomTabBar';

let data = ['Collections', 'Places', 'Events', 'Listings', 'Profiles'];

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
    date: 'April 23',
    title: 'BBQ Festival',
    location: 'San Diego',
    attendees: '428',
    image: 'https://your-cdn.com/bbq.jpg',
    isPrivate: false,
  },
  {
    date: 'May 2',
    title: 'Jazz Night',
    location: 'San Diego',
    attendees: '752',
    image: 'https://your-cdn.com/jazz.jpg',
    isPrivate: true,
  },
  {
    date: 'May 10',
    title: 'Lafayette',
    location: 'San Diego',
    attendees: '103',
    image: 'https://your-cdn.com/lafayette.jpg',
    isPrivate: false,
  },
  {
    date: 'May 26',
    title: 'CRSSD',
    location: 'San Diego',
    attendees: '1.2K',
    image: 'https://your-cdn.com/crssd.jpg',
    isPrivate: true,
  },
  {
    date: 'April 23',
    title: 'BBQ Festival',
    location: 'San Diego',
    attendees: '428',
    image: 'https://your-cdn.com/bbq.jpg',
    isPrivate: false,
  },
  {
    date: 'May 2',
    title: 'Jazz Night',
    location: 'San Diego',
    attendees: '752',
    image: 'https://your-cdn.com/jazz.jpg',
    isPrivate: true,
  },
  {
    date: 'May 10',
    title: 'Lafayette',
    location: 'San Diego',
    attendees: '103',
    image: 'https://your-cdn.com/lafayette.jpg',
    isPrivate: false,
  },
  {
    date: 'May 26',
    title: 'CRSSD',
    location: 'San Diego',
    attendees: '1.2K',
    image: 'https://your-cdn.com/crssd.jpg',
    isPrivate: true,
  },
];

const ExploreSearch = () => {
  const {animatedStyle, scrollHandler, isVisible} = useScrollHideAnimation(
    80,
    10,
  );
  const [select, setSelect] = useState('Collections');
  const [select1, setSelect1] = useState('List View');

  const bottomSheetAddListRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalLocationRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalMoreRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalQuickAddRef = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalMorePress = useCallback(() => {
    bottomSheetAddListRef.current?.present();
  }, []);

  const handlePresentAddlistPress = useCallback(() => {
    bottomSheetAddListRef.current?.present();
    bottomSheetModalRef.current?.close();
    bottomSheetModalLocationRef.current?.close();
    bottomSheetModalMoreRef.current?.close();
    bottomSheetModalQuickAddRef.current?.close();
  }, []);
  const handlePresentAddlistClose = useCallback(() => {
    bottomSheetAddListRef.current?.close();
    bottomSheetModalLocationRef.current?.close();
    bottomSheetModalRef.current?.close();
    bottomSheetModalMoreRef.current?.close();
    bottomSheetModalQuickAddRef.current?.close();
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
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <SearchBar
          container={styles.searchBox}
          placeholder="Search"
          inputStyle={styles.searchInput}
          IconStyle={{width: 17, height: 15, tintColor: '#A4A4A4'}}
        />
        <View style={AppStyles.flex1}>
          <View>
            <FlatList
              data={data}
              horizontal
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={[
                styles.listContainer,
                {marginBottom: select == 'Places' ? hp(0) : hp(8)},
              ]}
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
          {select == 'Collections' && (
            <View>
              {/* <View style={styles.headerrow}>
                <Text style={styles.eventTitle}>{'Events in Mexico'}</Text>
                <Text style={styles.location}>{'50miles Radius'}</Text>
              </View> */}
              <FlatList
                data={mockData}
                numColumns={2}
                keyExtractor={(_, index) => index.toString()}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                  marginTop: 8,
                }}
                contentContainerStyle={AppStyles.P16}
                renderItem={({item}) => <TravelCard {...item} isSave />}
              />
            </View>
          )}
          {select == 'Places' && (
            <View style={[AppStyles.flex1]}>
              <View style={styles.headerrow}>
                <View style={styles.select}>
                  <TouchableOpacity onPress={() => setSelect1('List View')}>
                    <Text
                      style={[
                        styles.subtext,
                        {
                          fontSize: Fs(18),
                          color:
                            select1 == 'List View'
                              ? colors._BD2332
                              : colors._99999,
                        },
                      ]}>
                      List View
                    </Text>
                  </TouchableOpacity>
                  <Text style={[styles.subtext, {fontSize: Fs(18)}]}>
                    {'|'}
                  </Text>
                  <TouchableOpacity onPress={() => setSelect1('Map View')}>
                    <Text
                      style={[
                        styles.subtext,
                        {
                          fontSize: Fs(18),
                          color:
                            select1 == 'Map View'
                              ? colors._BD2332
                              : colors._99999,
                        },
                      ]}>
                      Map View
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.location}>{'Mexico'}</Text>
              </View>
              <View
                style={[
                  AppStyles.flex1,
                  {marginHorizontal: select1 == 'Map View' ? 0 : 12},
                ]}>
                {select1 == 'List View' && (
                  <FlatList
                    data={[1, 2]}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({item}) => (
                      <DiscoverNewSpotsCard
                        {...item}
                        imageStyle={{
                          marginHorizontal: Platform.OS == 'ios' ? 0 : 20,
                        }}
                        onPressAdd={() => {
                          handlePresentModalMorePress();
                        }}
                        onPressBeenThere={() => {
                          navigateTo(SCREENS.BeenThere);
                        }}
                        onPressFavs={() => {
                          navigateTo(SCREENS.Favorites);
                        }}
                      />
                    )}
                    contentContainerStyle={{paddingBottom: hp(16), gap: hp(8)}}
                  />
                )}
                {select1 == 'Map View' && (
                  <MapView
                    style={AppStyles.flex1}
                    provider={PROVIDER_GOOGLE}
                    key={API.MAP_KEY}
                    region={{
                      latitude: 51.5065313073,
                      longitude: -0.1888825778,
                      latitudeDelta: 0.02,
                      longitudeDelta: 0.02,
                    }}
                  />
                )}
              </View>
            </View>
          )}

          {select == 'Events' && (
            <View>
              <View style={styles.headerrow}>
                <Text style={styles.eventTitle}>{'Events in Mexico'}</Text>
                <Text style={styles.location}>{'50miles Radius'}</Text>
              </View>
              <FlatList
                data={[1, 2, 3, 4]}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={AppStyles.P16}
                style={{marginTop: 10}}
                renderItem={({item}) => (
                  <DiscoverNewSpotsCard
                    {...item}
                    onEventPress={() => {
                      navigateTo(SCREENS.EventDetails, {
                        item: item,
                        data: events,
                      });
                    }}
                    followEvent={true}
                    onPressAdd={() => handlePresentAddlistPress()}
                    onPressBeenThere={() => {
                      navigateTo(SCREENS.BeenThere);
                      handlePresentAddlistClose();
                    }}
                    onPressFavs={() => {
                      navigateTo(SCREENS.Favorites);
                      handlePresentAddlistClose();
                    }}
                    imageStyle={{
                      marginHorizontal: Platform.OS == 'ios' ? 0 : 16,
                    }}
                  />
                )}
              />
            </View>
          )}
          {select == 'Listings' && (
            <>
              <View style={styles.headerrow}>
                <Text style={styles.eventTitle}>{'Mexico Itineraries'}</Text>
              </View>
              <FlatList
                data={[1, 2, 3, 4]}
                contentContainerStyle={AppStyles.P16}
                keyExtractor={(_, index) => index.toString()}
                style={{marginTop: 10}}
                renderItem={({item}) => (
                  <ExperienceCard
                    onFavsPress={() => {
                      navigateTo(SCREENS.Favorites);
                    }}
                    onAddPress={() => {
                      handlePresentAddlistPress();
                    }}
                    onBookPress={() => {}}
                    TourImg={IMAGES.tour1}
                  />
                )}
              />
            </>
          )}
          {select == 'Profiles' && (
            <View style={styles.list}>
              <FlatList
                data={[1, 2, 3, 4, 5, 6]}
                contentContainerStyle={{gap: wp(8), paddingHorizontal: wp(16)}}
                renderItem={({item, index}) => <ExploreProfileCard />}
              />
            </View>
          )}
        </View>
      </Animated.ScrollView>
      <AddToListBottomSheet
        bottomSheetModalRef={bottomSheetAddListRef}
        maxDynamicContentSize
        isVisible={isVisible}
        // handleSheetChanges={e => handleSheetChanges(e)}
      />

      {isVisible && <SafeAreaView edges={['top']} />}
      <Animated.View style={[AppStyles.actionBar, animatedStyle]}>
        <CustomTabBar />
      </Animated.View>
    </SafeAreaView>
  );
};

export default ExploreSearch;

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
  searchBox: {
    borderColor: '#959595',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 9,
    backgroundColor: colors.white,
    marginHorizontal: wp(16),
  },
  searchInput: {
    flex: 1,
    marginLeft: 5,
    ...commonFontStyle(400, 14, '#000'), // You can change 16 to any default search input size
  },
  scroll: {
    flexGrow: 1,
  },
  listContainer: {
    marginBottom: hp(8),
    paddingHorizontal: wp(16),
  },
  btn: {
    borderWidth: 1,
    borderColor: colors._D9D9D9,
    borderRadius: 10,
    paddingHorizontal: wp(4),
    paddingVertical: hp(4),
  },
  btnText: {
    ...commonFontStyle(600, 14, colors._99999),
  },
  separator: {
    width: wp(2),
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(8),
  },
  subtext: {
    marginVertical: 12,
    ...commonFontStyle(600, 15, '#999999'),
  },
  location: {
    ...commonFontStyle(400, 14, colors._787878),
  },
  headerrow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(16),
    marginTop: hp(8),
  },
  eventTitle: {
    ...commonFontStyle(600, 18, colors.black),
  },
  list: {
    flex: 1,
    marginTop: hp(8),
  },
});
